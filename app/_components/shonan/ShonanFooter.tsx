import Image from 'next/image';
import Link from 'next/link';
import { company, socialLinks } from '@/app/_data/site';
import { CoastalTown } from './CoastalTown';
import { Arrow } from './ReferenceParts';
import { Cloud, PaperPlane } from './ScrollScenery';
import styles from './shonan.module.css';

export function ShonanFooter() {
  return (
    <footer className={styles.footer} data-scene-footer>
      <div className={styles.footerWorld} aria-hidden="true">
        <CoastalTown side="right" className={styles.footerTownRight} />
        <Cloud className={styles.footerCloudOne} />
        <Cloud className={styles.footerCloudTwo} />
        <Cloud className={styles.footerCloudThree} />
        <PaperPlane className={styles.footerPlane} />
      </div>
      <div className={styles.footerContent} data-footer-content>
        <Link href="/" className={styles.footerBrand}>
          <span className={styles.footerMark} aria-hidden="true">
            <Image src="/yottabyte_logo-removebg-preview.png" alt="" width={500} height={500} />
          </span>
          <span>{company.name}</span>
        </Link>
        <div className={styles.footerDetails}>
          <address>
            {company.address}
            <br />
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </address>
          <nav aria-label="フッターナビゲーション">
            <Link href="/service/">事業紹介</Link>
            <Link href="/service/development/">システム・AI開発</Link>
            <Link href="/service/website/">HP制作</Link>
            <Link href="/features/">特徴と強み</Link>
            <Link href="/solutions/">支援領域</Link>
            <Link href="/case/">対応事例</Link>
            <Link href="/blog/">ブログ</Link>
            <Link href="/company/">会社情報</Link>
            <Link href="/news/">お知らせ</Link>
          </nav>
        </div>
        <div className={styles.footerSocial}>
          <nav aria-label="SNS">
            {socialLinks.map(({ label, href, logo }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label}（新しいタブで開く）`}
                title={label}
                data-social={label.toLowerCase()}
              >
                <Image src={logo} alt="" width={56} height={56} />
              </a>
            ))}
          </nav>
        </div>
        <div className={styles.footerActions}>
          <Link href="/service/">
            <strong>Service</strong>
            <span>事業紹介</span>
            <Arrow />
          </Link>
          <Link href="/contact/">
            <strong>Contact</strong>
            <span>お問い合わせ</span>
            <Arrow />
          </Link>
        </div>
      </div>
      <p className={styles.footerStatement} aria-hidden="true">
        {['LET’S', 'BUILD IT.'].map((word) => (
          <span key={word}>
            {[...word].map((letter, i) => (
              <span data-footer-glyph key={i}>
                {letter === ' ' ? '\u00a0' : letter}
              </span>
            ))}
          </span>
        ))}
      </p>
      <div className={styles.footerBottom}>
        <small>© YottaByte. All Rights Reserved.</small>
        <Link href="/privacypolicy/">プライバシーポリシー</Link>
      </div>
    </footer>
  );
}
