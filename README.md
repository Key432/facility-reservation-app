# 設備予約デモアプリ

## はじめに

私ならこういうふうに作る、というようなもので正解ではないことをご留意ください。
後述しますが、このデモアプリではDBにDBaaSの`Supabase`を使用しています。Supabaseは無料アカウントでは二つのプロジェクトしか作れません。趣味でも使っているので、**4月30日**でSupabaseのプロジェクトをポーズ（休止）します。そのため、ログインはできなくなります。

## プロジェクトについて

このプロジェクトはReact+Next.jsでの設備予約アプリについての基本的なデモアプリです。`/docs`に色々とポイントを書いたドキュメントを置いてあります。また、コード内にもコメントを色々しています。
ミーティングで見たプロジェクトの様子から以下のライブラリを用いていることを把握したので使用しています。（確認していないため違っていたら申し訳ありません）

- `React`
- `Next.js(App Router)` : Reactフレームワーク
- `TailwindCSS`: CSSフレームワーク
- `NextAuth`: 認証情報管理
- `React-Hook-Form` / `zod`: フォームヘルパー / バリデーション
- `Prisma`: ORM
- `date-fns`: 日付データ

また、上記のほかにDX向上の観点から設定した方がよいと思われる以下についても導入しています。

- `ESLint`: 静的解析ツール
- `Pritter`: フォーマッター
- `Jest / React-Testing-Library`: テストツール

## デモアプリで実装すること

- サインイン・サインアウト・サインアップ
- 予約フォーム
  - サインインしていない人が予約フォームはいけないようにする
- 設備予約状況ページ

## デモアプリで実装しないこと

- 自前環境での`postgreSQL`の構築: あくまでReact（Next.js）のデモアプリのため、自前でDBサーバを立てて接続することは省略します。デモアプリでは代わりにDBaaSの`Supabase`を利用します。
- dockerの導入: 複数人での開発でのpostgresqlや厳密なnpmやNodeの管理にはdockerを使うべきかもしれませんが、同様に省略します。
- ビルドに関する設定: デモアプリではVercelへデプロイします。自前サーバへのデプロイについては扱いません。ちなみにやった事もないので自信もないです……。
- `Radix`の使用: Headless UIライブラリのRadixを使用していたように思うのですが、私が触ったことがないので使いません。このデモの開発速度を優先してプレーンなTailwind CSSのみで最低限のデザインで作成します。
- 一般ユーザ/管理者ユーザ別の認証: 開発速度とReact/Next.jsのデモという観点から省略します。

## 参考

私はReactの勉強やこのデモアプリを作成する過程で以下を参考にしました。WGでご活用ください。

### 公式ドキュメント

- [React.dev](https://ja.react.dev/): Reactの公式チュートリアル
- [Learn Next.js](https://nextjs.org/learn): Next.jsの公式チュートリアルです。Next.jsは去年の5月のアップデートで**Page Router**という従来の書き方と**App Router**という新しい書き方の二通りがあり、大きく内容が異なります（WGのプロジェクトはApp Routerです）。わからないことを調べるときはApp Routerの内容であることを確認してください。
- [NextAuth](https://next-auth.js.org/tutorials): NextAuthの公式チュートリアル
- [MDN Web Docs](https://developer.mozilla.org/ja/): Reactは全く新しい技術ではなく、あくまでJSライブラリであり、`Array.prototype.map()`や`async/await`、`Promise`、テンプレートリテラル、Null合体演算子等、HTML/CSS/JavaScriptの知識を前提にしているので最初にモダンなJavaScriptの知識は学習した方がよいと思われます。

### 学習系

- [サバイバルTypeScript](https://typescriptbook.jp/): TypeScriptの学習サイトです。
- [【2023年最新】React(v18)完全入門ガイド｜Hooks、Next.js、Redux、TypeScript](https://www.udemy.com/course/react-complete-guide/?couponCode=ST22FS22724): Udemyの講座です。私は最初にこれで学習しました。大変わかりやすいですが、プロジェクトの構築に`Create-React-App`を使っていたり、Next.jsがPage Routerだったりと古い部分もかなりあります。しかし`useState`や`useEffect`等のReactの基礎は依然として価値があります。
- [りあクト！ TypeScriptで始めるつらくないReact開発](https://oukayuka.booth.pm/items/2368045): Reactについての自主出版技術書で、現行のv18までの技術を歴史的変遷をもとに記しているReactの名著です。Reactの背景となる技術までを詳細に書いています。詳しすぎる内容なので開発の上では必要ないですが、確実にReactの専門家になることができると思います。
