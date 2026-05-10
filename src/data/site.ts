// ========================================
// サイト基本データ
// このファイルを更新するだけでサイト全体に反映されます。
// [TODO: ...] の部分を自分の情報に書き換えてください。
// ========================================

export const siteConfig = {
    title: "rui | luy869.net",
    description: "ゆうのポートフォリオサイト。ローカルAI・インフラ構築・Web開発の個人プロジェクトと活動を紹介しています。",
    url: "https://luy869.net",
} as const;

export const profile = {
    name: "ゆう",
    handle: "luy869",
    avatarUrl: "/avatar.jpg",
    // ↓ トップに大きく表示される一言。技術的強みを端的に。
    catchphrase: "高度な技術を誰もが使いやすい形にするエンジニア",
    status: "東京工科大学 コンピュータサイエンス学部 コンピュータサイエンス学科 2年",
    // ↓ キャッチコピーの下に表示される自己PR。2〜3文で。
    //   「なぜその技術を使うのか」「どんなエンジニアを目指しているのか」を具体的に。
    bio: "ローカルLLMや画像生成AIを自前環境で動かすのが最近の趣味です。またAIを組み込んだアプリ開発なども行っています。",
} as const;

export interface SkillCategory {
    category: string;
    items: string[];
}

// 実際にプロジェクトで使用した技術のみ記載。
// 証拠のないスキルは載せない。
export const skills: SkillCategory[] = [
    {
        category: "Backend / CLI",
        items: ["Python", "Go", "PHP", "Node.js", "Discord.js"],
    },
    {
        category: "AI / LLM",
        items: ["Ollama", "Local LLM運用", "Gemini API", "PyTorch", "Flux.1", "ComfyUI"],
    },
    {
        category: "Infrastructure",
        items: ["Docker", "Linux", "Cloudflare", "サーバー構築"],
    },
    {
        category: "Frontend / Web",
        items: ["TypeScript", "React", "Astro", "Tailwind CSS"],
    },
    {
        category: "Tools",
        items: ["Git / GitHub", "Claude Code", "Bash"],
    },
];

export interface ExperienceItem {
    title: string;
    role: string;
    period?: string;
    description?: string; // 担当内容・学びを2〜3文で
}

export const experience: ExperienceItem[] = [
    {
        title: "HRクラウド株式会社",
        role: "長期インターン バックエンドエンジニア",
        period: "2025年9月～現在",
        description: "自社プロダクト「採用一括かんりくん」の開発に携わり、採用評価AIツール周りの改修を中心に担当。PHP（FuelPHP）やReact・TypeScriptを用いた機能実装・改修、既存機能のパフォーマンス改善を行っています。実際の顧客に影響するコードを書く責任感と、大規模コードベースを読み解きながら開発する手法を学んでいます。",
    },
    {
        title: "少年ジャンプハッカソン",
        role: "AI翻訳チーム 開発メンバー",
        period: "2025年9月",
        description: "漫画をAIで自動翻訳する仕組みを作成。Python・PyTorch・Detectron2（Mask R-CNN）を用いた吹き出し認識とテキスト翻訳を担当。限られた計算資源の中でのAIチューニングや、開発期間内での精度改善に取り組みました。",
    },
    {
        title: "東京工科大学 LinuxClub",
        role: "運営補佐",
        description: "イベント開催の補佐や公式Xの運用方針策定など運営面でも貢献。ハッカソンや技術イベントへの参加・LT会での知見共有を通じて技術交流を行っています。",
    },
    {
        title: "大規模同人誌即売会 運営ボランティア",
        role: "会場誘導スタッフ",
        period: "計5回参加",
        description: "数十万人規模が来場するコミックマーケット・博麗神社例大祭等のイベントで会場誘導を担当。事前集会で当年の動線・前回の反省点を組織全体で共有し、本番では担当外のトラブル情報も積極的にインプットして自分の持ち場への波及を予測しながら動いた。愛着のある界隈に運営側として恩返ししたいという思いから継続している。",
    },
];

// About セクションのテキスト。[TODO: ...] を自分の言葉で書き換える。
export const about = {
    paragraphs: [
        "東京工科大学コンピュータサイエンス学部の2年生です。自作PCやジャンクPCを活用した自宅サーバー構築が好きで、ローカルLLMや画像生成AIを自前のGPU環境で動かしながら、AIを組み込んだアプリケーション開発を行っています。",
        "小学生の頃から東方Project等のクリエイター文化に深い愛着があり、コミックマーケット・博麗神社例大祭等の大規模同人イベントで運営ボランティアにも計5回参加し、現場側からも文化を支える活動を続けています。",
        "高度化する技術の恩恵を誰もが享受できる社会にしたいと考えています。HRクラウド株式会社での長期インターンで実務経験を積みつつ、個人開発で興味ベースの技術探求を続け、複雑な技術をユーザーが直感的に使える形に落とし込むエンジニアを目指しています。",
    ],
    highlights: [
        { label: "大学", value: "東京工科大学 コンピュータサイエンス学部" },
        { label: "専攻", value: "コンピュータサイエンス" },
        { label: "学年", value: "2年" },
        { label: "興味領域", value: "ローカルAI / インフラ構築 / AI活用アプリ開発" },
    ],
};

export const socialLinks = [
    { label: "GitHub", url: "https://github.com/luy869" },
    { label: "Zenn", url: "https://zenn.dev/luy849" },
    { label: "X (Twitter)", url: "https://x.com/luy869_tech" },
] as const;
