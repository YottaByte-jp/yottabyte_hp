const navigation = [
  { href: '#services', label: '事業内容' },
  { href: '#about', label: '私たちについて' },
  { href: '#profile', label: '代表' },
  { href: '#contact', label: 'お問い合わせ' },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav aria-label="フッターナビゲーション">
        <ul>
          {navigation.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <p>YottaByte / 加藤獅</p>
    </footer>
  );
}
