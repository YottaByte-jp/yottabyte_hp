# MuseからHPブログへ自動投稿

Muse → WordPressの「HPブログ」→ GitHub Pages → `https://yottabyte.jp/blog/` の順で反映します。記事ごとの人間の承認は必要ありません。投稿頻度・テーマの定期実行は別途Museで設定します。

## 初回接続

1. CMSにYottaByte Corporate Blog **1.1.0**を導入します。既存記事・既存のGitHub接続キーは維持します。
2. WordPressに専用ユーザー `muse_publisher` を作り、役割を **HPブログ投稿者（自動連携用）** にします。管理者アカウントは使いません。登録メールは既存ユーザーと異なる本人管理のアドレスを使用します。
3. 本人が新ユーザーのアプリケーションパスワードを **Muse HP Blog** の名前で発行し、パスワード管理アプリへ保存します。通常ログイン用パスワードとは別です。チャット・Git・記事本文には貼りません。
4. 本人が `https://yottabyte.jp/integrations/wordpress-authorization.html` を開き、発行したアプリケーションパスワードを貼り付け、「Muse用の値を作る」「値をコピー」を押します。ブラウザー内だけでBasicヘッダーへ変換し、送信・保存・解析は行いません。値はパスワードと同等の秘密情報です。
5. Museに下の設定指示を渡し、カスタムコネクターを作成します。本人が専用認証入力画面にコピーした値を登録します。チャット欄には貼りません。MuseのSecure Credentials Storeを使用します。
6. 許可はこのコネクターと `cms.yottabyte.jp` のブログ操作に限定します。管理者設定・ユーザー管理・削除操作は不要です。

仕様: `https://yottabyte.jp/integrations/muse-wordpress.openapi.json`

WordPressへの認証はHTTPSのHTTP Basicです。Museの独自コネクターにはBasicのユーザー名・パスワード登録フォームがないため、**api_key / custom_header:Authorization / host cms.yottabyte.jp** を使用します。保存値は `Basic ` とBase64形式のユーザー名・アプリケーションパスワードの組み合わせです。Museは保存値をヘッダーへそのまま送信します。`bearer_header` は使用しません。仕様書には実際の認証情報を含めません。通常のHTTPクライアントは従来どおりBasic認証を利用できます。

## Museへ渡す接続・投稿指示

```text
合同会社YottaByteのHPブログをWordPress REST APIで管理するカスタムコネクターを作成してください。
API仕様: https://yottabyte.jp/integrations/muse-wordpress.openapi.json
APIサーバー: https://cms.yottabyte.jp/wp-json
認証方式: api_key。placementはcustom_header:Authorization、ホストはcms.yottabyte.jp。
コネクター名はcustom.yottabyte-wordpress。Secure Credentials Storeへの本人用入力画面を表示します。
保存値はBasicから始まるAuthorizationヘッダーの値そのものです。Bearerなどは追加しません。
これはWordPress標準のアプリケーションパスワードによるHTTP Basic認証です。
通常のWordPress投稿 /wp/v2/posts は使わず、必ず /wp/v2/yottabyte-articles を使ってください。
APIを呼ぶたびに認証情報をチャットや実行ログへ表示しないでください。

記事ごとの人間の確認・承認は挟まず、次の順で自動処理してください。
1. users/meで接続ユーザーを確認。yb_categoryを取得し、既存カテゴリーを1つ選択。
   development=システム開発、automation=業務改善・自動化、ai=AI活用、website=HP制作。
   記事のカテゴリー用フィールドは categories ではなく yb_category（数値IDの配列）。
2. 記事のURL名slugを決め、同じslugの記事がないか検索。再試行時も重複を作らない。
   更新は自分の記事だけ。既存記事の著者を変えたり、他人の記事を上書きしない。
3. status=draftで記事を作成してIDを保存。draftは処理途中の一時状態で、人間の承認待ちではない。
4. 必要な画像は先にmediaへアップロードし、alt_textとpost（記事ID）を設定。
   JPEG/PNG/WebP/GIF/AVIFが利用可能。画像は任意で、未指定ならHP側のカテゴリーSVGを使用。
   本文画像はCMSが返したHTTPSの /wp-content/uploads/ URLを使う。外部画像の直リンクは禁止。
5. 記事のtitle、slug、content（HTML）、excerpt、yb_category、任意のfeatured_mediaを設定。
   titleは空不可・300文字以内、excerptは1000文字以内、本文は空不可・2MB以内。
   slugは180文字以内の英数字・日本語・ハイフン・アンダースコア、先頭は文字か数字。categoryは予約語。
   見出し、段落、リスト、表、画像などのHTMLを使用。script、iframe、任意のCSSは使わない。
   根拠のない実績・効果や架空の会社情報を書かず、必要な調査と事実確認は自動で行う。
6. 自動チェックが通ったらstatus=publishで公開し、返された記事IDと状態を確認。
7. /yottabyte/v1/publication-statusで再生成の受付を確認。ただしaccepted=trueはHP反映完了ではない。
8. https://yottabyte.jp/blog/{slug}/ を数分間隔で最大15分確認し、タイトル・本文・画像の表示を確認。
   WordPressのlinkはCMS用なので読者向けURLとして使用しない。
9. 4xxは原因を確認して停止。通信失敗・タイムアウト・5xx時は、再投稿前にID/slugで保存状態を確認。
   不明なままPOSTを繰り返さない。HP反映失敗時も新しい重複記事を作らない。

これは接続設定です。投稿テーマ・頻度が未指定の間は定期投稿を開始しないでください。
```

## 権限と確認

専用ロールは自分のHPブログの作成・編集・公開と画像アップロードに限定します。他人の記事の変更、通常投稿・固定ページ、ユーザー・権限・設定・プラグインの操作、削除、カテゴリーの新規作成は許可しません。アプリケーションパスワード単体に独自スコープがあるのではなく、ユーザーの専用ロールとREST API制限がこの範囲を実現します。

画像一覧も自分のアップロードに限定します。既存管理者の通常操作は維持します。CMSの管理画面・REST API双方で記事の所有者に対する権限が適用されます。専用ロールのREST操作は仕様に含めたエンドポイントのみ利用できます。本文表示の装飾制約はブラウザー投稿でもAPI投稿でも共通です。

`python3 scripts/test-wordpress-api.py` で実際のWordPress・MariaDBを一時コンテナに構築し、アプリケーションパスワード、記事・画像投稿、所有権、禁止操作、既存管理者の権限を検証します。Docker Composeが必要です。本番へのリクエストは行わず、一時コンテナとボリュームだけを最後に削除します。

## 停止・復旧

- Museの接続解除だけではWordPressのキーは失効しません。CMS管理者から当該ユーザーの **Muse HP Blog** アプリケーションパスワードを失効してください。GitHubのHP公開用キーとは別です。
- 既存の管理者・GitHub連携・記事データは削除しません。接続を再作成するときは同じ記事ID/slugを確認して重複を防ぎます。
- プラグインを1.0.0へ戻す場合は、先に専用アカウントのAPIキーを失効し、ロールを購読者へ変更してください。1.0.0には投稿専用の権限制限がありません。通常の管理者投稿は以前の仕組みへ戻ります。データやGitHub接続キーを消すアンインストール処理はありません。
