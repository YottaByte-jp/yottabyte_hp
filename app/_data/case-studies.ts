export type CaseStudy = {
  id: string;
  category: 'development' | 'automation' | 'ai';
  title: string;
  image: string;
  imageAlt: string;
  body: string;
  sections: { title: string; body: string }[];
  scope: string[];
  technologies: string[];
  diagram: string;
  diagramAlt: string;
};

// Based on the representative's project experience, not corporate contract claims.
// Client/product names, contract types and periods are intentionally omitted.
export const caseStudies: CaseStudy[] = [
  {
    id: 'subscription-platform',
    category: 'development',
    title: '学習支援プラットフォームの決済機能開発・品質改善',
    image: '/generated/cases/01-subscription-platform.webp',
    imageAlt: '青いカードと陶器の輪で継続課金と利用者のつながりを表したイメージ',
    body: '既存の学習支援プラットフォームで、フロントエンド・バックエンドの不具合調査と機能改善、サブスクリプション決済機能の開発を担当しました。コードの読解から原因調査、修正、テストまで、画面とAPIを横断して取り組んだ事例です。',
    sections: [
      {
        title: '契約状態とサービスの利用をつなぐ決済連携',
        body: 'Stripe Checkoutによる契約開始、Customer Portalによる支払い情報の管理、Webhookによる契約状態の同期に携わりました。組織単位の課金状態やメンバー数に応じた課金数量の同期、支払い遅延時の警告表示など、継続課金に必要な処理を実装・改善しました。',
      },
      {
        title: '原因を確かめ、既存機能への影響を検証',
        body: '画面表示や状態管理、API連携、バックエンド処理の不整合について、事象の再現から修正方針の検討、実装、動作確認まで対応しました。JestとPlaywrightを使ったテストを通じて、変更箇所だけでなく既存機能への影響も確認しました。',
      },
    ],
    scope: [
      '既存コードの調査とフロントエンド・バックエンドの改修',
      '契約開始・支払い情報管理・契約状態同期の実装',
      '組織・メンバー数に応じた課金処理の改善',
      '不具合の再現確認、単体テスト・画面テスト',
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Express.js',
      'Prisma',
      'PostgreSQL',
      'Stripe',
      'Jest',
      'Playwright',
    ],
    diagram: '/illustrations/cases/subscription-platform-flow.svg',
    diagramAlt: '利用画面、Stripeの決済処理、Webhook、契約情報の同期を整理した概念図',
  },
  {
    id: 'kintone-accounting',
    category: 'automation',
    title: '契約・請求業務をつなぐkintone・会計API連携',
    image: '/generated/cases/02-kintone-accounting.webp',
    imageAlt: '紙の束を青い帯でつなぎ、業務データの連携を表したイメージ',
    body: '人材サービス業の業務管理システムで、kintoneアプリの開発・改善と会計サービスとのAPI連携を担当しました。契約、請求、工数、勤怠など、複数のアプリをまたぐ業務フローを確認しながら、実装と検証を進めた事例です。',
    sections: [
      {
        title: '業務ルールに合わせた画面・入力・帳票の改善',
        body: 'JavaScriptによる画面制御、入力チェック、自動計算、CSV出力、アプリ間連携を実装・修正しました。契約期間や日付の検証、帳票に必要な値の生成、項目の自動設定など、日々の契約・請求業務に関わる細かな要件に対応しました。',
      },
      {
        title: 'kintone・会計APIをまたぐ同期処理の実装と検証',
        body: 'AWS Lambdaを経由したfreee API連携の構成で、工数、勤怠、従業員、案件、取引先、売上などの同期処理に携わりました。一覧画面から対象年月を指定して同期する操作や、複数アプリ間のデータ連携を検証し、統合テストとフィードバックをもとに修正・再検証を行いました。',
      },
    ],
    scope: [
      'kintoneアプリのJavaScriptカスタマイズ',
      '契約・請求・帳票に関する入力制御とデータ処理',
      'AWS Lambdaを介した会計API連携の開発・改善',
      '複数アプリと外部連携を含む単体・統合テスト',
    ],
    technologies: [
      'kintone',
      'JavaScript',
      'Python',
      'AWS Lambda',
      'Amazon API Gateway',
      'freee API',
    ],
    diagram: '/illustrations/cases/kintone-accounting-flow.svg',
    diagramAlt: 'kintoneの業務アプリからAWS Lambdaを介して会計APIへ連携する概念図',
  },
  {
    id: 'llm-customization',
    category: 'ai',
    title: '業務向けLLMカスタマイズツールの機能開発',
    image: '/generated/cases/03-llm-customization.webp',
    imageAlt: '紙とガラスを通る青い帯で、情報を整理するAIを表したイメージ',
    body: '生成AIを業務用途に合わせて活用するWebツールで、LLM関連機能を中心にフロントエンド・バックエンドの開発を担当しました。プロンプトや外部データの活用、応答生成処理、アプリケーションとの連携に取り組んだ事例です。',
    sections: [
      {
        title: '業務用途に合わせた応答生成の実装',
        body: 'LangChainとLlamaIndexを活用し、プロンプトや外部データを扱う処理、LLMの応答を生成する処理の開発に携わりました。生成AIの機能を単体で用意するだけでなく、Webアプリケーションから利用できる機能として組み込みました。',
      },
      {
        title: '画面からバックエンドまでつなげて開発',
        body: 'TypeScriptとPythonを用いて、フロントエンドとバックエンドの両方を担当しました。AWSを利用する構成の中で、設計、実装、テスト、改善に携わり、チームで運用するWebサービスとしての動作を確認しました。',
      },
    ],
    scope: [
      'LLM関連機能の設計・実装・テスト',
      'プロンプトと外部データを扱う機能の開発',
      '応答生成処理とWebアプリケーションの連携',
      'フロントエンド・バックエンド双方の改善',
    ],
    technologies: ['TypeScript', 'Python', 'AWS', 'LangChain', 'LlamaIndex', 'LLM'],
    diagram: '/illustrations/cases/llm-customization-flow.svg',
    diagramAlt: '業務画面からプロンプトと外部データを使ってLLMの応答を返す概念図',
  },
  {
    id: 'video-research-saas',
    category: 'development',
    title: '動画リサーチ・分析SaaSの企画から開発・運用まで',
    image: '/generated/cases/04-video-research-saas.webp',
    imageAlt: 'ガラスのフレームと青い再生マークで動画分析を表したイメージ',
    body: '動画のリサーチ・分析を効率化するSaaSで、企画立案から要件定義、UI・UX設計、実装、デプロイ、保守運用までを一貫して担当しました。外部API、AI分析、サブスクリプション決済、管理画面を組み合わせたWebサービスの開発事例です。',
    sections: [
      {
        title: 'リサーチから整理・分析までを一つのサービスに',
        body: '動画のキーワード検索、急上昇動画の取得、種類やカテゴリによる絞り込み、チャンネル分析、ランキング表示を実装しました。お気に入り、フォルダ、検索履歴、メモ、CSV・Excel・JSON形式の出力など、調査結果を蓄積して活用する機能も開発しました。',
      },
      {
        title: 'AI・決済・API制限を見据えた運用設計',
        body: 'Gemini APIによるAIチャット・コメント分析、UnivaPayによる月額決済とトライアル管理、請求履歴、領収書PDF、管理者向けの契約管理機能を実装しました。外部APIのクォータを考慮したキャッシュ機構など、継続運用を見据えた設計・実装にも対応しました。',
      },
    ],
    scope: [
      '企画立案・要件定義・UIとUXの設計',
      'フロントエンド・バックエンド・管理画面の開発',
      '動画API・生成AI・サブスクリプション決済の連携',
      'キャッシュ機構の設計、テスト、デプロイ、保守運用',
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Vercel',
      'Gemini API',
      'UnivaPay',
    ],
    diagram: '/illustrations/cases/video-research-saas-flow.svg',
    diagramAlt: '動画APIの取得結果をキャッシュし、検索・分析とAI機能で利用する概念図',
  },
  {
    id: 'kintone-data-analytics',
    category: 'automation',
    title: 'kintone業務データの連携・可視化と運用改善',
    image: '/generated/cases/05-kintone-data-analytics.webp',
    imageAlt: 'ガラスの層と段差のある柱でデータの集約・可視化を表したイメージ',
    body: 'kintoneを中心とした業務管理システムで、アプリの開発・修正とBigQueryへのデータ連携、Looker Studioでの可視化に必要な同期処理を担当しました。請求・支払・稼働管理などの業務フローを確認し、実装から運用検証まで携わった事例です。',
    sections: [
      {
        title: '業務データを分析につなげる同期処理',
        body: '案件、稼働、請求、支払などのデータをkintoneから取得・整形してBigQueryへ連携する処理を実装しました。売上、粗利、稼働状況、請求・支払状況をLooker Studioで確認するためのデータ反映と動作検証に携わりました。',
      },
      {
        title: '月次業務や外部連携を含む運用シナリオで検証',
        body: '入力制御、自動計算、CSVの作成・取り込み、請求・支払まわりの機能を修正しました。既存の仕様書や操作資料を確認し、会計サービス、勤怠データ、帳票などを含む業務全体の流れに沿って検証。統合テストや利用者のフィードバックから、不具合の調査、仕様確認、修正、再検証を行いました。',
      },
    ],
    scope: [
      'kintoneアプリとJavaScriptカスタマイズの開発・修正',
      'データの取得・整形・BigQueryへの同期処理',
      'Looker Studioへの反映確認と動作検証',
      '請求・支払・稼働管理の統合テストと品質改善',
    ],
    technologies: [
      'kintone',
      'JavaScript',
      'Google Cloud',
      'BigQuery',
      'Looker Studio',
      'freee API',
      'CSV連携',
    ],
    diagram: '/illustrations/cases/kintone-data-analytics-flow.svg',
    diagramAlt: 'kintoneの業務データを取得・整形し、BigQueryとLooker Studioへつなぐ概念図',
  },
  {
    id: 'healthcare-api',
    category: 'development',
    title: 'ヘルスケアAPIサービスの保守開発・機能改善',
    image: '/generated/cases/06-healthcare-api.webp',
    imageAlt: 'ガラスのアーチと青い波形でAPIの安定運用を表したイメージ',
    body: 'ヘルスケア領域のAPIサービスで、保守、追加機能開発、不具合修正、問い合わせ対応を担当しました。既存の仕様とデータ構造を確認し、顧客からの報告をもとに原因調査から実装・検証・報告まで対応した事例です。',
    sections: [
      {
        title: '問い合わせを起点に、調査から修正・報告まで対応',
        body: 'バグ報告や問い合わせの内容を整理し、事象の確認、原因調査、修正方針の検討、実装、動作確認、報告までを担当しました。既存APIやデータ構造への影響を確かめながら、追加要望に応じた機能の追加・改修も行いました。',
      },
      {
        title: '外部APIと生成AIを含む機能の保守・改善',
        body: 'Python・Flaskを用いたAPIの保守開発と、Firestoreによるデータ管理に携わりました。気象などの外部データを扱うAPI連携や、生成AIによるアドバイス生成機能の改善を行い、実際の運用を踏まえて動作を確認しました。',
      },
    ],
    scope: [
      'Python・FlaskによるAPIの保守・追加開発',
      'Firestoreを利用したデータ処理の改修',
      '外部API・生成AI連携の機能改善',
      '顧客からの問い合わせ対応、原因調査、検証・報告',
    ],
    technologies: ['Python', 'Flask', 'Firestore', 'Google Cloud', '外部API', '生成AI'],
    diagram: '/illustrations/cases/healthcare-api-flow.svg',
    diagramAlt: '外部データとデータベースを利用するAPIサービスの保守・改善範囲を整理した概念図',
  },
];
