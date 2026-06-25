---
title: "学バスNavi — TUT スクールバス時刻表PWA"
description: "東京工科大学のスクールバス時刻表を快適に確認できるPWA。LinuxClubのメンバーと共同開発。Next.js + Go + TypeSpec 構成で、現在時刻から次のバスを一覧表示する。"
tags: ["TypeScript", "Next.js", "Go", "TypeSpec", "Tailwind CSS", "Gemini API", "PWA"]
order: 8
featured: false
---

## 概要

大学公式サイトの時刻表が読みづらく、待機列の状況が見えないという学生の不満を解消するため、LinuxClubメンバーと共同開発中のPWAアプリ。現在時刻から近いバスの発車時刻を出発地ごとに一覧表示し、スライド操作で出発地を切り替えられる。

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| フロントエンド | Next.js + TypeScript + Tailwind CSS |
| バックエンド | Go |
| API設計 | TypeSpec |
| AI機能 | Gemini API（時刻表サイトから運行予定を自動取得・更新） |
| インフラ | Cloudflare Pages / tut-bus-api.hekuta.net |

## 担当範囲

途中参加。Gemini API を使った時刻表の自動取得・更新機能を担当。

## 主な機能

- 現在時刻から次のバスを複数本一覧表示
- 出発地を横スライドで切り替え（大学 / 八王子駅 / みなみ野駅 / 学生会館）
- 日付・出発地・目的地・時間帯で絞り込み検索
- 表示テーマとプロフィール設定

## 今後の展望

位置情報から最寄り出発地を自動判定し、次発バスまでの時間をプッシュ通知する機能を予定。
