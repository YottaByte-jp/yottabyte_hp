# 合同会社YottaByte ホームページ

Studio「コーポレート｜企業向け」の公開デモを参考に、フォント、レイアウト、レスポンシブ表示、ナビゲーションなどを独立したNext.jsの静的サイトとして実装しています。元テンプレートのソースや画像は使用していません。

## 起動と検証

Node.js 24以上、npm 11以上を使用します。

```sh
npm install
npm run dev
npm run lint
npm run build
```

`npm run build`は`out/`に静的ファイルを生成します。公開先は`https://yottabyte.jp/`で、`main`への反映時にGitHub ActionsからGitHub Pagesへデプロイします。既存の`public/CNAME`を維持しています。

## ページ構成

トップ、企業情報、事業内容、事業詳細、対応事例一覧・カテゴリ・記事、お知らせ一覧・カテゴリ・記事、お問い合わせ、送信完了、個人情報保護方針、モバイルメニュー、404の15種類の画面です。記事やカテゴリを含めた具体的なURLは`app/_data/site.ts`の`routePaths`に定義しています。

会社情報・サービス・記事は`app/_data/site.ts`で編集できます。対応事例は支援内容の例であり、架空の顧客名や納品実績を掲載していません。お知らせは会社とサービスの案内文です。設立日と決算月は掲載していません。

## 画像と書体

写真4点は組み込みのimage_genで新規生成し、WebPに最適化しています。生成プロンプトは`docs/image-prompts/`、記録は`docs/image-generation.json`、Web用画像は`public/generated/`に保存しています。写真は事業イメージであり、実際の事務所や社員を撮影した写真ではありません。

事業図・アイコンは新規のSVGです。書体は元デモと同じNoto Sans JPとLatoを使用し、Next.jsのフォント機能でセルフホストしています。ライセンスは`public/licenses/`に保存しています。

## お問い合わせ

フォームはCloudflare Workersの送信処理からResendへ接続します。送信元は`contact@mail.yottabyte.jp`、通知先は`raio20061114@gmail.com`に固定し、入力されたメールアドレスをReply-Toに設定します。入力チェック、同意、隠し項目、1分あたり5回の送信制限、Resendの冪等性キーを使用しています。

送信処理は`contact-worker/index.mjs`、設定は`contact-worker/wrangler.jsonc`です。Resendがメールを受け付けた応答を確認した場合だけ、フォームが`/contact-thanks/`へ遷移します。失敗・応答不明の場合は入力内容を保持します。

ビルド時に`NEXT_PUBLIC_CONTACT_ENDPOINT`を設定してください。ローカル開発には`.env.example`を参考に`.env.local`を作成します。GitHub Pagesのビルドには公開URLを設定済みです。`RESEND_API_KEY`はWorkerのシークレットとして保管し、フロントエンド、Git、公開ビルドに含めません。

```sh
node --test contact-worker/index.test.mjs
```

無料枠はResendが月3,000通・1日100通、Cloudflare Workersが1日100,000リクエストです。設定・実送信の確認状況は`docs/resend-setup.txt`に記録します。

## 参考

- [Studioの参考テンプレート](https://studio.design/ja/store/templates/dKwa5VYWX7)
- [第三者ライセンス](./THIRD_PARTY_NOTICES.md)
