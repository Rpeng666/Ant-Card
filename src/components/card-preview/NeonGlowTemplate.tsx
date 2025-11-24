import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';

interface NeonGlowTemplateProps {
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

const NeonGlowTemplate: React.FC<NeonGlowTemplateProps> = ({
    date = "2025.08.25",
    title = "Neon Thoughts",
    content = "和 claude code 改了屎山，最后用这个提示词拯救了我：\n\n调用相关 agents 分析思考找到原因，或者考虑重构代码，我们可能把一些东西复杂化了，思考一下",
    author = "魔王哒",
    qrCode = "https://example.com",
    qrCodeTitle = "Ant Card",
    qrCodeText = "Scan Me",
    showIcon = true,
    showDate = true,
    showTitle = false,
    showContent = true,
    showAuthor = true,
    showQRCode = true,
    showPageNum = true,
    pagination = "80",
    icon = "✨"
}) => {
    return (
        <div className="w-full h-full bg-[#0f1115] p-8 flex flex-col items-center justify-center font-sans">
            {/* Main Card Container with Glow */}
            <div className="relative w-full max-w-md group">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative w-full bg-[#161b22] rounded-2xl p-8 border border-white/10 shadow-2xl flex flex-col min-h-[400px]">

                    {/* Content Centered */}
                    <div className="flex-grow flex flex-col justify-center items-center text-center z-10">
                        {showContent && (
                            <div className="prose prose-invert prose-lg max-w-none">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeHighlight]}
                                    components={{
                                        p: ({ node, ...props }) => <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-200 tracking-wide" {...props} />,
                                        strong: ({ node, ...props }) => <strong className="text-cyan-400 font-bold" {...props} />,
                                    }}
                                >
                                    {content}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>

                    {/* Footer Info */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                            {showAuthor && (
                                <span className="text-gray-400 font-medium">是{author}</span>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            {showPageNum && (
                                <span className="font-mono text-xs opacity-50">字数:{pagination}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NeonGlowTemplate;
