import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';

interface ZenDarkTemplateProps {
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

const ZenDarkTemplate: React.FC<ZenDarkTemplateProps> = ({
    date = "2025年8月17日",
    title = "本周金句",
    content = "1. 关于运动：\n让时间变慢的方法就是投入进去。\n\n2. 关于精力充沛：\n睡前不要用脑，尽量做让身体愉悦的事情。\n\n3. 关于个人状态：\n保持觉知，保持可以随时抽离的状态。",
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
    pagination = "生活日志",
    icon = "🧘"
}) => {
    return (
        <div className="w-full h-full bg-[#111111] p-8 flex flex-col font-serif text-[#e5e5e5] relative border border-[#222]">
            {/* Header */}
            <div className="mb-8">
                {showTitle && (
                    <h1 className="text-2xl font-bold text-[#d4d4d4] mb-2 tracking-wide">
                        {title}
                    </h1>
                )}
                {showDate && (
                    <div className="text-xs text-[#666] font-sans tracking-widest uppercase">
                        {date}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-grow">
                {showContent && (
                    <div className="prose prose-invert prose-lg max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                p: ({ node, ...props }) => <p className="mb-6 leading-loose text-[#a3a3a3] font-light" {...props} />,
                                strong: ({ node, ...props }) => <strong className="font-medium text-[#e5e5e5]" {...props} />,
                                li: ({ node, ...props }) => <li className="mb-4 text-[#a3a3a3]" {...props} />,
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-auto pt-8 flex items-end justify-between">
                <div className="flex flex-col gap-1">
                    {showPageNum && (
                        <div className="text-xs text-[#555] font-sans tracking-widest">
                            {pagination}
                        </div>
                    )}
                    {showAuthor && (
                        <div className="text-sm font-medium text-[#888]">
                            {author}
                        </div>
                    )}
                </div>

                {showQRCode && qrCode && (
                    <div className="opacity-50 hover:opacity-100 transition-opacity">
                        <QRCodeSVG
                            value={qrCode}
                            size={48}
                            bgColor="#111111"
                            fgColor="#666666"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ZenDarkTemplate;
