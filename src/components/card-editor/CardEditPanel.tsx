"use client";
import React, { useState, useRef, useEffect, memo } from "react";
import {
  Pencil,
  FileText,
  User,
  Calendar,
  Hash,
  QrCode,
  Settings,
  ChevronDown,
  ChevronRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Eye,
  Edit3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useCardStore } from "@/store/useCardStore";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// 独立的预览组件，使用 memo 优化性能
const MarkdownPreview = memo(({ content, selectedEditField }: { content: string; selectedEditField: string | null }) => {
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
            code({node, inline, className, children, ...props}) {
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

export const CardEditPanel = () => {
  const { activeCard, activeCardId, updateCardForm, selectedEditField, setSelectedEditField } = useCardStore();
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    qrcode: false,
    other: false,
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  // 创建输入框的引用
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const authorInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const currentCard = activeCard?.cards?.[0];

  // 防抖定时器引用
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  // Markdown工具函数
  const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = contentInputRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end) || placeholder;
    const newText = before + selectedText + after;

    const newCursorPos = start + before.length + selectedText.length;

    handleFormUpdate("content",
      textarea.value.substring(0, start) + newText + textarea.value.substring(end)
    );

    // 设置新的光标位置
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // 插入图片
  const insertImage = () => {
    if (!imageUrl.trim()) return;

    const textarea = contentInputRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const altText = imageAlt.trim() || '图片';
    const imageMarkdown = `![${altText}](${imageUrl.trim()})`;

    const newContent =
      textarea.value.substring(0, start) +
      imageMarkdown +
      textarea.value.substring(end);

    handleFormUpdate("content", newContent);

    // 关闭对话框并重置状态
    setImageDialogOpen(false);
    setImageUrl('');
    setImageAlt('');

    // 设置新的光标位置
    const newCursorPos = start + imageMarkdown.length;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // Markdown快捷操作
  const markdownActions = [
    {
      icon: Bold,
      label: "加粗",
      action: () => insertMarkdown('**', '**', '加粗文本'),
      shortcut: "Ctrl+B"
    },
    {
      icon: Italic,
      label: "斜体",
      action: () => insertMarkdown('*', '*', '斜体文本'),
      shortcut: "Ctrl+I"
    },
    {
      icon: Code,
      label: "行内代码",
      action: () => insertMarkdown('`', '`', 'code'),
      shortcut: "Ctrl+`"
    },
    {
      icon: List,
      label: "无序列表",
      action: () => insertMarkdown('- ', '', '列表项'),
      shortcut: "Ctrl+U"
    },
    {
      icon: ListOrdered,
      label: "有序列表",
      action: () => insertMarkdown('1. ', '', '列表项'),
      shortcut: "Ctrl+O"
    },
    {
      icon: Quote,
      label: "引用",
      action: () => insertMarkdown('> ', '', '引用文本'),
      shortcut: "Ctrl+Q"
    },
    {
      icon: Link,
      label: "链接",
      action: () => insertMarkdown('[', '](https://example.com)', '链接文本'),
      shortcut: "Ctrl+K"
    },
    {
      icon: Image,
      label: "图片",
      action: () => setImageDialogOpen(true),
      shortcut: "Ctrl+Shift+I"
    }
  ];

  // 根据选中的编辑字段自动展开对应区域并聚焦
  useEffect(() => {
    if (selectedEditField) {
      if (selectedEditField === 'title' || selectedEditField === 'content' || selectedEditField === 'author' || selectedEditField === 'date') {
        setExpandedSections(prev => ({ ...prev, basic: true }));

        // 等待动画完成后再聚焦
        setTimeout(() => {
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
          // 清除选中状态
          setSelectedEditField(null);
        }, 250);
      }
    }
  }, [selectedEditField, setSelectedEditField]);

  // 清理防抖定时器
  useEffect(() => {
    return () => {
      // 组件卸载时清除所有定时器
      Object.values(debounceTimers.current).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  if (!currentCard || !activeCardId) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <FileText className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg font-medium">请选择一个卡片进行编辑</p>
        <p className="text-gray-400 text-sm mt-2">从左侧模板面板选择或创建新卡片</p>
      </div>
    );
  }

  const handleFormUpdate = (field: string, value: string | number) => {
    if (activeCardId) {
      // 对于内容字段使用较短的防抖时间，其他字段立即更新
      const delay = field === 'content' ? 100 : 0;

      if (delay === 0) {
        // 立即更新非内容字段
        updateCardForm(activeCardId, { [field]: value });
      } else {
        // 对内容字段使用防抖
        if (debounceTimers.current[field]) {
          clearTimeout(debounceTimers.current[field]);
        }

        debounceTimers.current[field] = setTimeout(() => {
          updateCardForm(activeCardId, { [field]: value });
        }, delay);
      }
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  function SectionHeader({
    icon: Icon,
    title,
    section,
    description
  }: {
    icon: any,
    title: string,
    section: keyof typeof expandedSections,
    description?: string
  }) {
    return (
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-between p-4 h-auto",
          "hover:bg-gray-50 dark:hover:bg-neutral-800/50",
          "border-b border-gray-100 dark:border-neutral-800"
        )}
        onClick={() => toggleSection(section)}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            "bg-primary/10 text-primary"
          )}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="font-medium text-sm">{title}</div>
            {description && (
              <div className="text-xs text-gray-500 dark:text-gray-400">{description}</div>
            )}
          </div>
        </div>
        {expandedSections[section] ? (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        )}
      </Button>
    );
  }



  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="h-full overflow-y-auto"
      >

        <div className="space-y-0">
          {/* 基础信息 */}
          <Card className="rounded-none border-x-0 border-t-0">
            <SectionHeader
              icon={FileText}
              title="基础信息"
              section="basic"
              description="编辑卡片的标题、内容等基本信息"
            />
            <AnimatePresence>
              {expandedSections.basic && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <CardContent className="p-6 space-y-6">
                    {/* 标题 */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Hash className="w-4 h-4 text-gray-400" />
                        标题
                      </Label>
                      <Input
                        ref={titleInputRef}
                        value={currentCard.form.title}
                        onChange={(e) => handleFormUpdate("title", e.target.value)}
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

                      {/* Markdown工具栏 - 仅在编辑模式下显示 */}
                      {!isPreviewMode && (
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
                      )}

                      {/* 图片插入对话框 */}
                      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>插入图片</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="image-url">图片URL</Label>
                              <Input
                                id="image-url"
                                placeholder="https://example.com/image.jpg"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="w-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="image-alt">图片描述 (可选)</Label>
                              <Input
                                id="image-alt"
                                placeholder="输入图片描述"
                                value={imageAlt}
                                onChange={(e) => setImageAlt(e.target.value)}
                                className="w-full"
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setImageDialogOpen(false);
                                  setImageUrl('');
                                  setImageAlt('');
                                }}
                              >
                                取消
                              </Button>
                              <Button
                                onClick={insertImage}
                                disabled={!imageUrl.trim()}
                              >
                                插入图片
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* 编辑模式 */}
                      {!isPreviewMode ? (
                        <textarea
                          ref={contentInputRef}
                          value={currentCard.form.content}
                          onChange={(e) => {
                            handleFormUpdate("content", e.target.value);
                          }}
                          onInput={(e) => {
                            // 自动调整高度，使用 requestAnimationFrame 优化性能
                            requestAnimationFrame(() => {
                              e.target.style.height = 'auto';
                              e.target.style.height = e.target.scrollHeight + 'px';
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
                          content={currentCard.form.content}
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
                          value={currentCard.form.author}
                          onChange={(e) => handleFormUpdate("author", e.target.value)}
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
                          value={currentCard.form.date}
                          onChange={(e) => handleFormUpdate("date", e.target.value)}
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
                          value={currentCard.form.icon}
                          onChange={(e) => handleFormUpdate("icon", e.target.value)}
                          placeholder="emoji或图标"
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      {/* 页码 */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">页码</Label>
                        <Input
                          value={currentCard.form.pagination}
                          onChange={(e) => handleFormUpdate("pagination", e.target.value)}
                          placeholder="例如: 01"
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* 二维码设置 */}
          <Card className="rounded-none border-x-0 border-t-0">
            <SectionHeader
              icon={QrCode}
              title="二维码设置"
              section="qrcode"
              description="配置卡片中的二维码信息"
            />
            <AnimatePresence>
              {expandedSections.qrcode && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <CardContent className="p-6 space-y-6">
                    {/* 二维码标题 */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">二维码标题</Label>
                      <Input
                        value={currentCard.form.qrCodeTitle}
                        onChange={(e) => handleFormUpdate("qrCodeTitle", e.target.value)}
                        placeholder="请输入二维码标题"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    {/* 二维码文本 */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">二维码文本</Label>
                      <Input
                        value={currentCard.form.qrCodeText}
                        onChange={(e) => handleFormUpdate("qrCodeText", e.target.value)}
                        placeholder="请输入二维码下方文本"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    {/* 二维码链接 */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">二维码链接</Label>
                      <Input
                        value={currentCard.form.qrCode}
                        onChange={(e) => handleFormUpdate("qrCode", e.target.value)}
                        placeholder="请输入二维码链接"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* 其他设置 */}
          <Card className="rounded-none border-x-0 border-t-0">
            <SectionHeader
              icon={Settings}
              title="其他设置"
              section="other"
              description="字数统计等其他配置选项"
            />
            <AnimatePresence>
              {expandedSections.other && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {/* 字数统计标签 */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">字数统计标签</Label>
                        <Input
                          value={currentCard.form.textCount}
                          onChange={(e) => handleFormUpdate("textCount", e.target.value)}
                          placeholder="例如: 字数"
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      {/* 字数统计数值 */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">字数统计数值</Label>
                        <Input
                          type="number"
                          value={currentCard.form.textCountNum}
                          onChange={(e) => handleFormUpdate("textCountNum", parseInt(e.target.value) || 0)}
                          placeholder="请输入字数"
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </motion.div>
    </>
  );
};