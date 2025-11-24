import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';

interface AcademicClassicTemplateProps {
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

const AcademicClassicTemplate: React.FC<AcademicClassicTemplateProps> = ({
    date = "2025/8/5",
    title = "《孟子》第4讲《梁惠王上之仁者无敌》",
    content = "仁者无敌，不是不杀，是为民，为了全民而处理“兽”。\n\n【遗姐收藏夹】解锁百位大V的认知内参",
    author = "卢麒元",
    qrCode = "https://example.com",
    qrCodeTitle = "Ant Card",
    qrCodeText = "立刻扫码入圈查阅全文 👉",
    showIcon = true,
    showDate = true,
    showTitle = true,
    showContent = true,
    showAuthor = true,
    showQRCode = true,
    showPageNum = true,
    pagination = "01",
    icon = "📖"
}) => {
    return (
        <div className="w-full h-full bg-[#18181b] p-8 flex flex-col font-serif text-[#d4d4d8] relative">
            {/* Border Frame */}
            <div className="absolute inset-4 border border-[#3f3f46] pointer-events-none rounded-sm"></div>

            <div className="h-full flex flex-col p-4 z-10">
                {/* Header */}
                <div className="mb-8 border-b border-[#3f3f46] pb-6">
                    {showTitle && (
                        <h1 className="text-xl font-bold text-[#f4f4f5] mb-3 leading-relaxed tracking-wide">
                            {title}
                        </h1>
                    )}
                    {showDate && (
                        <div className="text-xs text-[#71717a] font-sans flex items-center gap-2">
                            <span>摘录于</span>
                            <span>{date}</span>
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
                                    p: ({ node, ...props }) => <p className="mb-6 leading-loose text-[#d4d4d8] text-justify" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-bold text-[#fbbf24]" {...props} />,
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-6 flex items-end justify-between">
                    <div className="flex flex-col gap-2">
                        {showAuthor && (
                            <div className="flex flex-col">
                                <span className="text-xs text-[#52525b] mb-1">作者</span>
                                <span className="text-sm font-medium text-[#a1a1aa]">{author}</span>
                            </div>
                        )}
                    </div>

                    {showQRCode && qrCode && (
                        <div className="flex items-center gap-3 bg-[#27272a] p-2 pr-3 rounded border border-[#3f3f46]">
                            <div className="bg-white p-1 rounded-sm">
                                <QRCodeSVG
                                    value={qrCode}
                                    size={48}
                                    bgColor="#ffffff"
                                    fgColor="#000000"
                                />
                            </div>
                            <div className="flex flex-col max-w-[100px]">
                                <span className="text-[10px] text-[#a1a1aa] leading-tight">{qrCodeText}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AcademicClassicTemplate;
