---
title: "面接音声分析ツール「VoiceLens」"
description: "面接音声をWhisperXでローカル文字起こし→話者分離し、Gemini APIで良かった点・改善点・スコアを自動分析するWebアプリ。設計〜デプロイまで全工程を個人開発し実動中。"
tags: ["Python", "FastAPI", "WhisperX", "Gemini API", "React", "TypeScript", "Supabase"]
order: 2
featured: true
link: "https://voicelens.luy869.net"
---

## 概要

「無料・ローカル・一般論にならない分析」を同時に満たす面接フィードバックツールが存在しなかったため自作。面接音声をアップロードするとWhisperX（large-v3-turbo）でローカル文字起こし・話者分離を行い、Gemini APIが良かった点・改善点・スコアを自動生成する。設計・実装・テスト・デプロイ・セキュリティ対策まで全工程を一人で担当。

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| バックエンド | Python / FastAPI / WhisperX（large-v3-turbo） |
| 分析 | Gemini API（gemma-3-27b-it） |
| フロントエンド | React / Vite / TypeScript |
| 認証 / DB | Supabase（PostgreSQL + RLS + JWT） |
| インフラ | Cloudflare Tunnel（バックエンド）+ Cloudflare Pages（フロントエンド） |

## 技術的な課題と工夫

- **非同期処理**: WhisperX（同期ライブラリ）をFastAPIの非同期環境で使うため、BackgroundTasksで別スレッドにオフロード。フロントが2秒ごとにポーリングして結果を受け取る設計を採用
- **JWT認証**: SupabaseがECC（P-256 / ES256）署名を使用しているため、PyJWKClientでJWKSエンドポイントから公開鍵を動的取得してJWT検証を実装。全エンドポイントに所有者チェックを追加
- **VAD取りこぼし対策**: `vad_onset/offset=0.1`・`chunk_size=30` を設定し、長い音声での発話取りこぼしを防止
- **デプロイ**: RAGプラットフォームと同様のCloudflare Tunnel + Pagesの2段構成でサーバーIPを露出せず外部公開

## 機能

- 面接・プレゼン・会議・音楽・カスタムの分析モード
- 複数ファイルの順次処理、スコアバー表示
- Markdownエクスポート、レスポンシブ対応
- Supabase認証による招待制アクセス管理

## 結果

フェーズ0（スクリプト単体）→ フェーズ11（UX改善・本番公開）まで約2週間で完成。実際の就活カジュアル面談音声（複数社）で動作確認済み。
