import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';

interface BoldTypographyTemplateProps {
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

const BoldTypographyTemplate: React.FC<BoldTypographyTemplateProps> = ({
    date = "2025.10.12",
    title = "BOLD VISION",
    content = "Simplicity is the ultimate sophistication. Focus on what matters.",
    author = "Steve",
    qrCode = "https://example.com",
    qrCodeTitle = "Ant Card",
    qrCodeText = "Scan Me",
    showIcon = true,
    showDate = true,
    showTitle = true,
    showContent = true,
    showAuthor = true,
    showQRCode = true,
    showPageNum = true,
    pagination = "01",
    icon = "✦"
}) => {
    return (
        <div className="w-full h-full bg-white p-8 flex flex-col relative overflow-hidden font-sans text-black">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-8">
                {showIcon && (
                    <div className="text-4xl text-green-600">{icon}</div>
                )}
                {showDate && (
                    <div className="text-sm font-bold tracking-widest text-gray-400 uppercase border-b-2 border-green-500 pb-1">
                        {date}
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col justify-center">
                {showTitle && (
                    <h1 className="text-5xl font-black leading-tight tracking-tight mb-6 text-black">
                        {title}
                    </h1>
                )}

                {showContent && (
                    <div className="prose prose-lg max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                p: ({ node, ...props }) => <p className="text-xl font-medium leading-relaxed text-gray-800" {...props} />,
                                strong: ({ node, ...props }) => <strong className="text-green-600 font-black" {...props} />,
                                em: ({ node, ...props }) => <em className="text-gray-500 not-italic border-b-2 border-green-200" {...props} />,
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-auto pt-8 flex items-end justify-between">
                <div className="flex flex-col">
                    {showAuthor && (
                        <div className="text-lg font-bold text-black mb-1">
                            {author}
                        </div>
                    )}
                    {showPageNum && (
                        <div className="text-xs text-gray-400 font-mono">
                            PAGE {pagination}
                        </div>
                    )}
                </div>

                {showQRCode && qrCode && (
                    <div className="flex flex-col items-center gap-2">
                        <QRCodeSVG
                            value={qrCode}
                            size={60}
                            bgColor="#ffffff"
                            fgColor="#000000"
                        />
                        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{qrCodeText}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoldTypographyTemplate;
