<?php
/**
 * Plugin Name: YottaByte Corporate Blog
 * Description: HPブログ専用の記事管理・公開API・GitHub Pages連携。
 * Version: 1.0.0
 * Requires PHP: 8.0
 */

defined('ABSPATH') || exit;

final class YottaByte_Corporate_Blog {
    const TYPE = 'yb_article';
    const TAXONOMY = 'yb_category';
    const TOKEN = 'yb_blog_dispatch_token';
    const STATUS = 'yb_blog_dispatch_status';
    private static $pending = false;

    public static function enabled() {
        return wp_parse_url(home_url(), PHP_URL_HOST) === 'cms.yottabyte.jp';
    }

    public static function boot() {
        if (!self::enabled()) { return; }
        add_action('after_setup_theme', static function() { add_theme_support('post-thumbnails'); });
        add_action('init', array(__CLASS__, 'register'));
        add_action('rest_api_init', array(__CLASS__, 'routes'));
        add_action('wp_after_insert_post', array(__CLASS__, 'changed'), 10, 4);
        add_action('before_delete_post', array(__CLASS__, 'deleted'), 10, 2);
        add_action('shutdown', array(__CLASS__, 'dispatch_pending'));
        add_action('admin_menu', array(__CLASS__, 'menu'));
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
            'menu_icon' => 'dashicons-edit-page',
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'author'),
        ));
        register_taxonomy(self::TAXONOMY, self::TYPE, array(
            'label' => 'ブログカテゴリー', 'public' => false, 'show_ui' => true,
            'show_in_rest' => true, 'hierarchical' => true,
        ));
    }

    public static function activate() {
        if (!self::enabled()) {
            wp_die('このプラグインは cms.yottabyte.jp 専用です。');
        }
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
        add_submenu_page('edit.php?post_type=' . self::TYPE, 'HP公開連携', 'HP公開連携', 'manage_options', 'yb-blog-settings', array(__CLASS__, 'settings'));
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
        <?php submit_button('接続設定を保存'); ?></form>
        <h2>反映状況</h2>
        <p><?php echo esc_html(empty($status) ? 'まだ再生成を要求していません。' : $status['at'] . ' / ' . ($status['ok'] ? '再生成の開始を受け付けました。公開結果はGitHub Actionsで確認してください。' : '再生成を開始できませんでした。接続設定とGitHub Actionsを確認し、再試行してください。') . ' HTTP ' . $status['code']); ?></p>
        <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <?php wp_nonce_field('yb_blog_dispatch'); ?><input type="hidden" name="action" value="yb_blog_dispatch">
        <?php submit_button('HPへの反映を再試行', 'secondary'); ?></form>
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
