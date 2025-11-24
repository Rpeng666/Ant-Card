import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { cn } from '@/lib/utils';

interface MinimalistTemplateProps {
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

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({
    date = "2025年10月12日",
    title = "极简风格",
    content = "内容区域...",
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
    icon = "⚡"
}) => {
    return (
        <div className="w-full h-full bg-white p-8 flex flex-col justify-between text-gray-900 font-sans">
            <div className="space-y-6">
                {/* 头部信息 */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        {showIcon && (
                            <div className="text-2xl">{icon}</div>
                        )}
                        {showTitle && (
                            <h1 className="text-xl font-bold tracking-tight">{title}</h1>
                        )}
                    </div>
                    {showDate && (
                        <div className="text-sm text-gray-400 font-medium">{date}</div>
                    )}
                </div>

                {/* 内容区域 */}
                {showContent && (
                    <div className="prose prose-gray max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-a:text-blue-600">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            {/* 底部区域 */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-end justify-between">
                <div className="flex flex-col gap-4">
                    {showAuthor && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                                {author.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-gray-600">{author}</span>
                        </div>
                    )}

                    {showQRCode && (
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-1 border border-gray-100 rounded-md">
                                <QRCodeSVG value={qrCode} size={48} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-gray-900">{qrCodeTitle}</span>
                                <span className="text-[10px] text-gray-400">{qrCodeText}</span>
                            </div>
                        </div>
                    )}
                </div>

                {showPageNum && (
                    <div className="text-4xl font-black text-gray-100 tracking-tighter">
                        {pagination}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MinimalistTemplate;
