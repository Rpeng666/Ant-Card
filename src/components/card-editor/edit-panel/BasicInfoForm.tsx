import React, { useRef, useState, useEffect } from "react";
import {
    FileText,
    Hash,
    User,
    Calendar,
    Eye,
    Edit3,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CardForm } from "@/types/template";
import { MarkdownPreview } from "./MarkdownPreview";
import { MarkdownToolbar } from "./MarkdownToolbar";
import { ImageInsertDialog } from "./ImageInsertDialog";

interface BasicInfoFormProps {
    form: CardForm;
    selectedEditField: string | null;
    onUpdate: (field: string, value: any) => void;
    onClearSelection: () => void;
    isExpanded: boolean;
}

export const BasicInfoForm = ({
    form,
    selectedEditField,
    onUpdate,
    onClearSelection,
    isExpanded
}: BasicInfoFormProps) => {
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [imageDialogOpen, setImageDialogOpen] = useState(false);

    const titleInputRef = useRef<HTMLInputElement>(null);
    const contentInputRef = useRef<HTMLTextAreaElement>(null);
    const authorInputRef = useRef<HTMLInputElement>(null);
    const dateInputRef = useRef<HTMLInputElement>(null);

    // Handle focus when selectedEditField changes and section is expanded
    useEffect(() => {
        if (!isExpanded || !selectedEditField) return;

        const timer = setTimeout(() => {
            switch (selectedEditField) {
                case 'title':
                    titleInputRef.current?.focus();
                    break;
                case 'content':
                    contentInputRef.current?.focus();
                    break;
                case 'author':
                    authorInputRef.current?.focus();
                    break;
                case 'date':
                    dateInputRef.current?.focus();
                    break;
            }
            if (['title', 'content', 'author', 'date'].includes(selectedEditField)) {
                onClearSelection();
            }
        }, 250);

        return () => clearTimeout(timer);
    }, [selectedEditField, isExpanded, onClearSelection]);

    const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
        const textarea = contentInputRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end) || placeholder;
        const newText = before + selectedText + after;

        const newCursorPos = start + before.length + selectedText.length;

        onUpdate("content",
            textarea.value.substring(0, start) + newText + textarea.value.substring(end)
        );

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const handleInsertImage = (url: string, alt: string) => {
        const textarea = contentInputRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const altText = alt.trim() || '图片';
        const imageMarkdown = `![${altText}](${url.trim()})`;

        const newContent =
            textarea.value.substring(0, start) +
            imageMarkdown +
            textarea.value.substring(end);

        onUpdate("content", newContent);

        const newCursorPos = start + imageMarkdown.length;
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    return (
        <div className="p-6 space-y-6">
            {/* 标题 */}
            <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                    <Hash className="w-4 h-4 text-gray-400" />
                    标题
                </Label>
                <Input
                    ref={titleInputRef}
                    value={form.title}
                    onChange={(e) => onUpdate("title", e.target.value)}
                    placeholder="请输入卡片标题"
                    className={cn(
                        "transition-all duration-200 focus:ring-2 focus:ring-primary/20",
                        selectedEditField === 'title' && "ring-2 ring-primary/50 bg-primary/5"
                    )}
                />
            </div>

            {/* 内容 */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        内容
                    </Label>
                    <div className="flex items-center gap-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                                        className={cn(
                                            "h-8 px-2 text-xs",
                                            isPreviewMode ? "bg-primary/10 text-primary" : "text-muted-foreground"
                                        )}
                                    >
                                        {isPreviewMode ? <Edit3 className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                                        {isPreviewMode ? "编辑" : "预览"}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{isPreviewMode ? "切换到编辑模式" : "切换到预览模式"}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                {/* Markdown工具栏 */}
                {!isPreviewMode && (
                    <MarkdownToolbar
                        onInsertMarkdown={insertMarkdown}
                        onOpenImageDialog={() => setImageDialogOpen(true)}
                    />
                )}

                <ImageInsertDialog
                    open={imageDialogOpen}
                    onOpenChange={setImageDialogOpen}
                    onInsert={handleInsertImage}
                />

                {/* 编辑模式 */}
                {!isPreviewMode ? (
                    <textarea
                        ref={contentInputRef}
                        value={form.content}
                        onChange={(e) => onUpdate("content", e.target.value)}
                        onInput={(e) => {
                            requestAnimationFrame(() => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = target.scrollHeight + 'px';
                            });
                        }}
                        placeholder="请输入卡片内容，支持Markdown语法..."
                        className={cn(
                            "transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none font-mono text-sm min-h-[120px] w-full p-3 border rounded-md bg-background",
                            selectedEditField === 'content' && "ring-2 ring-primary/50 bg-primary/5"
                        )}
                        style={{
                            height: 'auto',
                            minHeight: '120px'
                        }}
                    />
                ) : (
                    <MarkdownPreview
                        content={form.content}
                        selectedEditField={selectedEditField}
                    />
                )}
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
                {/* 作者 */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        作者
                    </Label>
                    <Input
                        ref={authorInputRef}
                        value={form.author}
                        onChange={(e) => onUpdate("author", e.target.value)}
                        placeholder="作者名称"
                        className={cn(
                            "transition-all duration-200 focus:ring-2 focus:ring-primary/20",
                            selectedEditField === 'author' && "ring-2 ring-primary/50 bg-primary/5"
                        )}
                    />
                </div>

                {/* 日期 */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        日期
                    </Label>
                    <Input
                        ref={dateInputRef}
                        value={form.date}
                        onChange={(e) => onUpdate("date", e.target.value)}
                        placeholder="日期"
                        className={cn(
                            "transition-all duration-200 focus:ring-2 focus:ring-primary/20",
                            selectedEditField === 'date' && "ring-2 ring-primary/50 bg-primary/5"
                        )}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* 图标 */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium">图标</Label>
                    <Input
                        value={form.icon}
                        onChange={(e) => onUpdate("icon", e.target.value)}
                        placeholder="emoji或图标"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                {/* 页码 */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium">页码</Label>
                    <Input
                        value={form.pagination}
                        onChange={(e) => onUpdate("pagination", e.target.value)}
                        placeholder="例如: 01"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                </div>
            </div>
        </div>
    );
};
