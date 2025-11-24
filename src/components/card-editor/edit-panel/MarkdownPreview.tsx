import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { cn } from "@/lib/utils";

interface MarkdownPreviewProps {
    content: string;
    selectedEditField: string | null;
}

export const MarkdownPreview = memo(({ content, selectedEditField }: MarkdownPreviewProps) => {
    return (
        <div
            className={cn(
                "border rounded-lg p-4 min-h-[120px] bg-background transition-all duration-200 markdown-content",
                selectedEditField === 'content' && "ring-2 ring-primary/50 bg-primary/5"
            )}
            style={{
                fontSize: '14px',
                lineHeight: '1.6'
            }}
        >
            {content ? (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                        // 优化代码块渲染性能
                        code({ node, inline, className, children, ...props }) {
                            return <code className={className} {...props}>{children}</code>;
                        }
                    }}
                >
                    {content}
                </ReactMarkdown>
            ) : (
                <p className="text-muted-foreground text-sm">在编辑模式下输入内容以预览效果...</p>
            )}
        </div>
    );
});

MarkdownPreview.displayName = 'MarkdownPreview';
