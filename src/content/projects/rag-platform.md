---
title: "セルフホスト型RAGプラットフォーム"
description: "LangChainを使わずRAGをゼロから自作。Markdown/PDF/テキストを投入するとローカルLLM(Ollama)で質問応答できる。luy869.netに自己紹介Botとして実運用中。"
tags: ["Python", "FastAPI", "ChromaDB", "Ollama", "React", "TypeScript", "Cloudflare"]
order: 1
featured: true
link: "https://luy869.net"
github: "https://github.com/luy869/rag-platform"
---

## 概要

LangChain / LlamaIndex 等のフレームワークに一切頼らず、RAGの各レイヤー（チャンキング・ベクトル検索・LLM生成）をゼロから設計・実装したセルフホスト型プラットフォーム。Markdown / PDF / テキストを投入するとローカルLLM（Ollama）で質問応答でき、`luy869.net` に自己紹介チャットBotとして実運用している。

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| バックエンド | Python 3.12 + FastAPI |
| ベクトルDB | ChromaDB（コサイン距離） |
| LLM（Primary） | Ollama（Qwen3） |
| LLM（Fallback） | Gemini API |
| フロントエンド | React + TypeScript + Vite + Tailwind CSS |
| インフラ | 自宅サーバー + Cloudflare Tunnel + Workers |

## 技術的な課題と解決

- **独自Markdownチャンカー**: Markdown見出し構造を活用し `heading_path`（例: `エピソード集 > エピソード1 > 課題`）をメタデータとして保持。固定長分割より文脈精度が向上した
- **ChromaDB距離関数バグ**: デフォルトのL2距離のまま類似度閾値を設定しており全件フィルタアウトされていた。`hnsw:space: cosine` を明示指定して修正
- **FastAPI非同期化**: 非同期エンドポイントに同期クライアントを使っていてイベントループがブロック。`ollama.AsyncClient` に変更してSSEストリーミングを実現
- **Cloudflare Tunnel + Workers 2段構成**: TunnelがサーバーIPを完全隠蔽し、WorkersがCORS制御とAPIキーの自動付与を担う
- **プロンプトインジェクション脆弱性**: 完成後に自主セキュリティ監査を実施し、`system_prompt` フィールドから外部注入できる脆弱性（高）を優先修正
- **LLMレスポンス高速化**: Qwen3のthinking（内部推論）モードがデフォルト有効で50〜100秒かかっていた。`think=False` で1〜2秒に改善（約30〜50倍高速化）

## 結果

3日間でRAGエンジン本体・管理フロントエンド・チャットウィジェット・Cloudflare構成をすべて完成・公開。本番デプロイ時に発生した29件のトラブルを「原因→解決→学び」の形で記録し、技術判断を言語化する習慣が身についた。
