---
title: "Minecraftサーバー運用・最適化"
description: "高難易度Modpack（All the Mods 10、Enigmatica 6 Expert）のサーバーをLinux上で運用。JVMチューニングとサーバー設定の最適化でパフォーマンスを改善。"
tags: ["Linux", "JVM", "Game Server", "Performance"]
order: 4
---

## 背景

[TODO: なぜ自分でサーバーを立てたか。レンタルサーバーでなく自前運用にした理由。
例: 「大規模Modpackがレンタルサーバーのスペックに収まらなかった」「コストと自由度のトレードオフ」]

## 直面した技術的問題

[TODO: Modpackサーバー特有の問題を具体的に。
例:
- 起動時・プレイ中のGCによる定期的なラグスパイク
- Modが多いとチャンクロードが詰まる問題
- プレイヤー増加でメモリ使用量が急増する問題]

## JVMチューニングの内容

[TODO: 実際に変更したJVM引数と、それによって何が変わったかを書く。
例:
- `-XX:+UseG1GC` から `-XX:+UseZGC` に変更してGCポーズを削減
- `-Xms` / `-Xmx` の設定値とその根拠
- Aikarの推奨フラグを試してどう変わったか]

## 結果

[TODO: チューニング前後で何が改善したか。定量的なデータがあれば。
例: 「MSPTがXXmsからYYmsに改善」「TPS（Ticks Per Second）の安定化」]
