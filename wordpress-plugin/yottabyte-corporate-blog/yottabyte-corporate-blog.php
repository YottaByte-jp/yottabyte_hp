<?php
/**
 * Plugin Name: YottaByte Corporate Blog
 * Description: HPブログ専用の記事管理・公開API・GitHub Pages連携。
 * Version: 1.1.0
 * Requires PHP: 8.0
 */

defined('ABSPATH') || exit;

final class YottaByte_Corporate_Blog {
    const TYPE = 'yb_article';
    const TAXONOMY = 'yb_category';
    const TOKEN = 'yb_blog_dispatch_token';
    const STATUS = 'yb_blog_dispatch_status';
    const PUBLISHER_ROLE = 'yb_blog_publisher';
    const CAPABILITIES_VERSION = 'yb_blog_capabilities_version';
    private static $pending = false;

    public static function enabled() {
        return wp_parse_url(home_url(), PHP_URL_HOST) === 'cms.yottabyte.jp';
    }

    public static function boot() {
        if (!self::enabled()) { return; }
        add_action('init', array(__CLASS__, 'upgrade_capabilities'), 5);
        add_action('after_setup_theme', static function() { add_theme_support('post-thumbnails'); });
        add_action('init', array(__CLASS__, 'register'));
        add_action('rest_api_init', array(__CLASS__, 'routes'));
        add_action('wp_after_insert_post', array(__CLASS__, 'changed'), 10, 4);
        add_action('before_delete_post', array(__CLASS__, 'deleted'), 10, 2);
        add_action('shutdown', array(__CLASS__, 'dispatch_pending'));
        add_filter('map_meta_cap', array(__CLASS__, 'publisher_media_capabilities'), 10, 4);
        add_filter('rest_pre_dispatch', array(__CLASS__, 'publisher_rest_access'), 10, 3);
        add_filter('upload_mimes', array(__CLASS__, 'publisher_image_mimes'), 100);
        add_filter('rest_attachment_query', array(__CLASS__, 'publisher_attachment_query'), 10, 2);
        add_filter('rest_pre_insert_' . self::TYPE, array(__CLASS__, 'validate_publisher_article'), 10, 2);
        add_action('admin_menu', array(__CLASS__, 'menu'));
        add_action('wp_dashboard_setup', array(__CLASS__, 'dashboard'));
        add_action('admin_bar_menu', static function($bar) {
            $bar->remove_node('new-post');
            $bar->remove_node('new-page');
        }, 100);
        add_action('admin_post_yb_blog_settings', array(__CLASS__, 'save_settings'));
        add_action('admin_post_yb_blog_dispatch', array(__CLASS__, 'manual_dispatch'));
        add_action('template_redirect', array(__CLASS__, 'redirect_frontend'));
        add_filter('wp_robots', static function($robots) {
            $robots['noindex'] = true;
            return $robots;
        });
    }

    public static function register() {
        register_post_type(self::TYPE, array(
            'labels' => array('name' => 'HPブログ', 'singular_name' => 'HPブログ記事', 'add_new_item' => 'HPブログ記事を追加'),
            'public' => false, 'show_ui' => true, 'show_in_rest' => true,
            'rest_base' => 'yottabyte-articles', 'exclude_from_search' => true,
            'capability_type' => array('yb_article', 'yb_articles'), 'map_meta_cap' => true,
            'menu_icon' => 'dashicons-edit-page',
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'author'),
        ));
        register_taxonomy(self::TAXONOMY, self::TYPE, array(
            'label' => 'ブログカテゴリー', 'public' => false, 'show_ui' => true,
            'show_in_rest' => true, 'hierarchical' => true,
            'capabilities' => array(
                'manage_terms' => 'manage_categories', 'edit_terms' => 'manage_categories',
                'delete_terms' => 'manage_categories', 'assign_terms' => 'edit_yb_articles',
            ),
        ));
    }

    public static function upgrade_capabilities() {
        if (get_option(self::CAPABILITIES_VERSION) === '1.1.0') { return; }
        // Preserve each existing role's previous access to this post type. Previously it
        // inherited the regular post capabilities. Never copy these grants to new users.
        $mapping = array(
            'edit_posts' => 'edit_yb_articles', 'edit_others_posts' => 'edit_others_yb_articles',
            'publish_posts' => 'publish_yb_articles', 'read_private_posts' => 'read_private_yb_articles',
            'delete_posts' => 'delete_yb_articles', 'delete_private_posts' => 'delete_private_yb_articles',
            'delete_published_posts' => 'delete_published_yb_articles', 'delete_others_posts' => 'delete_others_yb_articles',
            'edit_private_posts' => 'edit_private_yb_articles', 'edit_published_posts' => 'edit_published_yb_articles',
        );
        foreach (wp_roles()->roles as $name => $definition) {
            if ($name === self::PUBLISHER_ROLE) { continue; }
            $role = get_role($name);
            foreach ($mapping as $old => $new) {
                if (!empty($definition['capabilities'][$old])) { $role->add_cap($new); }
            }
        }
        add_role(self::PUBLISHER_ROLE, 'HPブログ投稿者（自動連携用）', array(
            'read' => true, 'upload_files' => true,
            'edit_yb_articles' => true, 'edit_published_yb_articles' => true,
            'edit_private_yb_articles' => true, 'publish_yb_articles' => true,
        ));
        update_option(self::CAPABILITIES_VERSION, '1.1.0', false);
    }

    private static function is_publisher($user = null) {
        $user = $user ?: wp_get_current_user();
        return in_array(self::PUBLISHER_ROLE, (array) $user->roles, true) && !$user->has_cap('manage_options');
    }

    public static function publisher_media_capabilities($caps, $cap, $user_id, $args) {
        if ($cap !== 'edit_post' || empty($args[0])) { return $caps; }
        $post = get_post((int) $args[0]);
        if ($post && $post->post_type === 'attachment' && (int) $post->post_author === (int) $user_id && self::is_publisher(get_userdata($user_id))) {
            // Attachment metadata should be editable without granting edit_posts,
            // which would also permit publishing to the wrong, regular post type.
            return array('upload_files');
        }
        return $caps;
    }

    public static function publisher_rest_access($result, $server, $request) {
        if (!self::is_publisher()) { return $result; }
        $route = rtrim($request->get_route(), '/');
        $method = $request->get_method();
        $read = in_array($method, array('GET', 'HEAD', 'OPTIONS'), true);
        $write = in_array($method, array('POST', 'PUT', 'PATCH'), true);
        $article = preg_match('#^/wp/v2/yottabyte-articles(?:/[0-9]+)?$#D', $route);
        $media = preg_match('#^/wp/v2/media(?:/[0-9]+)?$#D', $route);
        if (preg_match('#^/wp/v2/media/([0-9]+)$#D', $route, $matches)) {
            $attachment = get_post((int) $matches[1]);
            if ($attachment && (int) $attachment->post_author !== get_current_user_id()) {
                return new WP_Error('yb_publisher_media_denied', '自分でアップロードした画像だけを操作できます。', array('status' => 403));
            }
        }
        $reference = preg_match('#^/wp/v2/(?:yb_category(?:/[0-9]+)?|types/yb_article|taxonomies/yb_category|users/me)$#D', $route);
        if (($read && ($route === '' || $route === '/wp/v2' || in_array($route, array('/yottabyte/v1/articles', '/yottabyte/v1/publication-status'), true) || $article || $media || $reference)) || ($write && ($article || $media))) {
            return $result; // Core still checks ownership, field and upload permissions.
        }
        return new WP_Error('yb_publisher_route_denied', 'この投稿用アカウントではHPブログと画像の操作だけが許可されています。', array('status' => 403));
    }

    public static function publisher_image_mimes($mimes) {
        if (!self::is_publisher()) { return $mimes; }
        return array_intersect($mimes, array('image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'));
    }

    public static function publisher_attachment_query($args, $request) {
        if (self::is_publisher()) { $args['author'] = get_current_user_id(); }
        return $args;
    }

    private static function utf16_length($text) {
        preg_match_all('/./us', $text, $characters);
        $length = 0;
        foreach ($characters[0] as $character) { $length += strlen($character) > 3 ? 2 : 1; }
        return $length;
    }

    public static function validate_publisher_article($prepared, $request) {
        if (!self::is_publisher()) { return $prepared; }
        $previous = !empty($request['id']) ? get_post((int) $request['id']) : null;
        $status = $prepared->post_status ?? ($previous ? $previous->post_status : 'draft');
        if (!in_array($status, array('draft', 'publish'), true) || !empty($prepared->post_password)) {
            return new WP_Error('yb_invalid_article_status', '投稿用APIでは下書きと通常公開を使用してください。', array('status' => 422));
        }
        if ($status !== 'publish') { return $prepared; }
        $title = self::plain($prepared->post_title ?? ($previous ? $previous->post_title : ''));
        $body = $prepared->post_content ?? ($previous ? $previous->post_content : '');
        $slug = $prepared->post_name ?? ($previous ? $previous->post_name : '');
        if ($slug === '') { $slug = sanitize_title($title); }
        $decoded_slug = rawurldecode($slug);
        $excerpt = self::plain($prepared->post_excerpt ?? ($previous ? $previous->post_excerpt : ''));
        if ($title === '' || self::utf16_length($title) > 300 || trim(wp_kses_post($body)) === '' || strlen($body) > 2000000 ||
            self::utf16_length($excerpt) > 1000 ||
            $decoded_slug === 'category' || !preg_match('/^[\p{L}\p{N}][\p{L}\p{N}_-]{0,179}$/uD', $decoded_slug)) {
            return new WP_Error('yb_invalid_article', '公開には300文字以内のタイトル、有効なURL名、空でない本文が必要です。', array('status' => 422));
        }
        $tags = new WP_HTML_Tag_Processor($body);
        while ($tags->next_tag('IMG')) {
            $src = (string) $tags->get_attribute('src');
            if (str_starts_with($src, '/') && !str_starts_with($src, '//')) { $src = 'https://cms.yottabyte.jp' . $src; }
            $url = wp_parse_url($src);
            if (!$url || ($url['scheme'] ?? '') !== 'https' || ($url['host'] ?? '') !== 'cms.yottabyte.jp' ||
                !str_starts_with($url['path'] ?? '', '/wp-content/uploads/') || isset($url['user']) || isset($url['pass']) || isset($url['port'])) {
                return new WP_Error('yb_invalid_image', '記事画像はCMSのメディアへアップロードしたHTTPS画像を使ってください。', array('status' => 422));
            }
        }
        $image_id = isset($request['featured_media']) ? (int) $request['featured_media'] : ($previous ? get_post_thumbnail_id($previous) : 0);
        if ($image_id) {
            $image = get_post($image_id);
            if (!$image || $image->post_type !== 'attachment' || (int) $image->post_author !== get_current_user_id()) {
                return new WP_Error('yb_invalid_featured_media', 'サムネイルには自分でアップロードした画像を使ってください。', array('status' => 403));
            }
        }
        return $prepared;
    }

    public static function activate() {
        if (!self::enabled()) {
            wp_die('このプラグインは cms.yottabyte.jp 専用です。');
        }
        self::upgrade_capabilities();
        self::register();
        foreach (array('development' => 'システム開発', 'automation' => '業務改善・自動化', 'ai' => 'AI活用', 'website' => 'HP制作') as $slug => $name) {
            if (!term_exists($slug, self::TAXONOMY)) {
                wp_insert_term($name, self::TAXONOMY, array('slug' => $slug));
            }
        }
        update_option('blog_public', 0);
        flush_rewrite_rules();
    }

    public static function routes() {
        register_rest_route('yottabyte/v1', '/articles', array(
            'methods' => 'GET', 'permission_callback' => '__return_true',
            'callback' => array(__CLASS__, 'articles'),
            'args' => array(
                'page' => array('default' => 1, 'type' => 'integer', 'minimum' => 1, 'maximum' => 200),
                'per_page' => array('default' => 50, 'type' => 'integer', 'minimum' => 1, 'maximum' => 100),
            ),
        ));
        register_rest_route('yottabyte/v1', '/publication-status', array(
            'methods' => 'GET',
            'permission_callback' => static function() { return current_user_can('edit_yb_articles'); },
            'callback' => static function() {
                $status = get_option(self::STATUS, array());
                return new WP_REST_Response(array(
                    'requestedAt' => $status['at'] ?? null,
                    'accepted' => !empty($status['ok']), 'githubStatus' => (int) ($status['code'] ?? 0),
                    'workflowUrl' => 'https://github.com/YottaByte-jp/yottabyte_hp/actions/workflows/deploy-pages.yml',
                    'note' => '開始要求の受付状況です。HP反映完了は公開URLで確認してください。',
                ));
            },
        ));
    }

    private static function plain($text) {
        return html_entity_decode(wp_strip_all_tags($text), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }

    public static function articles($request) {
        $page = (int) $request['page'];
        $query = new WP_Query(array(
            'post_type' => self::TYPE, 'post_status' => 'publish', 'has_password' => false,
            'posts_per_page' => (int) $request['per_page'], 'paged' => $page,
            'orderby' => array('date' => 'DESC', 'ID' => 'DESC'), 'ignore_sticky_posts' => true,
        ));
        $items = array();
        foreach ($query->posts as $post) {
            $terms = wp_get_post_terms($post->ID, self::TAXONOMY, array('fields' => 'slugs'));
            $category = 'development';
            foreach (array('development', 'automation', 'ai', 'website') as $candidate) {
                if (!is_wp_error($terms) && in_array($candidate, $terms, true)) { $category = $candidate; break; }
            }
            $thumbnail = get_post_thumbnail_id($post->ID);
            $description = self::plain($post->post_excerpt ?: strip_shortcodes($post->post_content));
            $items[] = array(
                'id' => $post->ID, 'status' => 'publish', 'slug' => $post->post_name,
                'title' => self::plain($post->post_title),
                'description' => wp_trim_words($description, 80, '…'),
                'category' => $category, 'publishedAt' => get_the_date('Y-m-d', $post),
                'image' => $thumbnail ? array('src' => wp_get_attachment_url($thumbnail), 'alt' => get_post_meta($thumbnail, '_wp_attachment_image_alt', true)) : null,
                'html' => wp_kses_post(apply_filters('the_content', $post->post_content)),
            );
        }
        $response = new WP_REST_Response(array('version' => 1, 'items' => $items, 'page' => $page, 'totalPages' => (int) $query->max_num_pages));
        $response->header('Cache-Control', 'no-store');
        $response->header('X-Robots-Tag', 'noindex');
        return $response;
    }

    public static function changed($id, $post, $update, $before) {
        if ($post->post_type !== self::TYPE || wp_is_post_revision($id) || wp_is_post_autosave($id)) { return; }
        if ($post->post_status === 'publish' || ($before && $before->post_status === 'publish')) {
            self::$pending = true;
        }
    }

    public static function deleted($id, $post) {
        if ($post && $post->post_type === self::TYPE && $post->post_status === 'publish') { self::$pending = true; }
    }

    public static function dispatch_pending() {
        if (self::$pending) { self::dispatch(); }
    }

    private static function dispatch() {
        $token = get_option(self::TOKEN, '');
        $code = 0;
        if ($token) {
            $response = wp_remote_post('https://api.github.com/repos/YottaByte-jp/yottabyte_hp/actions/workflows/deploy-pages.yml/dispatches', array(
                'timeout' => 15, 'redirection' => 0,
                'headers' => array('Authorization' => 'Bearer ' . $token, 'Accept' => 'application/vnd.github+json', 'Content-Type' => 'application/json', 'User-Agent' => 'YottaByte-Corporate-Blog/1.0', 'X-GitHub-Api-Version' => '2022-11-28'),
                'body' => wp_json_encode(array('ref' => 'main')),
            ));
            if (!is_wp_error($response)) { $code = wp_remote_retrieve_response_code($response); }
        }
        update_option(self::STATUS, array('at' => current_time('mysql'), 'code' => $code, 'ok' => $code === 204), false);
    }

    public static function menu() {
        // This is a dedicated CMS: avoid two different, easily confused article lists.
        remove_menu_page('edit.php');
        remove_menu_page('edit.php?post_type=page');
        add_submenu_page('edit.php?post_type=' . self::TYPE, 'HP公開連携', 'HP公開連携', 'manage_options', 'yb-blog-settings', array(__CLASS__, 'settings'));
    }

    public static function dashboard() {
        remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
        wp_add_dashboard_widget('yb_blog_dashboard', 'YottaByte HPブログ', static function() {
            echo '<p>HPへ掲載する記事は「HPブログ」で作成してください。公開・更新するとHPへの反映を開始します。</p>';
            echo '<p><a href="' . esc_url(admin_url('post-new.php?post_type=' . self::TYPE)) . '">記事を書く</a> / <a href="' . esc_url(admin_url('edit.php?post_type=' . self::TYPE)) . '">記事一覧</a></p>';
        });
    }

    public static function settings() {
        if (!current_user_can('manage_options')) { return; }
        $status = get_option(self::STATUS, array());
        ?>
        <div class="wrap"><h1>HPブログの公開連携</h1>
        <p>「HPブログ」の公開記事だけを yottabyte.jp/blog/ に表示します。通常の「投稿」や下書き・非公開記事は取り込みません。</p>
        <p>カテゴリーはシステム開発・業務改善・自動化・AI活用・HP制作から選んでください。未選択ならシステム開発になります。</p>
        <p>記事の公開・更新・公開取り消しでHPの再生成を開始します。反映には数分かかります。取得やビルドに失敗した場合、公開中のHPは維持されます。</p>
        <p>接続先: YottaByte-jp/yottabyte_hp / deploy-pages.yml / main</p>
        <p>GitHubのfine-grained tokenは、このリポジトリのみ・ActionsのRead and write権限に限定してください。値は画面に再表示しません。</p>
        <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <?php wp_nonce_field('yb_blog_settings'); ?>
        <input type="hidden" name="action" value="yb_blog_settings">
        <label for="yb-token">GitHub token（<?php echo get_option(self::TOKEN) ? '設定済み。空欄で保存すると維持' : '未設定'; ?>）</label><br>
        <input type="password" id="yb-token" name="token" autocomplete="new-password" class="regular-text">
        <?php submit_button('接続設定を保存', 'primary', 'yb-save-settings'); ?></form>
        <h2>反映状況</h2>
        <p><?php echo esc_html(empty($status) ? 'まだ再生成を要求していません。' : $status['at'] . ' / ' . ($status['ok'] ? '再生成の開始を受け付けました。公開結果はGitHub Actionsで確認してください。' : '再生成を開始できませんでした。接続設定とGitHub Actionsを確認し、再試行してください。') . ' HTTP ' . $status['code']); ?></p>
        <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <?php wp_nonce_field('yb_blog_dispatch'); ?><input type="hidden" name="action" value="yb_blog_dispatch">
        <?php submit_button('HPへの反映を再試行', 'secondary', 'yb-dispatch'); ?></form>
        <p><a href="https://github.com/YottaByte-jp/yottabyte_hp/actions/workflows/deploy-pages.yml" target="_blank" rel="noopener noreferrer">公開処理の結果を確認</a></p></div>
        <?php
    }

    public static function save_settings() {
        if (!current_user_can('manage_options')) { wp_die('権限がありません。', '', array('response' => 403)); }
        check_admin_referer('yb_blog_settings');
        $token = isset($_POST['token']) ? trim(wp_unslash($_POST['token'])) : '';
        if ($token !== '') {
            if (!preg_match('/^github_pat_[A-Za-z0-9_]+$/D', $token)) { wp_die('fine-grained tokenを入力してください。'); }
            update_option(self::TOKEN, $token, false);
        }
        wp_safe_redirect(admin_url('edit.php?post_type=' . self::TYPE . '&page=yb-blog-settings'));
        exit;
    }

    public static function manual_dispatch() {
        if (!current_user_can('manage_options')) { wp_die('権限がありません。', '', array('response' => 403)); }
        check_admin_referer('yb_blog_dispatch');
        self::dispatch();
        wp_safe_redirect(admin_url('edit.php?post_type=' . self::TYPE . '&page=yb-blog-settings'));
        exit;
    }

    public static function redirect_frontend() {
        wp_redirect('https://yottabyte.jp/blog/', 302, 'YottaByte Corporate Blog');
        exit;
    }
}

register_activation_hook(__FILE__, array('YottaByte_Corporate_Blog', 'activate'));
YottaByte_Corporate_Blog::boot();
