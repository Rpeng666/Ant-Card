import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, CheckCircle2 } from 'lucide-react';

interface SocialPostTemplateProps {
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

const SocialPostTemplate: React.FC<SocialPostTemplateProps> = ({
    date = "2 hrs ago",
    title = "New Update Available",
    content = "We just released a major update to our platform. Check out the new features including dark mode, improved performance, and more!",
    author = "Ant Design",
    qrCode = "https://example.com",
    qrCodeTitle = "Ant Card",
    qrCodeText = "Install Now",
    showIcon = true,
    showDate = true,
    showTitle = true,
    showContent = true,
    showAuthor = true,
    showQRCode = true,
    showPageNum = true,
    pagination = "01",
    icon = "🚀"
}) => {
    return (
        <div className="w-full h-full bg-gray-100 p-6 flex flex-col items-center justify-center font-sans text-gray-900">
            <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {icon}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                <span className="font-bold text-sm text-gray-900">{author}</span>
                                <CheckCircle2 size={14} className="text-blue-500 fill-blue-500 text-white" />
                            </div>
                            {showDate && (
                                <span className="text-xs text-gray-500">{date}</span>
                            )}
                        </div>
                    </div>
                    <MoreHorizontal size={20} className="text-gray-400" />
                </div>

                {/* Content Body */}
                <div className="p-5 bg-gradient-to-b from-white to-gray-50/50 min-h-[200px]">
                    {showTitle && (
                        <h2 className="text-xl font-bold mb-3 text-gray-900 leading-tight">
                            {title}
                        </h2>
                    )}

                    {showContent && (
                        <div className="prose prose-sm prose-blue max-w-none text-gray-700">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                                components={{
                                    p: ({ node, ...props }) => <p className="mb-3 leading-relaxed" {...props} />,
                                    a: ({ node, ...props }) => <span className="text-blue-600 font-medium" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-3 space-y-1" {...props} />,
                                    li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* QR Code Section (Simulating an image attachment or link preview) */}
                {showQRCode && qrCode && (
                    <div className="px-5 pb-2">
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center gap-4 hover:bg-gray-100 transition-colors cursor-pointer">
                            <div className="bg-white p-1 rounded-lg shadow-sm">
                                <QRCodeSVG
                                    value={qrCode}
                                    size={48}
                                    bgColor="#ffffff"
                                    fgColor="#000000"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">{qrCodeTitle}</span>
                                <span className="text-xs text-gray-500">{qrCodeText}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Bar */}
                <div className="p-4 flex items-center justify-between border-t border-gray-50 mt-2">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors cursor-pointer group">
                            <Heart size={22} className="group-hover:fill-red-500 transition-colors" />
                            <span className="text-sm font-medium">1.2k</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors cursor-pointer">
                            <MessageCircle size={22} />
                            <span className="text-sm font-medium">86</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors cursor-pointer">
                            <Share2 size={22} />
                        </div>
                    </div>
                    <Bookmark size={22} className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default SocialPostTemplate;
