import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';
import { Calendar, Clock, FileText, User } from 'lucide-react';

interface FeatureCoverTemplateProps {
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

const FeatureCoverTemplate: React.FC<FeatureCoverTemplateProps> = ({
    date = "2025年8月21日",
    title = "故事模板第一个布局隐藏头像、作者、签名、水印、页码和二维码",
    content = "本文字段左边有一个竖线条，这是引用样式，只需要在段首输入一个大于号加一个空格即可设置成引用的样式。\n\n生活就像一盒巧克力，你永远不知道下一颗是什么味道。",
    author = "Ant Card",
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
    icon = "🌊"
}) => {
    return (
        <div className="w-full h-full bg-gray-100 p-6 flex flex-col items-center justify-center font-sans text-gray-800">
            <div className="w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
                {/* Cover Image Area */}
                <div className="h-2/5 bg-slate-200 relative overflow-hidden group">
                    {/* Placeholder for cover image - using a gradient/pattern if no image provided, but ideally this template uses the card's background image if set */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-indigo-600 opacity-80" />
                    <img
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop"
                        alt="Cover"
                        className="w-full h-full object-cover mix-blend-overlay opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {showIcon && (
                        <div className="absolute bottom-4 left-6 text-4xl text-white drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
                            {icon}
                        </div>
                    )}
                </div>

                {/* Content Area */}
                <div className="flex-grow p-6 flex flex-col">
                    {showTitle && (
                        <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-snug line-clamp-3">
                            {title}
                        </h1>
                    )}

                    {/* Meta Tags */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        {showDate && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                <Calendar size={12} />
                                <span>{date}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                            <Clock size={12} />
                            <span>5分钟阅读</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                            <FileText size={12} />
                            <span>{content.length}字</span>
                        </div>
                    </div>

                    {showContent && (
                        <div className="prose prose-sm max-w-none text-gray-600 flex-grow overflow-hidden">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                                components={{
                                    p: ({ node, ...props }) => <p className="mb-3 leading-relaxed line-clamp-6" {...props} />,
                                    blockquote: ({ node, ...props }) => (
                                        <blockquote className="border-l-4 border-indigo-500 pl-4 py-1 my-4 bg-indigo-50 rounded-r-lg text-indigo-800 italic" {...props} />
                                    ),
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {(showAuthor || showQRCode) && (
                    <div className="p-6 pt-0 flex items-center justify-between mt-auto">
                        {showAuthor && (
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                    <User size={16} />
                                </div>
                                <span className="text-sm font-medium text-gray-700">{author}</span>
                            </div>
                        )}

                        {showQRCode && qrCode && (
                            <QRCodeSVG
                                value={qrCode}
                                size={48}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                className="p-1 bg-white rounded border border-gray-100"
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeatureCoverTemplate;
