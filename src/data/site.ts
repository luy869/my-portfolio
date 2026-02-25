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
        items: ["Python", "Node.js", "Go", "Shell/Bash", "PowerShell"],
    },
    {
        category: "Frontend",
        icon: "🎨",
        items: ["HTML5", "CSS3", "JavaScript", "React"],
    },
    {
        category: "Infrastructure",
        icon: "🏗️",
        items: ["Docker", "Linux (Ubuntu)", "Cloudflare", "WSL"],
    },
    {
        category: "AI / LLM",
        icon: "🤖",
        items: ["Local LLMs (Qwen, FLUX.1)", "Gemini API", "AI Agent (CrewAI)"],
    },
    {
        category: "Hardware",
        icon: "🔧",
        items: [
            "カスタムPCチューニング (i7 + RTX 5080 & 3080)",
            "VR (Quest 3)",
        ],
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
