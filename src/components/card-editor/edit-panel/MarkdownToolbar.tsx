import React from "react";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Code,
    Link,
    Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface MarkdownToolbarProps {
    onInsertMarkdown: (before: string, after?: string, placeholder?: string) => void;
    onOpenImageDialog: () => void;
}

export const MarkdownToolbar = ({ onInsertMarkdown, onOpenImageDialog }: MarkdownToolbarProps) => {
    const markdownActions = [
        {
            icon: Bold,
            label: "加粗",
            action: () => onInsertMarkdown('**', '**', '加粗文本'),
            shortcut: "Ctrl+B"
        },
        {
            icon: Italic,
            label: "斜体",
            action: () => onInsertMarkdown('*', '*', '斜体文本'),
            shortcut: "Ctrl+I"
        },
        {
            icon: Code,
            label: "行内代码",
            action: () => onInsertMarkdown('`', '`', 'code'),
            shortcut: "Ctrl+`"
        },
        {
            icon: List,
            label: "无序列表",
            action: () => onInsertMarkdown('- ', '', '列表项'),
            shortcut: "Ctrl+U"
        },
        {
            icon: ListOrdered,
            label: "有序列表",
            action: () => onInsertMarkdown('1. ', '', '列表项'),
            shortcut: "Ctrl+O"
        },
        {
            icon: Quote,
            label: "引用",
            action: () => onInsertMarkdown('> ', '', '引用文本'),
            shortcut: "Ctrl+Q"
        },
        {
            icon: Link,
            label: "链接",
            action: () => onInsertMarkdown('[', '](https://example.com)', '链接文本'),
            shortcut: "Ctrl+K"
        },
        {
            icon: Image,
            label: "图片",
            action: onOpenImageDialog,
            shortcut: "Ctrl+Shift+I"
        }
    ];

    return (
        <div className="border rounded-lg p-2 bg-muted/30">
            <div className="flex flex-wrap gap-1">
                {markdownActions.map((action, index) => (
                    <TooltipProvider key={index}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={action.action}
                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    title={`${action.label} (${action.shortcut})`}
                                >
                                    <action.icon className="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">{action.label}</p>
                                <p className="text-xs text-muted-foreground">{action.shortcut}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </div>
        </div>
    );
};
