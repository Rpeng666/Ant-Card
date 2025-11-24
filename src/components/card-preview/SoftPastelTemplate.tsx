import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';

interface SoftPastelTemplateProps {
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

const SoftPastelTemplate: React.FC<SoftPastelTemplateProps> = ({
    date = "2025年8月15日",
    title = "物怪：唐伞",
    content = "《物怪：唐伞》篇章中，作为贯穿全系列的驱魔逻辑，卖药郎必须获得“形、真、理”三者，才能拔剑斩妖。每一案中的“形、真、理”都与事件本身、角色心理、社会背景紧密相连。",
    author = "唐伞",
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
    icon = "☂️"
}) => {
    return (
        <div className="w-full h-full bg-[#e0f2fe] p-8 flex flex-col items-center justify-center font-serif text-slate-800">
            <div className="w-full h-full bg-gradient-to-b from-cyan-50 to-blue-50 rounded-xl shadow-sm border border-white/50 p-8 flex flex-col relative overflow-hidden">

                {/* Decorative Circle */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

                {/* Header */}
                <div className="relative z-10 mb-6">
                    {showTitle && (
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">
                            {title}
                        </h1>
                    )}
                    {showDate && (
                        <div className="text-xs text-slate-400 font-sans">
                            {date}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow">
                    {showContent && (
                        <div className="prose prose-slate prose-lg max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                                components={{
                                    p: ({ node, ...props }) => <p className="mb-4 leading-loose text-slate-700 text-justify" {...props} />,
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="relative z-10 mt-auto pt-6 flex items-end justify-between">
                    <div className="flex flex-col">
                        {showAuthor && (
                            <div className="text-sm font-bold text-slate-900 mb-1">
                                物怪: {author}
                            </div>
                        )}
                    </div>

                    {showPageNum && (
                        <div className="text-xs text-slate-300 font-sans">
                            {pagination}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SoftPastelTemplate;
