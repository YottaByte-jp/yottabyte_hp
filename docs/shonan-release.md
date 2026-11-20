# 湘南デザインの本番公開

トップと下層ページは `app/_components/shonan/` の共通部品で構成する。
`app/page.tsx` と `app/[...slug]/page.tsx` から通常のURLで表示し、既存の会社情報・事例・お知らせ・フォーム処理を引き継ぐ。

- 本番: https://yottabyte.jp/
- 公開: mainへのマージ後、既存のGitHub Pages workflowで静的出力 `out/` を配置する。
- 確認: `npm run lint`、`npm run build`、`node scripts/verify-static-export.mjs`。
- 復旧: 公開したマージコミットをrevertし、同じworkflowで再公開する。

## イラストと書体

街・人物の透過部品は、このサイト用に生成した架空の湘南の街とITの仕事を表すイラスト。
参考サイト https://sunbousai.jp/ の配信画像・ロゴは使用していない。
AVIF/WebP部品は `public/illustrations/shonan-components/` と `shonan-business/` に置く。
IT画面・海岸・道路・看板・事例の表紙はSVGで構成し、事例SVGは
`node scripts/generate-shonan-case-art.mjs` で再生成できる。

ローカル書体はGoogle Fonts由来のBBH Bartle、Instrument Sans、Zen Kaku Gothic New。
配布ライセンスを `public/fonts/shonan-reference/` に同梱する。
日本語サブセット外の文字は既存の日本語フォントへフォールバックする。

フォームの送信先・解析ID・カスタムドメインは既存の設定を使用する。
公開確認でメール送信を発生させるテストは実行しない。
