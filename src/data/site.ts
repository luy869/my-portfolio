// ========================================
// サイト基本データ
// プロフィール・スキル・経歴など、UIに直接表示する設定データ。
// このファイルを更新するだけでサイト全体に反映されます。
// ========================================

export const siteConfig = {
    title: "rui | luy869.net",
    description: "セキュリティとインフラを守り、ローカルAIを駆使する情報系エンジニアのポートフォリオ",
    url: "https://luy869.net",
} as const;

export const profile = {
    name: "rui",
    handle: "luy869 / SGT_LUY",
    catchphrase: "セキュリティとインフラを守り、ローカルAIを駆使する情報系エンジニア",
    status: "情報系大学2年生（情報工学・システム専攻）",
    orientation:
        "セキュリティエンジニア志望。自作志向が強く、実際に動くものを作りながら学ぶ実験型。",
} as const;

export interface SkillCategory {
    category: string;
    icon: string; // emoji or icon identifier
    items: string[];
}

export const skills: SkillCategory[] = [
    {
        category: "Backend / CLI",
        icon: "⚡",
        items: ["Python", "Node.js", "Go", "Discord Bot", "CLI Tools", "JSON Processing", "Discord API"],
    },
    {
        category: "Infrastructure / Network",
        icon: "🏗️",
        items: [
            "Docker",
            "Docker Compose",
            "Linux (Ubuntu)",
            "WSL",
            "Cloudflare",
            "DNS / ドメイン管理",
            "サーバー構築・最適化",
        ],
    },
    {
        category: "AI / LLM",
        icon: "🤖",
        items: ["Ollama", "ComfyUI", "Stable Diffusion", "FLUX / SDXL", "Gemma / Qwen", "Local LLM運用"],
    },
    {
        category: "Frontend / Web",
        icon: "🌐",
        items: ["TypeScript / JavaScript", "React / Next.js / Vue.js", "Tailwind CSS", "HTML / CSS"],
    },
    {
        category: "Tools / DevOps",
        icon: "🛠️",
        items: ["Git / GitHub", "VSCode", "npm / pip", "Bash / PowerShell", "CI/CD (GitHub Actions)"],
    },
    {
        category: "Hardware / Optimization",
        icon: "⚙️",
        items: ["自作PC / ハードウェア構成", "マルチGPU環境構築", "GPU運用"],
    },
    {
        category: "Experience / Other",
        icon: "🎓",
        items: ["API Integration (API連携)", "Game Server Administration", "Team Development (チーム開発)"],
    },
];

export interface ExperienceItem {
    title: string;
    role: string;
    period?: string;
}

export const experience: ExperienceItem[] = [
    {
        title: "HRクラウド株式会社",
        role: "インターンシップ",
    },
    {
        title: "大学 LinuxClub",
        role: "イベントサポート、ポリシー策定の企画担当",
    },
];

export const hobbies: string[] = [
    "LMMSを用いた音楽制作（東方アレンジ等）",
    "生き物系YouTuberの視聴",
];

export const socialLinks = [
    { label: "GitHub", url: "https://github.com/luy869", icon: "github" },
] as const;
