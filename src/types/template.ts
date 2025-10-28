import { CSSProperties } from "react";
import { GradientClass } from "@/lib/gradientConfig";

// 卡片表单数据接口
export interface CardForm {
  icon: string;
  date: string;
  title: string;
  content: string;
  author: string;
  textCount: string;
  qrCodeTitle: string;
  qrCodeText: string;
  pagination: string;
  qrCode: string;
  textCountNum: number;
}

// 卡片样式配置接口
export interface CardStyle {
  align: "left" | "center" | "right";
  backgroundName: string;
  backShadow: string;
  backShadowPositionX: number;
  backShadowPositionY: number;
  backShadowSize: number;
  backShadowRotation: number;
  font: string;
  width: number;
  ratio: string;
  height: number;
  fontScale: number;
  padding: string;
  borderRadius: string;
  color: string;
  opacity: number;
  blur: number;
  blurInset: string;
  backgroundAngle: string;
  containerBg: string;
  containerRotate: number;
  aspectRatio?: string; // 新增宽高比属性

  // 新增背景相关属性
  backgroundType: 'solid' | 'gradient' | 'image'; // 背景类型
  gradientClass?: GradientClass; // 渐变类名
  backgroundImage?: string; // 背景图片URL
  backgroundSize?: 'cover' | 'contain' | 'auto'; // 背景图片尺寸
  backgroundPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right'; // 背景图片位置
  imageOverlayOpacity?: number; // 图片背景遮罩透明度 (0-100)

  lineHeights: {
    content: string;
  };
  letterSpacings: {
    content: string;
  };
  rowSpacings: {
    content: string;
  };
}

// 卡片开关配置接口
export interface CardSwitchConfig {
  showIcon: boolean;
  showDate: boolean;
  showTitle: boolean;
  showContent: boolean;
  showAuthor: boolean;
  showTextCount: boolean;
  showQRCode: boolean;
  showPageNum: boolean;
  showWatermark: boolean;
  // 长文本拆分相关配置
  enableTextSplit?: boolean;
  maxCharsPerCard?: number;
  splitMode?: "paragraph" | "sentence" | "character";
}

// 单个卡片接口
export interface Card {
  form: CardForm;
  style: CardStyle;
  switchConfig: CardSwitchConfig;
  cardName: string;
  temp: string;
  language: "zh" | "en";
}

// 卡片数据导出格式接口
export interface CardExportData {
  exportTime: string;
  totalCards: number;
  currentTemplate: string;
  cards: Card[];
}

// 保留原有的简历模板接口（向后兼容）
export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  layout: "classic" | "modern" | "left-right" | "professional" | "timeline";
  colorScheme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  spacing: {
    sectionGap: number;
    itemGap: number;
    contentPadding: number;
  };
  basic: {
    layout?: "left" | "center" | "right";
  };
}

// 卡片模板接口
export interface CardTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  defaultForm: Partial<CardForm>;
  defaultStyle: Partial<CardStyle>;
  defaultSwitchConfig: Partial<CardSwitchConfig>;
}

export interface TemplateConfig {
  sectionTitle: {
    className?: string;
    styles: CSSProperties;
  };
}
