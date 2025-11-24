import { CardStyle } from "@/types/template";
import { getFontColorForGradient } from "@/lib/gradientConfig";

export const useCardTheme = () => {
    const getCardBackground = (style: Partial<CardStyle>) => {
        const backgroundType = style.backgroundType || 'solid';

        switch (backgroundType) {
            case 'gradient':
                // 渐变背景通过CSS类处理
                return 'transparent';
            case 'image':
                // 图片背景通过backgroundImage处理
                return style.containerBg || "#ffffff";
            default:
                return style.containerBg || "#ffffff";
        }
    };

    const getCardTextColor = (style: Partial<CardStyle>) => {
        const backgroundType = style.backgroundType || 'solid';

        switch (backgroundType) {
            case 'gradient':
                // 渐变背景使用预设的最佳文字颜色
                return style.gradientClass ? getFontColorForGradient(style.gradientClass) : '#333333';
            case 'image':
                // 图片背景使用白色文字以确保对比度
                return '#ffffff';
            default:
                // 纯色背景使用用户设置的颜色
                return style.color || '#000000';
        }
    };

    return {
        getCardBackground,
        getCardTextColor
    };
};
