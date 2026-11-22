import Image from 'next/image';
import Link from 'next/link';
import { blogCategories, blogCategory, blogDate, type BlogPost } from '@/app/_data/blog';
import { ActionLink, Arrow } from './ReferenceParts';
import { GreenLandscape } from './InnerParts';
import { ITPerson, ServiceSeal } from './ScrollScenery';
import shared from './inner.module.css';
import styles from './blog.module.css';

function PreviewNotice() {
  return (
    <aside className={styles.previewNotice} aria-label="デザインプレビュー">
      <strong>デザイン確認用</strong>
      <span>サンプルの文章・日付・画像です。公開記事には含まれません。</span>
      <Link href="/blog/">実際のブログ一覧を見る</Link>
    </aside>
  );
}

export function BlogCard({ post, preview = false }: { post: BlogPost; preview?: boolean }) {
  const category = blogCategory(post.category);
  return (
    <article className={`${shared.caseCard} ${styles.card}`} data-inner-panel>
      <Link href={preview ? `/preview/blog/article/${post.slug}/` : `/blog/${post.slug}/`}>
        <span className={shared.caseCategory} aria-label={category.label}>
          <ServiceSeal>{category.badge}</ServiceSeal>
        </span>
        <div className={shared.caseImage}>
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={720}
            height={480}
            sizes="(max-width: 600px) 90vw, (max-width: 967px) 44vw, 30vw"
          />
        </div>
        <div className={shared.caseText}>
          <p>
            <time dateTime={post.publishedAt}>{blogDate(post.publishedAt)}</time>
          </p>
          <h2>{post.title}</h2>
          <span className={shared.cardArrow} aria-hidden="true">
            <Arrow />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function BlogList({
  posts,
  category,
  preview = false,
}: {
  posts: readonly BlogPost[];
  category?: string;
  preview?: boolean;
}) {
  const list = posts.filter((post) => !category || post.category === category);
  const availableCategories = blogCategories.filter((item) =>
    posts.some((post) => post.category === item.id),
  );
  return (
    <GreenLandscape>
      {preview ? <PreviewNotice /> : null}
      <section className={shared.caseSection} data-inner-section>
        <nav
          className={`${shared.filters} ${!availableCategories.length || preview ? styles.singleFilter : ''}`}
          aria-label="ブログのカテゴリー"
        >
          <Link
            href={preview ? '/preview/blog/' : '/blog/'}
            aria-current={!category ? 'page' : undefined}
          >
            すべて
          </Link>
          {!preview
            ? availableCategories.map((item) => (
                <Link
                  href={`/blog/category/${item.id}/`}
                  aria-current={category === item.id ? 'page' : undefined}
                  key={item.id}
                >
                  {item.label}
                </Link>
              ))
            : null}
        </nav>
        <p className={shared.resultCount} data-inner-copy>
          {list.length}件の記事
        </p>
        {list.length ? (
          <div className={shared.caseGrid}>
            {list.map((post) => (
              <BlogCard key={post.slug} post={post} preview={preview} />
            ))}
          </div>
        ) : (
          <div className={styles.empty} data-inner-panel>
            <div className={styles.emptyPerson} aria-hidden="true">
              <ITPerson pose="laptop" />
            </div>
            <h2>記事を準備しています</h2>
            <p>
              技術や仕事にまつわるヒントを、
              <br />
              ここからお届けしていきます。
            </p>
          </div>
        )}
        {process.env.NODE_ENV === 'development' && !preview ? (
          <p className={styles.previewLink}>
            <Link href="/preview/blog/">カードと記事ページのデザインを確認する →</Link>
          </p>
        ) : null}
      </section>
    </GreenLandscape>
  );
}

const relatedServices = {
  development: { href: '/service/development/', label: 'システム・AI開発' },
  automation: { href: '/service/automation/', label: '業務改善・自動化' },
  ai: { href: '/service/ai/', label: 'AI活用' },
  website: { href: '/service/website/', label: 'HP制作' },
};

export function BlogArticle({ post, preview = false }: { post: BlogPost; preview?: boolean }) {
  const category = blogCategory(post.category);
  const related = relatedServices[post.category];
  return (
    <GreenLandscape>
      {preview ? <PreviewNotice /> : null}
      <article className={styles.article} data-inner-section data-inner-panel>
        <header className={styles.articleHeader}>
          <div className={styles.articleMeta}>
            <time dateTime={post.publishedAt}>{blogDate(post.publishedAt)}</time>
            <Link href={preview ? '/preview/blog/' : `/blog/category/${post.category}/`}>
              {category.label}
            </Link>
          </div>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </header>
        <figure className={styles.cover}>
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={720}
            height={480}
            sizes="(max-width: 967px) 90vw, 900px"
          />
        </figure>
        <div className={styles.body}>
          {post.blocks.map((block, index) => {
            if (block.type === 'html')
              return (
                <div
                  className={styles.prose}
                  key={index}
                  dangerouslySetInnerHTML={{ __html: block.html }}
                />
              );
            if (block.type === 'heading') return <h3 key={index}>{block.text}</h3>;
            if (block.type === 'paragraph') return <p key={index}>{block.text}</p>;
            if (block.type === 'list')
              return (
                <ul key={index}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            return (
              <figure key={index}>
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={720}
                  height={480}
                  sizes="(max-width: 967px) 80vw, 720px"
                />
                {block.caption ? <figcaption>{block.caption}</figcaption> : null}
              </figure>
            );
          })}
          <aside className={styles.related} aria-label="関連するサービス">
            <p>この記事に関連するサービス</p>
            <Link href={related.href}>
              {related.label} <Arrow />
            </Link>
          </aside>
          <div className={styles.contact}>
            <p>気になることがあれば、お聞かせください。</p>
            <ActionLink href="/contact/" text="お問い合わせ" />
          </div>
        </div>
      </article>
      <div className={styles.back}>
        <ActionLink href={preview ? '/preview/blog/' : '/blog/'} text="ブログ一覧へ戻る" />
      </div>
    </GreenLandscape>
  );
}
