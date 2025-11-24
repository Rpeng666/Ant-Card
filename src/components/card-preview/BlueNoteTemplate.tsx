import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

interface BlueNoteTemplateProps {
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

const BlueNoteTemplate: React.FC<BlueNoteTemplateProps> = ({
    date = "2025年7月30日",
    title = "汗水滴在奋斗路上的声音",
    content = "💡 **汗水滴在奋斗路上的声音，和银行卡到账提示音很像，现在磨破的嘴皮，都是未来的财富密码。**",
    author = "生财青年俱乐部",
    qrCode = "https://example.com",
    qrCodeTitle = "Ant Card",
    qrCodeText = "扫描二维码",
    showIcon = true,
    showDate = true,
    showTitle = false,
    showContent = true,
    showAuthor = true,
    showQRCode = true,
    showPageNum = true,
    pagination = "01",
    icon = "💎"
}) => {
    return (
        <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 p-8 flex flex-col items-center justify-center font-sans">
            <div className="w-full bg-white rounded-3xl shadow-2xl p-8 flex flex-col relative min-h-[400px]">

                {/* Top Icon */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-2xl shadow-lg text-blue-500">
                    {showIcon && <div className="text-2xl">{icon}</div>}
                </div>

                {/* Header */}
                <div className="mt-6 text-center mb-6">
                    {showAuthor && (
                        <div className="text-sm font-bold text-blue-600 mb-1">
                            {author}
                        </div>
                    )}
                    {showDate && (
                        <div className="text-xs text-gray-400">
                            {date}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col justify-center items-center text-center">
                    {showTitle && (
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            {title}
                        </h2>
                    )}

                    {showContent && (
                        <div className="prose prose-lg max-w-none text-gray-800">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                                components={{
                                    p: ({ node, ...props }) => <p className="mb-4 leading-relaxed font-medium" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-xs text-gray-400 italic">
                        —— {author}
                    </div>

                    {showQRCode && qrCode && (
                        <div className="opacity-30 hover:opacity-100 transition-opacity">
                            <QRCodeSVG
                                value={qrCode}
                                size={32}
                                bgColor="#ffffff"
                                fgColor="#000000"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Caption */}
            <div className="mt-6 text-white/90 text-sm font-medium text-center max-w-xs leading-relaxed drop-shadow-md">
                {showTitle ? title : (content.length > 50 ? content.substring(0, 50) + "..." : content.replace(/\*\*/g, ''))}
            </div>
        </div>
    );
};

export default BlueNoteTemplate;
