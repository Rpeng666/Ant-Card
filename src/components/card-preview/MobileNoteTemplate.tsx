import React from "react";
import { CardTemplateProps } from "@/types/template";
import { QRCodeSVG } from "qrcode.react";
import ReactMarkdown from "react-markdown";
import { ChevronLeft, MoreHorizontal, Share } from "lucide-react";

export const MobileNoteTemplate: React.FC<CardTemplateProps> = ({
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
                backgroundColor: containerBg || "#ffffff",
                color: color,
                fontFamily: font,
            }}
        >
            {/* 模拟手机状态栏/导航栏 */}
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
                <div className="flex items-center text-amber-500 gap-1">
                    <ChevronLeft size={24} />
                    <span className="font-medium">备忘录</span>
                </div>
                <div className="flex gap-4 text-amber-500">
                    <Share size={20} />
                    <MoreHorizontal size={20} />
                </div>
            </div>

            {/* 内容区域 */}
            <div className="flex-1 p-8 overflow-hidden relative">
                {config.showDate && (
                    <div className="text-gray-400 text-sm mb-4 font-medium">
                        {date} · {author}
                    </div>
                )}

                {config.showTitle && (
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                        {title}
                    </h1>
                )}

                {config.showContent && (
                    <div
                        className="prose prose-lg max-w-none"
                        style={{
                            color: "#374151",
                            lineHeight: lineHeights?.content || 1.7,
                            letterSpacing: letterSpacings?.content || "0.02em",
                            marginBottom: rowSpacings?.content || "24px",
                        }}
                    >
                        <ReactMarkdown
                            components={{
                                // 自定义列表样式
                                ol: ({ node, ...props }) => (
                                    <ol className="list-decimal pl-5 space-y-2 marker:text-amber-500 marker:font-bold" {...props} />
                                ),
                                li: ({ node, ...props }) => (
                                    <li className="pl-1" {...props} />
                                ),
                                strong: ({ node, ...props }) => (
                                    <span className="bg-amber-100 text-amber-800 px-1 rounded" {...props} />
                                ),
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            {/* 底部工具栏模拟 */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-gray-400">
                <div className="flex gap-6">
                    {config.showIcon && <span>{icon}</span>}
                    <span className="text-xs">1024 字</span>
                </div>

                {config.showQRCode && (
                    <div className="flex items-center gap-2">
                        <span className="text-xs scale-75 origin-right">Scan Me</span>
                        <QRCodeSVG
                            value={qrCode || "https://antcard.airouter.tech"}
                            size={32}
                            fgColor="#9ca3af"
                            bgColor="transparent"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
