---
title: "自律型Discord Bot「Athena」"
description: "ローカルLLMと画像生成AIを完全にローカル環境で動かすDiscord Bot。Flux.1 schnellによる画像生成とGemma 3によるチャット・翻訳機能を搭載。"
tags: ["Python", "PyTorch", "Flux.1", "Ollama", "Docker", "Discord.js"]
order: 1
featured: true
---

## 概要

自宅の自作PC環境を活かし、完全にローカルで動くLLM・画像生成Discord Botを開発。外部APIに依存せず、Ollama（Gemma 3）によるチャット・翻訳機能と、Flux.1 schnellによる画像生成機能をDiscordサーバー上で利用できます。

## 技術スタック

- **LLM推論**: Ollama（Gemma 3）
- **画像生成**: Flux.1 schnell + PyTorch
- **Bot基盤**: Python + Discord.js（Node.js）
- **環境管理**: Docker

## 技術的な課題と解決

- **画像生成モデルの多大なメモリ使用量**: 量子化・CPUオフロード・モデル選定を組み合わせてVRAM消費を抑制
- **画像モデルのコンポーネント配置順序**: VAEのみを処理の中盤でCPUへ配置し、GPUメモリの使用量を最適化

## 学んだこと

- メモリ問題は「使用量の削減」だけでなく「コンポーネントの配置」でも解消できること
- Dockerによる再現性のある環境管理の実践
