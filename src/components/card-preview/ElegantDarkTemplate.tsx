import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';

interface ElegantDarkTemplateProps {
    date?: string;
    title?: string;
    content?: string;
    author?: string;
    qrCode?: string;
    qrCodeTitle?: string;
    qrCodeText?: string;
    showIcon?: boolean;
    showDate?: boolean;
    showTitle?: boolean;
    showContent?: boolean;
    showAuthor?: boolean;
    showQRCode?: boolean;
    showPageNum?: boolean;
    pagination?: string;
    icon?: string;
}

const ElegantDarkTemplate: React.FC<ElegantDarkTemplateProps> = ({
    date = "2025年10月12日",
    title = "暗夜优雅",
    content = "深色背景搭配衬线字体，营造出一种静谧、高端的阅读氛围。适合展示诗歌、散文或深度的思考内容。",
    author = "作者",
    qrCode = "https://example.com",
    qrCodeTitle = "Ant Card",
    qrCodeText = "扫描二维码",
    showIcon = true,
    showDate = true,
    showTitle = true,
    showContent = true,
    showAuthor = true,
    showQRCode = true,
    showPageNum = true,
    pagination = "01",
    icon = "🌙"
}) => {
    return (
        <div className="w-full h-full bg-[#1a1a1a] text-[#e5e5e5] p-10 flex flex-col relative overflow-hidden font-serif">
            {/* 边框装饰 */}
            <div className="absolute inset-4 border border-[#333] pointer-events-none"></div>

            <div className="relative z-10 flex-1 flex flex-col h-full">
                {/* 头部 */}
                <div className="text-center mb-10 space-y-4">
                    {showIcon && (
                        <div className="text-3xl text-[#d4af37] mb-4">{icon}</div>
                    )}
                    {showDate && (
                        <div className="text-xs tracking-[0.2em] text-[#666] uppercase">
                            {date}
                        </div>
                    )}
                    {showTitle && (
                        <h1 className="text-3xl font-medium tracking-wide text-[#d4af37]">
                            {title}
                        </h1>
                    )}
                    <div className="w-12 h-[1px] bg-[#333] mx-auto mt-6"></div>
                </div>

                {/* 内容 */}
                {showContent && (
                    <div className="flex-1 px-4">
                        <div className="prose prose-invert prose-p:text-[#a3a3a3] prose-p:leading-loose prose-headings:text-[#d4af37] prose-headings:font-normal max-w-none text-center">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}

                {/* 底部 */}
                <div className="mt-10 flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        {showAuthor && (
                            <div className="flex flex-col">
                                <span className="text-xs text-[#666] uppercase tracking-widest mb-1">Written by</span>
                                <span className="text-sm text-[#d4af37] italic">{author}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-6">
                        {showQRCode && (
                            <div className="bg-white p-1">
                                <QRCodeSVG value={qrCode} size={40} />
                            </div>
                        )}
                        {showPageNum && (
                            <div className="text-lg text-[#333] font-serif italic">
                                {pagination}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElegantDarkTemplate;
