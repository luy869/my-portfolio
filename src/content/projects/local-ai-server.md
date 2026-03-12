---
title: "大規模ローカルAIサーバー構築"
description: "RTX 5080+3080のデュアルGPU環境でLLM・画像生成モデルをセルフホスト。Docker Composeによるマルチサービス管理とGPUリソース最適化。"
tags: ["Docker", "Linux", "Ollama", "FLUX.1", "GPU"]
order: 3
featured: true
---

## 背景・動機

[TODO: なぜクラウドAPIではなくローカルで動かすことにしたか。
例: 「APIコストの積み上がり」「プライバシー」「低レイテンシ」「モデルのカスタマイズ」など、主な動機を書く]

## 構成

- **GPU**: RTX 5080（メイン推論）+ RTX 3080（サブ / 画像生成）
- **OS**: Ubuntu + Docker Compose
- **主なサービス**: Ollama（LLM推論）、ComfyUI（画像生成）、[TODO: 他に動かしているサービスがあれば]

## 技術的な課題

[TODO: ハードウェア・ソフトウェア両面での問題を具体的に。
例:
- 2枚のGPUへのモデルのメモリ割り当て（VRAM管理）
- Docker内でのNVIDIA GPU パススルー設定
- 複数サービスが同時にGPUを使う際のリソース競合
- 大容量モデルのダウンロード・バージョン管理]

## 実装・運用のポイント

[TODO: Docker Composeの構成で工夫した点。
例:
- サービスごとの`deploy.resources.reservations.devices`でGPU割り当てを制御
- モデルデータをボリュームマウントで永続化
- ヘルスチェックとサービス依存関係の設定]

## 運用して気づいたこと・改善点

[TODO: 実際に動かして出てきた問題や改善。
例: VRAMが足りなくてモデルを量子化した、熱管理の問題、ネットワーク越しのAPI応答速度など]
