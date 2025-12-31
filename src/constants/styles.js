// 样式常量配置

export const PREMIUM_STYLES = {
  blue: { from: "#93C5FD", to: "#3B82F6", shadowColor: "rgba(59, 130, 246, 0.4)", glowColor: "rgba(59, 130, 246, 0.6)" },
  amber: { from: "#FCD34D", to: "#F59E0B", shadowColor: "rgba(245, 158, 11, 0.4)", glowColor: "rgba(245, 158, 11, 0.6)" },
  rose: { from: "#F472B6", to: "#DB2777", shadowColor: "rgba(219, 39, 119, 0.4)", glowColor: "rgba(219, 39, 119, 0.6)" },
  emerald: { from: "#6EE7B7", to: "#10B981", shadowColor: "rgba(16, 185, 129, 0.4)", glowColor: "rgba(16, 185, 129, 0.6)" },
  violet: { from: "#BEB3FF", to: "#8C79FF", shadowColor: "rgba(139, 92, 246, 0.4)", glowColor: "rgba(139, 92, 246, 0.6)" },
  slate: { from: "#CBD5E1", to: "#64748B", shadowColor: "rgba(100, 116, 139, 0.4)", glowColor: "rgba(100, 116, 139, 0.6)" },
  orange: { from: "#FDBA74", to: "#F97316", shadowColor: "rgba(249, 115, 22, 0.4)", glowColor: "rgba(249, 115, 22, 0.6)" },
  cyan: { from: "#67E8F9", to: "#06B6D4", shadowColor: "rgba(6, 182, 212, 0.4)", glowColor: "rgba(6, 182, 212, 0.6)" },
  lime: { from: "#BEF264", to: "#84CC16", shadowColor: "rgba(132, 204, 22, 0.4)", glowColor: "rgba(132, 204, 22, 0.6)" },
  pink: { from: "#F9A8D4", to: "#EC4899", shadowColor: "rgba(236, 72, 153, 0.4)", glowColor: "rgba(236, 72, 153, 0.6)" },
  indigo: { from: "#A5B4FC", to: "#6366F1", shadowColor: "rgba(99, 102, 241, 0.4)", glowColor: "rgba(99, 102, 241, 0.6)" },
  teal: { from: "#5EEAD4", to: "#14B8A6", shadowColor: "rgba(20, 184, 166, 0.4)", glowColor: "rgba(20, 184, 166, 0.6)" }
};

export const CATEGORY_STYLES = {
  blue: {
    text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200",
    hoverBg: "hover:bg-blue-100", hoverBorder: "hover:border-blue-300", hoverText: "hover:text-blue-600",
    ring: "ring-blue-300", bgActive: "bg-blue-100",
    badgeText: "text-blue-700", badgeBg: "bg-blue-100",
    dotBg: "bg-blue-500", btnBg: "bg-blue-600",
    inputRing: "focus:ring-blue-200", inputBorder: "focus:border-blue-500"
  },
  amber: {
    text: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200",
    hoverBg: "hover:bg-amber-100", hoverBorder: "hover:border-amber-300", hoverText: "hover:text-amber-600",
    ring: "ring-amber-300", bgActive: "bg-amber-100",
    badgeText: "text-amber-700", badgeBg: "bg-amber-100",
    dotBg: "bg-amber-500", btnBg: "bg-amber-600",
    inputRing: "focus:ring-amber-200", inputBorder: "focus:border-amber-500"
  },
  rose: {
    text: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200",
    hoverBg: "hover:bg-rose-100", hoverBorder: "hover:border-rose-300", hoverText: "hover:text-rose-600",
    ring: "ring-rose-300", bgActive: "bg-rose-100",
    badgeText: "text-rose-700", badgeBg: "bg-rose-100",
    dotBg: "bg-rose-500", btnBg: "bg-rose-600",
    inputRing: "focus:ring-rose-200", inputBorder: "focus:border-rose-500"
  },
  emerald: {
    text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200",
    hoverBg: "hover:bg-emerald-100", hoverBorder: "hover:border-emerald-300", hoverText: "hover:text-emerald-600",
    ring: "ring-emerald-300", bgActive: "bg-emerald-100",
    badgeText: "text-emerald-700", badgeBg: "bg-emerald-100",
    dotBg: "bg-emerald-500", btnBg: "bg-emerald-600",
    inputRing: "focus:ring-emerald-200", inputBorder: "focus:border-emerald-500"
  },
  violet: {
    text: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200",
    hoverBg: "hover:bg-violet-100", hoverBorder: "hover:border-violet-300", hoverText: "hover:text-violet-600",
    ring: "ring-violet-300", bgActive: "bg-violet-100",
    badgeText: "text-violet-700", badgeBg: "bg-violet-100",
    dotBg: "bg-violet-500", btnBg: "bg-violet-600",
    inputRing: "focus:ring-violet-200", inputBorder: "focus:border-violet-500"
  },
  slate: {
    text: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200",
    hoverBg: "hover:bg-slate-100", hoverBorder: "hover:border-slate-300", hoverText: "hover:text-slate-600",
    ring: "ring-slate-300", bgActive: "bg-slate-100",
    badgeText: "text-slate-700", badgeBg: "bg-slate-100",
    dotBg: "bg-slate-500", btnBg: "bg-slate-600",
    inputRing: "focus:ring-slate-200", inputBorder: "focus:border-slate-500"
  },
  orange: {
    text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200",
    hoverBg: "hover:bg-orange-100", hoverBorder: "hover:border-orange-300", hoverText: "hover:text-orange-600",
    ring: "ring-orange-300", bgActive: "bg-orange-100",
    badgeText: "text-orange-700", badgeBg: "bg-orange-100",
    dotBg: "bg-orange-500", btnBg: "bg-orange-600",
    inputRing: "focus:ring-orange-200", inputBorder: "focus:border-orange-500"
  },
  cyan: {
    text: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200",
    hoverBg: "hover:bg-cyan-100", hoverBorder: "hover:border-cyan-300", hoverText: "hover:text-cyan-600",
    ring: "ring-cyan-300", bgActive: "bg-cyan-100",
    badgeText: "text-cyan-700", badgeBg: "bg-cyan-100",
    dotBg: "bg-cyan-500", btnBg: "bg-cyan-600",
    inputRing: "focus:ring-cyan-200", inputBorder: "focus:border-cyan-500"
  },
  lime: {
    text: "text-lime-600", bg: "bg-lime-50", border: "border-lime-200",
    hoverBg: "hover:bg-lime-100", hoverBorder: "hover:border-lime-300", hoverText: "hover:text-lime-600",
    ring: "ring-lime-300", bgActive: "bg-lime-100",
    badgeText: "text-lime-700", badgeBg: "bg-lime-100",
    dotBg: "bg-lime-500", btnBg: "bg-lime-600",
    inputRing: "focus:ring-lime-200", inputBorder: "focus:border-lime-500"
  },
  pink: {
    text: "text-pink-600", bg: "bg-pink-50", border: "border-pink-200",
    hoverBg: "hover:bg-pink-100", hoverBorder: "hover:border-pink-300", hoverText: "hover:text-pink-600",
    ring: "ring-pink-300", bgActive: "bg-pink-100",
    badgeText: "text-pink-700", badgeBg: "bg-pink-100",
    dotBg: "bg-pink-500", btnBg: "bg-pink-600",
    inputRing: "focus:ring-pink-200", inputBorder: "focus:border-pink-500"
  },
  indigo: {
    text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200",
    hoverBg: "hover:bg-orange-100", hoverBorder: "hover:border-orange-300", hoverText: "hover:text-orange-600",
    ring: "ring-orange-300", bgActive: "bg-orange-100",
    badgeText: "text-orange-700", badgeBg: "bg-orange-100",
    dotBg: "bg-orange-500", btnBg: "bg-orange-600",
    inputRing: "focus:ring-orange-200", inputBorder: "focus:border-orange-500"
  },
  teal: {
    text: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200",
    hoverBg: "hover:bg-teal-100", hoverBorder: "hover:border-teal-300", hoverText: "hover:text-teal-600",
    ring: "ring-teal-300", bgActive: "bg-teal-100",
    badgeText: "text-teal-700", badgeBg: "bg-teal-100",
    dotBg: "bg-teal-500", btnBg: "bg-teal-600",
    inputRing: "focus:ring-teal-200", inputBorder: "focus:border-teal-500"
  }
};

export const TAG_STYLES = {
  "建筑": "bg-transparent text-stone-500/90 border-orange-500/20 dark:text-stone-400/90 dark:border-orange-500/30",
  "人物": "bg-transparent text-stone-500/90 border-orange-500/20 dark:text-stone-400/90 dark:border-orange-500/30",
  "摄影": "bg-transparent text-stone-500/90 border-orange-500/20 dark:text-stone-400/90 dark:border-orange-500/30",
  "产品": "bg-transparent text-stone-500/90 border-orange-500/20 dark:text-stone-400/90 dark:border-orange-500/30",
  "实拍": "bg-transparent text-stone-500/90 border-orange-500/20 dark:text-stone-400/90 dark:border-orange-500/30",
  "图表": "bg-transparent text-stone-500/90 border-orange-500/20 dark:text-stone-400/90 dark:border-orange-500/30",
  "卡通": "bg-transparent text-stone-500/90 border-orange-500/20 dark:text-stone-400/90 dark:border-orange-500/30",
  "宠物": "bg-transparent text-stone-500/90 border-orange-500/20 dark:text-stone-400/90 dark:border-orange-500/30",
  "游戏": "bg-transparent text-stone-500/90 border-orange-500/20 dark:text-stone-400/90 dark:border-orange-500/30",
  "创意": "bg-transparent text-stone-500/90 border-orange-500/20 dark:text-stone-400/90 dark:border-orange-500/30",
  "default": "bg-transparent text-stone-500/90 border-orange-500/20 dark:text-stone-400/90 dark:border-orange-500/30"
};

export const TAG_LABELS = {
  cn: {
    "建筑": "建筑",
    "人物": "人物",
    "摄影": "摄影",
    "产品": "产品",
    "实拍": "实拍",
    "图表": "图表",
    "卡通": "卡通",
    "宠物": "宠物",
    "游戏": "游戏",
    "创意": "创意"
  },
  en: {
    "建筑": "Architecture",
    "人物": "Character",
    "摄影": "Photography",
    "产品": "Product",
    "实拍": "Real Shot",
    "图表": "Infographic",
    "卡通": "Cartoon",
    "宠物": "Pets",
    "游戏": "Gaming",
    "创意": "Creative"
  }
};
