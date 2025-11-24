import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';
import { Terminal, Cpu, Wifi } from 'lucide-react';

interface CyberpunkTemplateProps {
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

const CyberpunkTemplate: React.FC<CyberpunkTemplateProps> = ({
    date = "2077-10-12",
    title = "SYSTEM_OVERRIDE",
    content = "Wake up, Samurai. We have a city to burn. The digital frontier is not just a place, it's a state of mind.",
    author = "V",
    qrCode = "https://example.com",
    qrCodeTitle = "NET_LINK",
    qrCodeText = "SCAN_TO_CONNECT",
    showIcon = true,
    showDate = true,
    showTitle = true,
    showContent = true,
    showAuthor = true,
    showQRCode = true,
    showPageNum = true,
    pagination = "01",
    icon = "⚡"
}) => {
    return (
        <div className="w-full h-full bg-[#050505] p-6 flex flex-col relative overflow-hidden font-mono text-cyan-400 selection:bg-cyan-900 selection:text-white">
            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Glow effects */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70 blur-[2px]" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 border-b border-cyan-900/50 pb-4 mb-6 flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-cyan-700">
                        <Terminal size={12} />
                        <span>TERMINAL_v2.0</span>
                    </div>
                    {showTitle && (
                        <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                            {title}
                        </h1>
                    )}
                </div>
                {showDate && (
                    <div className="text-xs text-purple-400 font-bold tracking-widest border border-purple-900/50 px-2 py-1 rounded bg-purple-900/10">
                        {date}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="relative z-10 flex-grow">
                {showContent && (
                    <div className="prose prose-invert prose-p:text-cyan-100/80 prose-headings:text-cyan-300 max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                p: ({ node, ...props }) => <p className="leading-relaxed mb-4 text-sm md:text-base shadow-black drop-shadow-sm" {...props} />,
                                strong: ({ node, ...props }) => <strong className="text-purple-400 font-bold" {...props} />,
                                code: ({ node, ...props }) => <code className="bg-cyan-950/50 text-cyan-300 px-1 py-0.5 rounded text-xs border border-cyan-900/30" {...props} />,
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="relative z-10 mt-auto pt-6 border-t border-cyan-900/50 flex items-end justify-between">
                <div className="flex flex-col gap-2">
                    {showAuthor && (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm font-bold text-cyan-600">USER: <span className="text-cyan-300">{author}</span></span>
                        </div>
                    )}
                    <div className="flex gap-3 text-cyan-800">
                        <Cpu size={16} />
                        <Wifi size={16} />
                        <span className="text-xs font-mono">SYS_ONLINE</span>
                    </div>
                </div>

                {showQRCode && qrCode && (
                    <div className="flex items-center gap-3 bg-cyan-950/30 p-2 rounded border border-cyan-900/30 backdrop-blur-sm">
                        <div className="bg-white p-1 rounded-sm">
                            <QRCodeSVG
                                value={qrCode}
                                size={48}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="L"
                            />
                        </div>
                        <div className="flex flex-col justify-center h-full">
                            <span className="text-[10px] text-cyan-500 font-bold tracking-wider block mb-1">{qrCodeTitle}</span>
                            <span className="text-[8px] text-cyan-700">{qrCodeText}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />
        </div>
    );
};

export default CyberpunkTemplate;
