import React from "react";
import { CardTemplateProps } from "@/types/template";
import { QRCodeSVG } from "qrcode.react";
import ReactMarkdown from "react-markdown";
import { CloudSun, MapPin } from "lucide-react";

export const NatureMorningTemplate: React.FC<CardTemplateProps> = ({
    data,
    style,
    config,
}) => {
    const {
        icon,
        date,
        title,
        content,
        author,
        qrCode,
    } = data;

    const {
        font,
        color,
        padding,
        lineHeights,
        letterSpacings,
        rowSpacings,
        backgroundImage,
    } = style;

    // 默认背景图
    const bgImage = backgroundImage || "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&auto=format&fit=crop";

    return (
        <div
            className="h-full w-full flex flex-col relative overflow-hidden"
            style={{
                fontFamily: font,
                color: "#ffffff",
            }}
        >
            {/* 背景图 */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* 渐变遮罩，保证文字可读性 */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            </div>

            {/* 内容容器 */}
            <div className="relative z-10 h-full flex flex-col p-8 justify-between">
                {/* 顶部天气/日期栏 */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        {config.showDate && (
                            <div className="text-lg font-medium text-white/90 drop-shadow-md">
                                {date}
                            </div>
                        )}
                        <div className="flex items-center text-xs text-white/70 mt-1 gap-2">
                            <CloudSun size={14} />
                            <span>多云 22-34°C</span>
                        </div>
                    </div>
                    {config.showIcon && (
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg border border-white/30">
                            <div className="text-2xl">{icon}</div>
                        </div>
                    )}
                </div>

                {/* 中间主要内容 */}
                <div className="flex-1 flex flex-col justify-center my-8">
                    {config.showTitle && (
                        <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-lg tracking-wide">
                            {title}
                        </h2>
                    )}

                    {config.showContent && (
                        <div
                            className="prose prose-invert prose-lg max-w-none"
                            style={{
                                lineHeight: lineHeights?.content || 1.6,
                                letterSpacing: letterSpacings?.content || "0.05em",
                                marginBottom: rowSpacings?.content || "24px",
                                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                            }}
                        >
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* 底部信息 */}
                <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm text-white/80 bg-black/20 px-3 py-1 rounded-full w-fit backdrop-blur-sm">
                            <MapPin size={14} />
                            <span>{author || "早安"}</span>
                        </div>
                    </div>

                    {config.showQRCode && (
                        <div className="bg-white p-1.5 rounded-lg shadow-lg">
                            <QRCodeSVG
                                value={qrCode || "https://antcard.airouter.tech"}
                                size={50}
                                fgColor="#000"
                                bgColor="transparent"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
