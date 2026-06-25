---
title: "PaletteVein — 好みを学習する壁紙発掘サービス"
description: "CLIPのセマンティック埋め込みと時間減衰アルゴリズムで好みを学習し、推薦理由を可視化しながら壁紙イラストを発掘するWebサービス。Go + React + pgvector をフルスタックで個人開発。"
tags: ["Go", "React", "TypeScript", "Python", "PostgreSQL", "pgvector", "CLIP", "gRPC", "Docker"]
order: 7
featured: true
github: "https://github.com/luy869/palette-vein"
---

## 概要

「なぜこの壁紙がおすすめされているのか」を可視化しながら、個人の好みをAIが学習するWebサービス。Wallhaven APIをデータソースに、CLIPのセマンティック埋め込みと時間減衰アルゴリズムで好みベクトルを算出し、pgvectorで類似検索を行う。設計から実装・デプロイまで全工程を一人で担当。

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| バックエンド | Go 1.25 + chi v5 |
| フロントエンド | React 19 + TypeScript + Vite 5 |
| AI処理 | Python + open_clip_torch (ViT-B/32) + gRPC |
| データベース | PostgreSQL 16 + pgvector (HNSW index, 512次元) |
| 認証 | JWT + httpOnly Cookie + bcrypt |
| インフラ | Docker × 4サービス（backend / frontend / clip_service / postgres）|

## 推薦アルゴリズム

- **好みベクトル**: 過去90日のいいねを時間減衰（半減期9.7日）で重み付き平均 + Rocchio法で負例を差し引く
- **探索バランス**: 19件を好みから、5件を「人気上位の未提示」で埋めるε-greedy（フィルターバブル回避）
- **コールドスタート**: いいね10件未満は Wallhaven 人気順で提示

## 技術的な課題と解決

- **pgvectorスキャン**: `rows.Scan(&vec)` で `[]float32` に直接スキャンしようとしたがOID不一致。`pgvector.Vector` 型でスキャン後 `.Slice()` で変換する仕様を習得
- **Go-Python間の型安全な連携**: protobuf + gRPCで言語境界の型を統一。CPU推論は非同期キューでUIをブロックしない設計
- **依存関係の競合**: torch と open-clip-torch のバージョンピンが `ResolutionImpossible`。ピンを外して `pip install open-clip-torch` で解消
- **初期設計の判断**: 「個人向け」に絞りながらも `user_id` カラムを最初から持つ multi-user 前提の設計が、後の方針変更時に変更不要で済んだ

## 結果

M1〜M5（画像取得→CLIP埋め込み→認証→クローラー→UX改善）を約2週間で完了。透明性のある推薦（推薦元いいね画像の表示）と、無限スクロール・色検索・Markdownエクスポートまで実装済み。
