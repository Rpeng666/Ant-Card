import React from "react";
import { CardTemplateProps } from "@/types/template";
import { QRCodeSVG } from "qrcode.react";
import ReactMarkdown from "react-markdown";
import { Camera } from "lucide-react";

export const PolaroidClassicTemplate: React.FC<CardTemplateProps> = ({
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
        backgroundImage,
    } = style;

    return (
        <div
            className="h-full w-full flex flex-col relative overflow-hidden shadow-xl"
            style={{
                backgroundColor: containerBg || "#ffffff",
                color: color,
                fontFamily: font,
            }}
        >
            {/* 上半部分：图片区域 */}
            <div className="h-[45%] w-full bg-gray-100 relative overflow-hidden group">
                {backgroundImage ? (
                    <img
                        src={backgroundImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-300">
                        <Camera size={48} strokeWidth={1.5} />
                        <span className="mt-2 text-sm">Replace Background Image</span>
                    </div>
                )}

                {/* 装饰性标签 */}
                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    INSPIRED
                </div>
            </div>

            {/* 下半部分：内容区域 */}
            <div className="flex-1 flex flex-col p-8 relative">
                {/* 标题 */}
                {config.showTitle && (
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                            {title}
                        </h2>
                    </div>
                )}

                {/* 作者信息 */}
                <div className="flex items-center mb-6">
                    {config.showIcon && (
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold mr-3">
                            {icon}
                        </div>
                    )}
                    <div className="flex flex-col">
                        {config.showAuthor && (
                            <span className="text-sm font-bold text-gray-800">{author}</span>
                        )}
                        {config.showDate && (
                            <span className="text-xs text-gray-400">{date}</span>
                        )}
                    </div>
                </div>

                {/* 正文 */}
                {config.showContent && (
                    <div
                        className="prose prose-sm max-w-none flex-1 overflow-hidden"
                        style={{
                            color: "#4b5563",
                            lineHeight: lineHeights?.content || 1.6,
                            letterSpacing: letterSpacings?.content || "0.02em",
                            marginBottom: rowSpacings?.content || "16px",
                        }}
                    >
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                )}

                {/* 底部二维码 */}
                {config.showQRCode && (
                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                            {qrCodeTitle || "Scan to read more"}
                        </div>
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
