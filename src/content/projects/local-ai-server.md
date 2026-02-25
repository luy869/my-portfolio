---
title: "大規模ローカルAIサーバー構築"
description: "RTX 5080+3080の計算資源を活用し、HuggingFaceのGated Modelや画像生成（FLUX.1）をローカルで自ホスト運用。マルチGPU環境でのAI推論基盤。"
tags: ["Infrastructure", "AI/LLM", "Hardware", "Docker"]
order: 3
featured: true
---

## 概要

RTX 5080とRTX 3080のデュアルGPU環境を活用した、完全ローカルのAI推論サーバー。HuggingFaceのGated ModelやFLUX.1による画像生成をセルフホスティングで運用。

### 構成

- **GPU**: RTX 5080 + RTX 3080 デュアル構成
- **モデル**: Qwen, FLUX.1 等のローカルLLM/画像生成モデル
- **管理**: Docker Composeによるコンテナオーケストレーション
