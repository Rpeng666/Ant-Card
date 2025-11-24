import React from "react";
import { CardTemplateProps } from "@/types/template";
import { QRCodeSVG } from "qrcode.react";
import ReactMarkdown from "react-markdown";

export const LiteratureNoteTemplate: React.FC<CardTemplateProps> = ({
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
        textCountNum,
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
                padding: padding,
            }}
        >
            {/* 顶部头像/图标 */}
            {config.showIcon && (
                <div className="mb-6 flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-2xl border border-gray-200 shadow-sm">
                        {icon}
                    </div>
                    {config.showAuthor && (
                        <div className="ml-3 font-medium text-gray-600">{author}</div>
                    )}
                </div>
            )}

            {/* 主要内容区域 */}
            <div className="flex-1 flex flex-col relative z-10">
                {config.showContent && (
                    <div
                        className="prose prose-lg max-w-none flex-1"
                        style={{
                            color: color,
                            lineHeight: lineHeights?.content || 1.8,
                            letterSpacing: letterSpacings?.content || "0.02em",
                            marginBottom: rowSpacings?.content || "24px",
                            fontFamily: '"Songti SC", "SimSun", serif', // 强制使用衬线体风格
                        }}
                    >
                        <ReactMarkdown
                            components={{
                                p: ({ node, ...props }) => (
                                    <p className="mb-4 text-justify" {...props} />
                                ),
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            {/* 底部信息 */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-end">
                <div className="flex flex-col">
                    {config.showDate && (
                        <div className="text-sm text-gray-400 font-serif italic">
                            {date}
                        </div>
                    )}
                    {config.showTextCount && (
                        <div className="text-xs text-gray-300 mt-1">
                            {textCountNum} 字
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {config.showTitle && (
                        <div className="text-lg font-bold font-serif text-gray-800">
                            {title}
                        </div>
                    )}

                    {config.showQRCode && (
                        <div className="flex flex-col items-center ml-4">
                            <div className="bg-white p-1 border border-gray-100 rounded-sm">
                                <QRCodeSVG
                                    value={qrCode || "https://antcard.airouter.tech"}
                                    size={48}
                                    fgColor="#333"
                                    bgColor="transparent"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
