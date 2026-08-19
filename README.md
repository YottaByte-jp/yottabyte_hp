# YottaByte Homepage

YottaByteの公式ホームページです。microCMS公式の「シンプルなコーポレートサイト」を参考に、既存の文章とブランド素材を使った静的なNext.jsサイトとして構成しています。

## 開発環境

- Node.js 24以上
- npm 11以上

## ローカル起動

```bash
npm install
npm run dev
```

`http://localhost:3000` を開いて確認します。

## 検証

```bash
npm run lint
npm run build
```

`npm run build` で `out/` に静的ファイルを書き出します。`public/CNAME` も同時に含まれるため、GitHub Pagesのカスタムドメイン `yottabyte.jp` を維持できます。

## デザイン方針

- microCMS公式「シンプルなコーポレートサイト」のレイアウト、配色、画像を基本的に維持
- 既存のロゴ、プロフィール写真、掲載文章へ差し替え
- News、実績、所在地など、根拠のない情報は追加しない

## ライセンス

構成の参考にしたmicroCMS公式テンプレートのライセンスは [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) に記載しています。
