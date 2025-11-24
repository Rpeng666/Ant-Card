import React from "react";
import { CardTemplateProps } from "@/types/template";
import { QRCodeSVG } from "qrcode.react";
import ReactMarkdown from "react-markdown";

export const HandwrittenPaperTemplate: React.FC<CardTemplateProps> = ({
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
        qrCodeTitle,
        qrCodeText,
    } = data;

    const {
        font,
        color,
        containerBg,
        padding,
        lineHeights,
        letterSpacings,
        rowSpacings,
    } = style;

    return (
        <div
            className="h-full w-full flex flex-col relative overflow-hidden"
            style={{
                backgroundColor: containerBg || "#fdfbf7",
                color: color,
                fontFamily: font,
                padding: padding,
                backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
                backgroundSize: "20px 20px",
            }}
        >
            {/* 顶部居中头像 */}
            {config.showIcon && (
                <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center text-3xl border-2 border-gray-200 shadow-sm">
                        {icon}
                    </div>
                </div>
            )}

            {/* 标题 */}
            {config.showTitle && (
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 tracking-wide" style={{ fontFamily: '"KaiTi", "楷体", serif' }}>
                        {title}
                    </h2>
                </div>
            )}

            {/* 主要内容区域 */}
            <div className="flex-1 flex flex-col relative z-10 px-4">
                {config.showContent && (
                    <div
                        className="prose prose-lg max-w-none flex-1"
                        style={{
                            color: "#374151",
                            lineHeight: lineHeights?.content || 2,
                            letterSpacing: letterSpacings?.content || "0.05em",
                            marginBottom: rowSpacings?.content || "24px",
                            fontFamily: '"KaiTi", "楷体", serif', // 模拟手写风格
                        }}
                    >
                        <ReactMarkdown
                            components={{
                                p: ({ node, ...props }) => (
                                    <p className="mb-4" {...props} />
                                ),
                                li: ({ node, ...props }) => (
                                    <li className="mb-2 list-decimal" {...props} />
                                ),
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            {/* 底部布局 */}
            <div className="mt-8 flex justify-between items-end px-4">
                {/* 左侧二维码 */}
                {config.showQRCode && (
                    <div className="flex items-center gap-2">
                        <div className="bg-white/50 p-2 rounded-lg">
                            <QRCodeSVG
                                value={qrCode || "https://antcard.airouter.tech"}
                                size={64}
                                fgColor="#4b5563"
                                bgColor="transparent"
                            />
                        </div>
                        {(qrCodeTitle || qrCodeText) && (
                            <div className="flex flex-col text-xs text-gray-500 font-serif">
                                <span>{qrCodeTitle}</span>
                                <span>{qrCodeText}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* 右侧签名和日期 */}
                <div className="flex flex-col items-end text-gray-600 font-serif">
                    {config.showDate && (
                        <div className="mb-1 text-lg" style={{ fontFamily: '"KaiTi", "楷体", serif' }}>
                            {date}
                        </div>
                    )}
                    {config.showAuthor && (
                        <div className="text-xl font-bold" style={{ fontFamily: '"KaiTi", "楷体", serif' }}>
                            {author}
                        </div>
                    )}
                </div>
            </div>

            {/* 底部水印装饰 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-300 text-sm font-serif flex items-center gap-1 opacity-50">
                <span>◇</span>
                <span>流光卡片</span>
            </div>
        </div>
    );
};
