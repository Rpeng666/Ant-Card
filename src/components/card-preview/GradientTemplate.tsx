import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';

interface GradientTemplateProps {
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

const GradientTemplate: React.FC<GradientTemplateProps> = ({
    date = "2025年10月12日",
    title = "渐变风格",
    content = "渐变色彩能带来丰富的视觉体验，配合玻璃拟态效果，让卡片看起来更加现代和通透。",
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
    icon = "🌈"
}) => {
    return (
        <div className="w-full h-full p-6 flex flex-col relative overflow-hidden text-white">
            {/* 渐变背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>

            {/* 玻璃拟态容器 */}
            <div className="relative z-10 flex-1 flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">

                {/* 头部 */}
                <div className="flex items-start justify-between mb-8">
                    <div className="space-y-2">
                        {showIcon && (
                            <div className="text-4xl mb-2 drop-shadow-md">{icon}</div>
                        )}
                        {showTitle && (
                            <h1 className="text-2xl font-bold tracking-tight drop-shadow-sm">{title}</h1>
                        )}
                    </div>
                    {showDate && (
                        <div className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                            {date}
                        </div>
                    )}
                </div>

                {/* 内容 */}
                {showContent && (
                    <div className="flex-1 prose prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}

                {/* 底部 */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-end justify-between">
                    <div className="flex items-center gap-3">
                        {showAuthor && (
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs backdrop-blur-sm">
                                    {author.charAt(0)}
                                </div>
                                <span className="text-sm font-medium text-white/90">{author}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {showQRCode && (
                            <div className="bg-white p-1.5 rounded-lg shadow-lg">
                                <QRCodeSVG value={qrCode} size={48} />
                            </div>
                        )}
                        {showPageNum && (
                            <div className="text-5xl font-black text-white/20 tracking-tighter">
                                {pagination}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GradientTemplate;
