import React from "react";
import { CardTemplateProps } from "@/types/template";
import { QRCodeSVG } from "qrcode.react";
import ReactMarkdown from "react-markdown";

export const BoldMotivationTemplate: React.FC<CardTemplateProps> = ({
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
                backgroundColor: containerBg || "#111111",
                color: color,
                fontFamily: font,
                padding: padding,
            }}
        >
            {/* 装饰性引号 */}
            <div className="absolute top-8 left-8 text-6xl font-serif text-pink-600 opacity-80 leading-none">
                “
            </div>

            {/* 主要内容区域 - 居中显示 */}
            <div className="flex-1 flex flex-col justify-center relative z-10 px-4 mt-8">
                {config.showContent && (
                    <div
                        className="prose prose-xl max-w-none"
                        style={{
                            color: "#ffffff",
                            lineHeight: lineHeights?.content || 1.4,
                            letterSpacing: letterSpacings?.content || "0.02em",
                            marginBottom: rowSpacings?.content || "24px",
                        }}
                    >
                        <ReactMarkdown
                            components={{
                                p: ({ node, ...props }) => (
                                    <p className="mb-4 font-bold text-3xl md:text-4xl" style={{
                                        background: "linear-gradient(to right, #ff4d4d, #f472b6)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        textShadow: "0 2px 10px rgba(255, 77, 77, 0.2)"
                                    }} {...props} />
                                ),
                                strong: ({ node, ...props }) => (
                                    <span className="text-white" {...props} />
                                ),
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}

                {config.showTitle && (
                    <div className="mt-6 text-xl text-gray-400 font-medium border-l-4 border-pink-600 pl-4">
                        {title}
                    </div>
                )}
            </div>

            {/* 底部信息 */}
            <div className="mt-auto pt-8 flex justify-between items-center border-t border-gray-800">
                <div className="flex items-center gap-3">
                    {config.showIcon && (
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xl">
                            {icon}
                        </div>
                    )}
                    <div className="flex flex-col">
                        {config.showAuthor && (
                            <span className="text-white font-bold">{author}</span>
                        )}
                        {config.showDate && (
                            <span className="text-xs text-gray-500">{date}</span>
                        )}
                    </div>
                </div>

                {config.showQRCode && (
                    <div className="bg-white p-1 rounded">
                        <QRCodeSVG
                            value={qrCode || "https://antcard.airouter.tech"}
                            size={40}
                            fgColor="#000"
                            bgColor="transparent"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
