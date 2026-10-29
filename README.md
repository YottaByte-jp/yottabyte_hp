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

本番ビルドはWebpackを使用します。GitHub Actionsで発生したTurbopackのGoogle Fonts処理エラーを回避し、Noto Sans JPとLatoを同じ設定でセルフホストします。

## ページ構成

トップ、企業情報、事業内容、事業詳細、対応事例一覧・カテゴリ・記事、お知らせ一覧・カテゴリ・記事、お問い合わせ、送信完了、個人情報保護方針、モバイルメニュー、404の15種類の画面です。記事やカテゴリを含めた具体的なURLは`app/_data/site.ts`の`routePaths`に定義しています。

会社情報・サービス・記事は`app/_data/site.ts`で編集できます。対応事例は支援内容の例であり、架空の顧客名や納品実績を掲載していません。お知らせは会社とサービスの案内文です。設立日と決算月は掲載していません。

## 画像と書体

候補を含む事業イメージ8点は組み込みのimage_genで生成・編集し、WebPに最適化しています。生成プロンプトは`docs/image-prompts/`、記録は`docs/image-generation.json`、Web用画像は`public/generated/`に保存しています。生成した画像は事業イメージであり、実際の事務所や社員を撮影した写真ではありません。

トップのメイン画像は、Pcs34560撮影の葉山・一色海岸の実写写真です。出典は`THIRD_PARTY_NOTICES.md`、`public/licenses/Hayama-photo.txt`に記録しています。人物入りの開発オフィスの生成画像`public/generated/05-shonan-development-hero.webp`は候補素材として保持し、現在のページには表示していません。生成画像の元PNGと使用したプロンプトはダウンロード内の`YottaByte_HP画像_20261030`にも保存しています。代表メッセージ欄は既存の`public/DSC_2003.jpg`をWebPに最適化した画像を使用しています。

企業情報ページの先頭には、トップのCOMPANY紹介画像と同じグレーのソファ・淡い木・ガラス張りの会議室の雰囲気に揃え、海を広く見せた`public/generated/08-shonan-company-office.webp`を使用しています。人やコーディング場面は含めていません。生成元は2017×780ピクセルで、拡大処理をせずWebPに変換しています。既存の先頭画像枠だけを差し替え、構造・サイズ・余白は維持しています。以前の`public/generated/06-shonan-seaview-office.webp`は候補素材として保管しています。

トップページのCOMPANY紹介枠には`public/generated/07-shonan-office-lounge.webp`を使用しています。元のソファとガラス張りの会議室のある室内を活かし、窓の外を湘南の海に変更したイメージです。画像枠のサイズ・配置は変更していません。

元のセクション順・写真枠・画像枚数・スライドを維持し、各箇所の画像と文言を差し替えています。サービスと対応例の画像には`public/illustrations/`の独自SVGを使用し、同じ写真の使い回しを減らしています。会社ページのスライドは従来どおり4種類の画像を2組並べる無限スクロールです。追加セクションや説明文の枠は設けていません。

企業情報の下部の風景写真・スライドと、事業内容のメイン写真には、湘南地域の逗子マリーナ・逗子海岸、横須賀の立石公園などの実写写真を使用しています。写真枠と配置は変更せず、代表写真と技術を説明する図は維持しています。追加した風景写真素材7点は撮影者がCC0またはパブリックドメインとして公開したもので、撮影者・出典・ライセンスを`public/licenses/Shonan-photos.json`に記録しています。

事業図・アイコンは新規のSVGです。書体は元デモと同じNoto Sans JPとLatoを使用し、Next.jsのフォント機能でセルフホストしています。ライセンスは`public/licenses/`に保存しています。

## 地域と検索向けの情報

葉山・湘南を拠点とする会社紹介を中心に、サービス欄では支援内容を伝えます。地域名と対応範囲の列挙は繰り返さず、横須賀・三浦半島の案内はお問い合わせページに集約しています。全国から依頼できることは問い合わせ案内と必要な検索説明文で簡潔に伝え、構造化データの対応範囲も日本全国としています。実在しない支店・顧客実績・地域内での独占性は記載しません。

各ページの検索タイトル・説明文・共有用メタデータと、トップの会社情報の構造化データは`app/_lib/seo.ts`で管理します。住所・連絡先は会社情報と一致させています。地域名だけを差し替えた検索向けページは作成していません。

ヘッダーは既存の高さと配置を維持し、薄いハイライトと縁取り、二段階の影、背景のぼかしで奥行きを付けています。ヘッダー内のボタンにも軽い影を付け、モバイルメニューの構造と動作は変更していません。

## お問い合わせ

サイトに掲載する連絡先とフォームの通知先は`contact@yottabyte.jp`です。通知はImprovMXを経由して、既存のGmailへ転送されます。

フォームはCloudflare Workersの送信処理からResendへ接続します。送信元は`contact@mail.yottabyte.jp`、通知先は`contact@yottabyte.jp`に固定し、入力されたメールアドレスをReply-Toに設定します。入力チェック、同意、隠し項目、1分あたり5回の送信制限、Resendの冪等性キーを使用しています。

送信処理は`contact-worker/index.mjs`、設定は`contact-worker/wrangler.jsonc`です。Resendがメールを受け付けた応答を確認した場合だけ、フォームが`/contact-thanks/`へ遷移します。失敗・応答不明の場合は入力内容を保持します。

ビルド時に`NEXT_PUBLIC_CONTACT_ENDPOINT`を設定してください。ローカル開発には`.env.example`を参考に`.env.local`を作成します。GitHub Pagesのビルドには公開URLを設定済みです。`RESEND_API_KEY`はWorkerのシークレットとして保管し、フロントエンド、Git、公開ビルドに含めません。

```sh
node --test contact-worker/index.test.mjs
```

無料枠はResendが月3,000通・1日100通、Cloudflare Workersが1日100,000リクエストです。設定・実送信の確認状況は`docs/resend-setup.txt`に記録します。

## アクセス解析

GA4の測定IDを`NEXT_PUBLIC_GA_MEASUREMENT_ID`に設定すると、Googleタグを全ページで読み込みます。計測対象は`yottabyte.jp`と`www.yottabyte.jp`だけで、ローカルプレビューではGoogleへ送信しません。ページ遷移はGA4の拡張計測機能で計測します。

お問い合わせのAPIが成功した場合だけ`generate_lead`を送信します。送信データは固定のフォームIDだけで、氏名・メールアドレス・電話番号・問い合わせ本文は含めません。計測が無効または失敗してもフォームの完了処理を続けます。Googleシグナルと広告のパーソナライズは無効です。

```sh
node --test tests/analytics.test.mjs
```

## 参考

- [Studioの参考テンプレート](https://studio.design/ja/store/templates/dKwa5VYWX7)
- [第三者ライセンス](./THIRD_PARTY_NOTICES.md)
