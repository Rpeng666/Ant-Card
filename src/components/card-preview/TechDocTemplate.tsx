import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';
import { Terminal, Code2, Cpu, FileCode } from 'lucide-react';

interface TechDocTemplateProps {
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

const TechDocTemplate: React.FC<TechDocTemplateProps> = ({
    date = "2025年8月25日",
    title = "如何充分发挥GPT-5的打码能力",
    content = "GPT-5 for Coding\n\n尽管功能强大，但使用GPT-5进行提示与其他模型可能有所不同。以下是通过API或在你的编码工具中充分利用它的技巧。\n\n1. **提供上下文**：GPT-5需要了解你的项目结构。\n2. **明确指令**：告诉它你想要什么，而不是不想要什么。\n3. **迭代优化**：不要期望一次完美，通过对话完善代码。",
    author = "官方发布",
    qrCode = "https://example.com",
    qrCodeTitle = "Ant Card",
    qrCodeText = "扫码阅读全文",
    showIcon = true,
    showDate = true,
    showTitle = true,
    showContent = true,
    showAuthor = true,
    showQRCode = true,
    showPageNum = true,
    pagination = "01",
    icon = "🤖"
}) => {
    return (
        <div className="w-full h-full bg-[#f0f4f8] p-6 flex flex-col items-center justify-center font-sans text-slate-800">
            <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-slate-200">
                {/* Header Image/Banner Area */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 flex flex-col items-center justify-center border-b border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Code2 size={120} />
                    </div>

                    {showDate && (
                        <div className="text-xs font-medium text-slate-500 mb-4 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
                            {date}
                        </div>
                    )}

                    {showTitle && (
                        <h1 className="text-2xl md:text-3xl font-bold text-center text-slate-900 leading-tight max-w-md z-10">
                            {title}
                        </h1>
                    )}

                    {showIcon && (
                        <div className="mt-6 bg-white p-3 rounded-xl shadow-sm border border-slate-100 z-10">
                            <div className="text-3xl">{icon}</div>
                        </div>
                    )}
                </div>

                {/* Content Body */}
                <div className="flex-grow p-8 bg-white">
                    {showContent && (
                        <div className="prose prose-slate prose-sm max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                                components={{
                                    h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-4 text-slate-900" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-3 text-slate-800 border-l-4 border-blue-500 pl-3" {...props} />,
                                    p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-slate-600" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-2 text-slate-600" {...props} />,
                                    li: ({ node, ...props }) => <li className="" {...props} />,
                                    code: ({ node, ...props }) => <code className="bg-slate-100 text-blue-600 px-1.5 py-0.5 rounded text-xs font-mono" {...props} />,
                                    pre: ({ node, ...props }) => <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto mb-4 text-xs" {...props} />,
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {showAuthor && (
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-400 uppercase tracking-wider">Author</span>
                                <span className="text-sm font-bold text-slate-700">{author}</span>
                            </div>
                        )}
                    </div>

                    {showQRCode && qrCode && (
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <span className="text-xs font-bold text-slate-700 block">{qrCodeTitle}</span>
                                <span className="text-[10px] text-slate-400">{qrCodeText}</span>
                            </div>
                            <div className="bg-white p-1 rounded border border-slate-200">
                                <QRCodeSVG
                                    value={qrCode}
                                    size={40}
                                    bgColor="#ffffff"
                                    fgColor="#334155"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TechDocTemplate;
