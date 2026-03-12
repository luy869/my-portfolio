// ========================================
// サイト基本データ
// このファイルを更新するだけでサイト全体に反映されます。
// [TODO: ...] の部分を自分の情報に書き換えてください。
// ========================================

export const siteConfig = {
    title: "rui | luy869.net",
    description: "[TODO: サイト全体のmeta description。検索エンジン・OGPに使用される]",
    url: "https://luy869.net",
} as const;

export const profile = {
    name: "ゆう",
    handle: "luy869",
    // ↓ トップに大きく表示される一言。技術的強みを端的に。
    catchphrase: "[TODO: あなたを一言で表すキャッチコピー]",
    status: "東京工科大学大学コンピュータサイエンス学部 2年",
    // ↓ キャッチコピーの下に表示される自己PR。2〜3文で。
    //   「なぜその技術を使うのか」「どんなエンジニアを目指しているのか」を具体的に。
    bio: "[TODO: 自己PR。技術への興味の軸、目指すエンジニア像など。]",
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
        items: ["Python", "Go", "Node.js", "Discord.js"],
    },
    {
        category: "AI / LLM",
        items: ["Ollama", "Local LLM運用", "Gemini API", "ComfyUI", "FLUX.1 / SDXL"],
    },
    {
        category: "Infrastructure",
        items: ["Docker", "Docker Compose", "Linux (Ubuntu)", "Cloudflare", "マルチGPU環境"],
    },
    {
        category: "Frontend / Web",
        items: ["TypeScript", "React", "Astro", "Tailwind CSS"],
    },
    {
        category: "Tools",
        items: ["Git / GitHub", "GitHub Actions", "Bash"],
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
        role: "[TODO: 職種・インターン種別]",
        period: "[TODO: 期間 例: 2025年8月]",
        description: "[TODO: 担当タスク、使用技術、学んだことを2〜3文で具体的に]",
    },
    {
        title: "大学 Linux Club",
        role: "[TODO: 役職名]",
        description: "[TODO: 具体的な活動内容。企画したイベント、策定したポリシーの概要など]",
    },
];

// About セクションのテキスト。[TODO: ...] を自分の言葉で書き換える。
export const about = {
    paragraphs: [
        "[TODO: 自己紹介の1段落目。どんな学生か、どんなきっかけでエンジニアに興味を持ったか。]",
        "[TODO: 2段落目。技術への向き合い方、興味の軸。「なぜ作るのか」「何を作りたいのか」を具体的に。]",
    ],
    highlights: [
        { label: "大学", value: "[TODO: 大学名・学部]" },
        { label: "専攻", value: "情報工学・システム" },
        { label: "学年", value: "2年" },
        { label: "興味領域", value: "[TODO: 例: AI推論基盤 / 自動化 / インフラ]" },
    ],
};

export const socialLinks = [
    { label: "GitHub", url: "https://github.com/luy869" },
    { label: "Zenn", url: "https://zenn.dev/luy849" },
] as const;
