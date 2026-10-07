import Link from 'next/link';
import { company, navigation } from '@/app/_data/site';
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link className="footer-brand" href="/">
              YOTTABYTE
            </Link>
            <p className="footer-company">
              {company.name}
              <br />
              {company.address}
              <br />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
          </div>
          <nav aria-label="フッターナビゲーション">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact/#form">協業相談</Link>
            <Link href="/contact/">お問い合わせ</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <small>© YottaByte. All rights reserved.</small>
          <Link href="/privacypolicy/">個人情報保護方針</Link>
        </div>
      </div>
    </footer>
  );
}
