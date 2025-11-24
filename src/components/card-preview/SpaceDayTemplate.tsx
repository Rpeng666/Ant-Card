import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';

interface SpaceDayTemplateProps {
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

const SpaceDayTemplate: React.FC<SpaceDayTemplateProps> = ({
    date = "2025-08-04",
    title = "论文=拼好文",
    content = "Space",
    author = "Space",
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
    icon = "🪐"
}) => {
    // Parse date
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = dateObj.toLocaleString('en-US', { month: 'long' }).toUpperCase();
    const year = dateObj.getFullYear();
    const weekday = dateObj.toLocaleString('zh-CN', { weekday: 'long' });

    return (
        <div className="w-full h-full bg-[#1c1c1c] p-8 flex flex-col items-center justify-between font-serif text-[#d4d4d4] relative border border-[#333]">

            {/* Date Section */}
            {showDate && (
                <div className="flex flex-col items-center mt-8">
                    <div className="text-8xl font-bold text-[#e5e5e5] leading-none tracking-tighter">
                        {day}
                    </div>
                    <div className="text-sm tracking-[0.3em] text-[#888] mt-2 uppercase">
                        {month} {year}
                    </div>
                    <div className="text-xs text-[#666] mt-1 tracking-widest">
                        {weekday}
                    </div>
                    <div className="w-8 h-[1px] bg-[#444] mt-6"></div>
                </div>
            )}

            {/* Main Title/Content */}
            <div className="flex-grow flex flex-col items-center justify-center text-center w-full">
                {showTitle && (
                    <h1 className="text-4xl md:text-5xl font-bold text-[#e5e5e5] tracking-wide leading-tight mb-6">
                        {title}
                    </h1>
                )}

                {showContent && content !== "Space" && (
                    <div className="prose prose-invert prose-sm max-w-xs text-center text-[#a3a3a3]">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="w-full flex justify-between items-end mb-4">
                {showAuthor && (
                    <div className="text-lg font-medium text-[#e5e5e5] tracking-wider">
                        {author}
                    </div>
                )}

                {showQRCode && qrCode && (
                    <div className="bg-white p-1 rounded-sm">
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
    );
};

export default SpaceDayTemplate;
