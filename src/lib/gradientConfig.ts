// 渐变背景配置系统 - 迁移自 inspireplanet.cc

export const GRADIENT_CLASSES = [
  'card-gradient-1',
  'card-gradient-2',
  'card-gradient-3',
  'card-gradient-4',
  'card-gradient-5',
  'card-gradient-6',
  'card-gradient-7',
  'card-gradient-8',
  'card-gradient-9',
  'card-gradient-10',
  'card-gradient-11',
  'card-gradient-12',
  'card-gradient-13',
  'card-gradient-14',
  'card-gradient-teal-blue'
] as const;

export type GradientClass = typeof GRADIENT_CLASSES[number];

// 定义渐变对应的搜索关键词
export const GRADIENT_SEARCH_TERMS: Record<GradientClass, string> = {
  'card-gradient-1': "rainbow colorful abstract art",
  'card-gradient-2': "sunrise warm orange yellow nature",
  'card-gradient-3': "purple fantasy magical violet",
  'card-gradient-4': "ocean blue water sea waves",
  'card-gradient-5': "fire flame orange red energy",
  'card-gradient-6': "green nature forest fresh leaves",
  'card-gradient-7': "red orange passion warm sunset",
  'card-gradient-8': "sky blue white clouds peaceful",
  'card-gradient-9': "grey mist fog minimal calm",
  'card-gradient-10': "honey yellow warm golden light",
  'card-gradient-11': "mint green fresh nature spring",
  'card-gradient-12': "purple pink soft pastel flowers",
  'card-gradient-13': "golden wheat field warm autumn",
  'card-gradient-14': "silver grey moonlight minimal",
  'card-gradient-teal-blue': "ocean teal blue gradient modern"
};

// 为每个渐变背景配置合适的字体颜色
export const GRADIENT_FONT_COLORS: Record<GradientClass, string> = {
  'card-gradient-1': '#2c3e50',    // 彩虹梦境 - 深蓝灰
  'card-gradient-2': '#8b4513',    // 日出暖阳 - 深棕色
  'card-gradient-3': '#4a148c',    // 紫色幻想 - 深紫色
  'card-gradient-4': '#1e3a8a',    // 海洋蓝调 - 深蓝色
  'card-gradient-5': '#2c3e50',    // 火焰橙黄 - 深蓝灰
  'card-gradient-6': '#2d5016',    // 清新绿意 - 深绿色
  'card-gradient-7': '#8b0000',    // 热情红橙 - 深红色
  'card-gradient-8': '#1e3a8a',    // 天空蓝白 - 深蓝色
  'card-gradient-9': '#6b7280',    // 雾霭灰蓝 - 中性灰
  'card-gradient-10': '#8b4513',   // 蜂蜜暖黄 - 深棕色
  'card-gradient-11': '#1a5d1a',   // 薄荷清绿 - 深绿色
  'card-gradient-12': '#4a148c',   // 淡雅紫粉 - 深紫色
  'card-gradient-13': '#8b4513',   // 麦田金黄 - 深棕色
  'card-gradient-14': '#374151',   // 月光银灰 - 深灰色
  'card-gradient-teal-blue': '#ffffff'  // 青色到蓝色渐变 - 白色文字
};

// 渐变的显示名称
export const GRADIENT_DISPLAY_NAMES: Record<GradientClass, string> = {
  'card-gradient-1': '彩虹梦境',
  'card-gradient-2': '日出暖阳',
  'card-gradient-3': '紫色幻想',
  'card-gradient-4': '海洋蓝调',
  'card-gradient-5': '火焰橙黄',
  'card-gradient-6': '清新绿意',
  'card-gradient-7': '热情红橙',
  'card-gradient-8': '天空蓝白',
  'card-gradient-9': '雾霭灰蓝',
  'card-gradient-10': '蜂蜜暖黄',
  'card-gradient-11': '薄荷清绿',
  'card-gradient-12': '淡雅紫粉',
  'card-gradient-13': '麦田金黄',
  'card-gradient-14': '月光银灰',
  'card-gradient-teal-blue': '青蓝渐变'
};

// 工具函数
export function getFontColorForGradient(gradientClass: GradientClass): string {
  return GRADIENT_FONT_COLORS[gradientClass] || '#333333';
}

export function getSearchTermForGradient(gradientClass: GradientClass): string {
  return GRADIENT_SEARCH_TERMS[gradientClass] || 'abstract background';
}

export function getDisplayNameForGradient(gradientClass: GradientClass): string {
  return GRADIENT_DISPLAY_NAMES[gradientClass] || gradientClass;
}

export function getRandomGradientClass(): GradientClass {
  const randomIndex = Math.floor(Math.random() * GRADIENT_CLASSES.length);
  return GRADIENT_CLASSES[randomIndex];
}

// 获取所有渐变配置用于下拉选择等UI组件
export function getAllGradientOptions() {
  return GRADIENT_CLASSES.map(gradientClass => ({
    value: gradientClass,
    label: getDisplayNameForGradient(gradientClass),
    fontColor: getFontColorForGradient(gradientClass),
    searchTerm: getSearchTermForGradient(gradientClass)
  }));
}