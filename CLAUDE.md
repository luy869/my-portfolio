# CLAUDE.md

このファイルはリポジトリ内での作業時に Claude Code へ指針を提供します。

## コマンド

```bash
pnpm dev        # 開発サーバー起動（localhost:4321）
pnpm build      # 静的サイトを dist/ にビルド
pnpm preview    # ビルド結果をプレビュー
```

リンターとテストは未設定。

## アーキテクチャ

**Astro 5 + React + Tailwind CSS v4** で構築した静的ポートフォリオサイト。`luy869.net` にデプロイ。

**データの流れ**: コンテンツの起点は2箇所。
1. `src/data/site.ts` — プロフィール・スキル・経歴・趣味・SNSリンク（TypeScript定数。Hero/Skills/Experience セクションはここを編集すれば全反映）
2. `src/content/projects/*.md` — プロジェクト1件につき1ファイル。Astro Content Collections で読み込む

**ページ構成**: `src/pages/index.astro` が唯一のページ。セクションコンポーネントを `Hero → Skills → Projects → Experience` の順に並べる。各セクションは自己完結していてデータも自分でインポートする。

**Content Collection スキーマ**（`src/content/config.ts`）: `title`・`description`・`tags[]`・`order`（表示順）・`featured`、任意で `link`・`github`・`url`・`image`。

**スタイリング**: Tailwind CSS v4 を PostCSS ではなく Vite プラグイン経由で使用。テーマカラーは `src/styles/global.css` で CSS カスタムプロパティとして定義（`text-primary`・`text-secondary`・`text-muted`・`accent`・`bg-card`・`bg-secondary`・`border-default`）。

**React**: `@astrojs/react` はインストール済みだが、現在のコンポーネントはすべて `.astro` ファイルで React コンポーネントは未使用。

## プロジェクトの追加方法

`src/content/projects/<slug>.md` を作成し、`src/content/config.ts` のスキーマに合ったフロントマターを記載する。`order` で表示順を制御。
