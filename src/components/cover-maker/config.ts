export interface FontOption {
  value: string;
  label: string;
}

export interface AspectRatioOption {
  width: number;
  height: number;
  label: string;
  ratio: string;
}

export interface DefaultConfig {
  text: string;
  watermark: string;
  fontFamily: string;
  fontStyles: string[];
  fontOptions: FontOption[];
  aspectRatioOptions: AspectRatioOption[];
}

const fonts = [
  [process.env.NEXT_PUBLIC_APP_FONT_FAMILY || 'Arial', '默认全局'],
  ['Microsoft YaHei', '微软雅黑'],
  ['HarmonyOS_Regular', '鸿蒙字体', 'https://s1.hdslb.com/bfs/static/jinkela/long/font/regular.css'],
  ['yozai', '悠哉字体', 'https://chinese-fonts-cdn.deno.dev/packages/yozai/dist/Yozai-Regular/result.css'],
  ['寒蝉全圆体', '寒蝉全圆体', 'https://chinese-fonts-cdn.deno.dev/packages/hcqyt/dist/ChillRoundFRegular/result.css'],
  ['Douyin Sans', '抖音美好体', 'https://chinese-fonts-cdn.deno.dev/packages/dymh/dist/DouyinSansBold/result.css'],
  ['MaokenZhuyuanTi', '猫啃珠圆体', 'https://chinese-fonts-cdn.deno.dev/packages/mkzyt/dist/猫啃珠圆体/result.css']
] as const;

// 常用的宽高比选项
const aspectRatios: AspectRatioOption[] = [
  { width: 1200, height: 600, label: '2:1 横版', ratio: '2:1' },    // 横版宽屏
  { width: 1200, height: 675, label: '16:9 视频', ratio: '16:9' },   // 标准视频
  { width: 1200, height: 800, label: '3:2 相片', ratio: '3:2' },     // 传统相片
  { width: 1000, height: 1000, label: '1:1 正方形', ratio: '1:1' },   // 正方形
  { width: 750, height: 1000, label: '3:4 竖版', ratio: '3:4' },     // 竖版
  { width: 675, height: 1200, label: '9:16 手机', ratio: '9:16' },   // 手机竖屏
  { width: 1000, height: 1500, label: '2:3 海报', ratio: '2:3' },    // 海报
];

export const defaultConfig: DefaultConfig = {
  text: 'Ant Card',       // 默认文本
  watermark: '@Ant Card', // 默认水印
  fontFamily: process.env.NEXT_PUBLIC_APP_FONT_FAMILY || 'Arial',
  fontStyles: fonts.map(f => f[2]).filter(Boolean) as string[],
  fontOptions: fonts.map(([value, label]) => ({ value, label })),
  aspectRatioOptions: aspectRatios
};