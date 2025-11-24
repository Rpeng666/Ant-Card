import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';
import { MoreHorizontal, Share } from 'lucide-react';

interface HighlightMemoTemplateProps {
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

const HighlightMemoTemplate: React.FC<HighlightMemoTemplateProps> = ({
    date = "2025年8月17日",
    title = "250803本周回顾",
    content = "**本周我最大的改变：**\n\n1. **重新拿回了生活的掌控感。**\n\n因为小王出差了，所以我开始做选择。\n\n比如买什么菜，中午要不要出去吃饭，几点出门上班，走哪条路上班等等。\n\n惊讶地发现，我感受到了生活本身，更积极地生活了。",
    author = "阿柒",
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
    icon = "📝"
}) => {
    return (
        <div className="w-full h-full bg-[#fbfbfb] p-6 flex flex-col font-sans text-gray-800 relative">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6 text-amber-400">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                    {showIcon && <span>{icon}</span>} 备忘录
                </div>
                <div className="flex gap-3">
                    <MoreHorizontal size={20} />
                    <Share size={20} />
                </div>
            </div>

            {/* Date */}
            {showDate && (
                <div className="text-center text-xs text-gray-400 mb-2">
                    {date}
                </div>
            )}

            {/* Title with Highlight */}
            {showTitle && (
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 inline-block relative z-10">
                        <span className="relative z-10">{title}</span>
                        <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300/80 -z-10 transform -rotate-1"></span>
                    </h1>
                </div>
            )}

            {/* Content */}
            <div className="flex-grow">
                {showContent && (
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                                strong: ({ node, ...props }) => <strong className="font-bold text-gray-900 bg-yellow-100 px-1 rounded" {...props} />,
                                li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-auto pt-6 flex items-end justify-between border-t border-gray-100">
                <div className="flex flex-col">
                    {showAuthor && (
                        <div className="text-sm font-medium text-gray-400">
                            {author}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {showPageNum && (
                        <div className="text-sm text-gray-300 font-mono">
                            {pagination}
                        </div>
                    )}
                    {showQRCode && qrCode && (
                        <div className="bg-white p-1 rounded border border-gray-100">
                            <QRCodeSVG
                                value={qrCode}
                                size={40}
                                bgColor="#ffffff"
                                fgColor="#000000"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HighlightMemoTemplate;
