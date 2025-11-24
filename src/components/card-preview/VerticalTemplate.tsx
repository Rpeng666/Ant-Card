import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';

interface VerticalTemplateProps {
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

const VerticalTemplate: React.FC<VerticalTemplateProps> = ({
    date = "2025年10月12日",
    title = "竖排文字",
    content = "这里是竖排文字内容。竖排排版在中国传统文化中有着悠久的历史，给人一种古典、优雅的感觉。",
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
    icon = "🎋"
}) => {
    return (
        <div className="w-full h-full bg-[#fdfbf7] p-8 flex flex-col relative overflow-hidden font-serif text-stone-800">
            {/* 装饰纹理 */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
            </div>

            <div className="flex-1 flex flex-row-reverse gap-8 items-start justify-center h-full py-4">
                {/* 标题区域 (竖排) */}
                <div className="flex flex-col items-center gap-4 h-full border-l-2 border-stone-800/20 pl-6 ml-2">
                    {showIcon && (
                        <div className="text-3xl mb-4">{icon}</div>
                    )}
                    {showTitle && (
                        <h1 className="text-3xl font-bold tracking-widest" style={{ writingMode: 'vertical-rl' }}>
                            {title}
                        </h1>
                    )}
                    {showDate && (
                        <div className="text-sm text-stone-500 mt-auto tracking-widest" style={{ writingMode: 'vertical-rl' }}>
                            {date}
                        </div>
                    )}
                </div>

                {/* 内容区域 (竖排) */}
                {showContent && (
                    <div className="flex-1 h-full overflow-hidden">
                        <div className="prose prose-stone max-w-none h-full text-lg leading-loose tracking-wider"
                            style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                                components={{
                                    p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                                    h1: ({ node, ...props }) => <h1 className="font-bold text-xl mb-4" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="font-bold text-lg mb-4" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="font-bold text-base mb-4" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc mr-4" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal mr-4" {...props} />,
                                    li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>

            {/* 底部区域 */}
            <div className="mt-auto pt-6 border-t border-stone-200 flex items-end justify-between">
                <div className="flex flex-col gap-2">
                    {showAuthor && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 font-serif font-bold">
                                {author.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-stone-600">{author}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {showQRCode && (
                        <div className="flex items-center gap-2 bg-white p-1 shadow-sm border border-stone-100">
                            <QRCodeSVG value={qrCode} size={40} fgColor="#44403c" />
                        </div>
                    )}
                    {showPageNum && (
                        <div className="text-2xl font-serif text-stone-300">
                            {pagination}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerticalTemplate;
