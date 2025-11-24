"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCardStore } from "@/store/useCardStore";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import { ASPECT_RATIOS } from "@/config";
import {
  Download,
  ChevronDown,
  FileImage,
  FileType,
  Clipboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { ResizableCard } from "./ResizableCard";
import { TEMPLATE_COMPONENTS } from "./registry";
import { useTranslations } from "next-intl";
import { useCardTheme } from "@/hooks/useCardTheme";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface CardPreviewPanelProps {
  sidePanelCollapsed?: boolean;
  editPanelCollapsed?: boolean;
  previewPanelCollapsed?: boolean;
  toggleSidePanel?: () => void;
  toggleEditPanel?: () => void;
}

export const CardPreviewPanel = ({
  sidePanelCollapsed,
  editPanelCollapsed,
  previewPanelCollapsed,
  toggleSidePanel,
  toggleEditPanel,
}: CardPreviewPanelProps) => {
  const { activeCard, activeCardId, setSelectedEditField, updateCardStyle } = useCardStore();
  const { getCardBackground, getCardTextColor } = useCardTheme();
  const tPreview = useTranslations("cardEditor.preview");
  const previewRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ x: 0, y: 0 });

  const allCards = activeCard?.cards || [];
  const hasMultipleCards = allCards.length > 1;

  // 处理拖拽开始
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setScrollStart({
      x: scrollContainerRef.current.scrollLeft,
      y: scrollContainerRef.current.scrollTop
    });

    e.preventDefault();
  };

  // 处理拖拽移动
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    scrollContainerRef.current.scrollLeft = scrollStart.x - deltaX;
    scrollContainerRef.current.scrollTop = scrollStart.y - deltaY;
  };

  // 处理拖拽结束
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 处理鼠标离开
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // 导出为PNG格式
  const handleExportPNG = async () => {
    try {
      const element = previewRef.current;
      if (!element) return;

      const html2canvas = (await import('html2canvas')).default;

      if (allCards.length > 1) {
        for (let i = 0; i < allCards.length; i++) {
          const canvas = await html2canvas(element, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true,
          });

          const link = document.createElement('a');
          const cardTitle = allCards[i].form.title || '卡片';
          const fileName = `${cardTitle.replace(/[^\w\s-]/g, '')}_${String(i + 1).padStart(2, '0')}.png`;
          link.download = fileName;
          link.href = canvas.toDataURL('image/png');
          link.click();

          if (i < allCards.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }

        toast.success(tPreview("exportSuccess.pngBatch", { count: allCards.length }));
      } else {
        const canvas = await html2canvas(element, {
          backgroundColor: null,
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });

        const link = document.createElement('a');
        link.download = 'card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        toast.success(tPreview("exportSuccess.png"));
      }
    } catch (error) {
      console.error('PNG导出失败:', error);
      toast.error(tPreview("exportError.png"));
    }
  };

  // 导出为JPEG格式
  const handleExportJPEG = async () => {
    try {
      const element = previewRef.current;
      if (!element) return;

      const html2canvas = (await import('html2canvas')).default;

      if (allCards.length > 1) {
        for (let i = 0; i < allCards.length; i++) {
          const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            allowTaint: true,
          });

          const link = document.createElement('a');
          const cardTitle = allCards[i].form.title || '卡片';
          const fileName = `${cardTitle.replace(/[^\w\s-]/g, '')}_${String(i + 1).padStart(2, '0')}.jpg`;
          link.download = fileName;
          link.href = canvas.toDataURL('image/jpeg', 0.9);
          link.click();

          if (i < allCards.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }

        toast.success(tPreview("exportSuccess.jpegBatch", { count: allCards.length }));
      } else {
        const canvas = await html2canvas(element, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });

        const link = document.createElement('a');
        link.download = 'card.jpg';
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();

        toast.success(tPreview("exportSuccess.jpeg"));
      }
    } catch (error) {
      console.error('JPEG导出失败:', error);
      toast.error(tPreview("exportError.jpeg"));
    }
  };

  // 导出为SVG格式
  const handleExportSVG = async () => {
    try {
      const element = previewRef.current;
      if (!element) return;

      const svgData = `
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="600">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml">
              ${element.innerHTML}
            </div>
          </foreignObject>
        </svg>
      `;

      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'card.svg';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      toast.success(tPreview("exportSuccess.svg"));
    } catch (error) {
      console.error('SVG导出失败:', error);
      toast.error(tPreview("exportError.svg"));
    }
  };

  // 复制为PNG到剪贴板
  const handleCopyPNG = async () => {
    try {
      const element = previewRef.current;
      if (!element) return;

      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      canvas.toBlob(async (blob: Blob | null) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          toast.success(tPreview("exportSuccess.copied"));
        }
      }, 'image/png');
    } catch (error) {
      console.error('复制失败:', error);
      toast.error(tPreview("exportError.copy"));
    }
  };

  // 导出为PDF格式
  const handleExportPDF = async () => {
    try {
      const element = previewRef.current;
      if (!element) return;

      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).jsPDF;

      if (allCards.length > 1) {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        for (let i = 0; i < allCards.length; i++) {
          const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            allowTaint: true,
          });

          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          if (i > 0) {
            pdf.addPage();
          }

          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        }

        const cardTitle = allCards[0].form.title || '卡片';
        const fileName = `${cardTitle.replace(/[^\w\s-]/g, '')}_合集.pdf`;
        pdf.save(fileName);

        toast.success(tPreview("exportSuccess.pdfBatch", { count: allCards.length }));
      } else {
        const canvas = await html2canvas(element, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('card.pdf');
        toast.success(tPreview("exportSuccess.pdf"));
      }
    } catch (error) {
      console.error('PDF导出失败:', error);
      toast.error(tPreview("exportError.pdf"));
    }
  };

  if (!allCards.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        {tPreview("noCard")}
      </div>
    );
  }

  const { form, style, switchConfig } = allCards[0];

  // 根据选择的宽高比计算实际尺寸
  const selectedRatio = ASPECT_RATIOS.find(ratio => ratio.id === style.aspectRatio) || ASPECT_RATIOS[0];

  let cardWidth = style.width || selectedRatio.width;
  let cardHeight = style.height;

  if (!cardHeight) {
    if (style.aspectRatio && style.aspectRatio !== "custom") {
      cardHeight = selectedRatio.height || (cardWidth / selectedRatio.ratio);
    }
  }

  // 处理卡片尺寸调整
  const handleCardResize = (newWidth: number, newHeight?: number) => {
    if (activeCardId) {
      updateCardStyle(activeCardId, {
        width: newWidth,
        ...(newHeight ? { height: newHeight } : {}),
      });
    }
  };

  // 渲染单个卡片
  const renderCard = (card: any, index: number) => (
    <motion.div
      key={index}
      ref={index === 0 ? previewRef : undefined}
      className="flex-shrink-0"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div
        className="relative p-6 rounded-2xl"
        style={{
          background: card.style.backgroundType !== 'solid' ? "#f8fafc" : "linear-gradient(180deg, #14b8a6 0%, #3b82f6 100%)",
          width: `${cardWidth + 48}px`,
          height: cardHeight ? `${cardHeight + 48}px` : 'auto',
        }}
      >
        {(() => {
          const TemplateComponent = activeCard?.currentTemplate ? TEMPLATE_COMPONENTS[activeCard.currentTemplate] : null;

          if (TemplateComponent) {
            return (
              <ResizableCard
                width={cardWidth}
                height={cardHeight}
                onResize={handleCardResize}
              >
                <TemplateComponent
                  date={card.form.date}
                  title={card.form.title}
                  content={card.form.content}
                  author={card.form.author}
                  icon={card.form.icon}
                  qrCode={card.form.qrCode}
                  qrCodeTitle={card.form.qrCodeTitle}
                  qrCodeText={card.form.qrCodeText}
                  pagination={card.form.pagination}
                  showIcon={card.switchConfig.showIcon}
                  showDate={card.switchConfig.showDate}
                  showTitle={card.switchConfig.showTitle}
                  showContent={card.switchConfig.showContent}
                  showAuthor={card.switchConfig.showAuthor}
                  showQRCode={card.switchConfig.showQRCode}
                  showPageNum={card.switchConfig.showPageNum}
                  data={card.form}
                  style={card.style}
                  config={card.switchConfig}
                />
              </ResizableCard>
            );
          }

          return (
            <ResizableCard
              width={cardWidth}
              height={cardHeight}
              onResize={handleCardResize}
            >
              <Card
                className="relative overflow-hidden transition-all duration-300 w-full h-full shadow-2xl"
                style={{
                  padding: card.style.padding || "32px",
                  borderRadius: card.style.borderRadius || "16px",
                  textAlign: card.style.align as "left" | "center" | "right",
                  fontFamily: card.style.font,
                  fontSize: `${card.style.fontScale}em`,
                  background: getCardBackground(card.style),
                  color: getCardTextColor(card.style),
                  opacity: card.style.opacity || 1,
                }}
              >
                {/* 渐变背景层 */}
                {card.style.backgroundType === 'gradient' && card.style.gradientClass && (
                  <div
                    className={cn(
                      "absolute inset-0 pointer-events-none",
                      card.style.gradientClass
                    )}
                    style={{ zIndex: 0 }}
                  />
                )}

                {/* 图片背景层 */}
                {card.style.backgroundType === 'image' && card.style.backgroundImage && (
                  <>
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        zIndex: 0,
                        backgroundImage: `url(${card.style.backgroundImage})`,
                        backgroundSize: card.style.backgroundSize || 'cover',
                        backgroundPosition: card.style.backgroundPosition || 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                    {/* 图片背景半透明遮罩，提高文字可读性 */}
                    <div
                      className="absolute inset-0 pointer-events-none bg-black/30"
                      style={{ zIndex: 1 }}
                    />
                  </>
                )}
                <div className="space-y-4 relative z-20">
                  {card.switchConfig.showTitle && (
                    <h2
                      className="font-bold text-2xl break-words cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedEditField('title')}
                    >
                      {card.form.title}
                    </h2>
                  )}
                  {card.switchConfig.showContent && (
                    <div
                      className="cursor-pointer hover:opacity-80 transition-opacity markdown-content"
                      onClick={() => setSelectedEditField('content')}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                      >
                        {card.form.content}
                      </ReactMarkdown>
                    </div>
                  )}
                  {card.switchConfig.showAuthor && (
                    <div
                      className="text-sm opacity-70 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedEditField('author')}
                    >
                      — {card.form.author}
                    </div>
                  )}
                  {card.switchConfig.showQRCode && card.form.qrCode && (
                    <div className="flex justify-center mt-4">
                      <QRCodeSVG
                        value={card.form.qrCode}
                        size={64}
                        bgColor="transparent"
                        fgColor="#374151"
                      />
                    </div>
                  )}
                </div>
              </Card>
            </ResizableCard>
          );
        })()}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full overflow-y-auto flex flex-col bg-gray-50 dark:bg-neutral-900"
    >
      {/* 工具栏 */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100">
            {tPreview("title")}
          </h2>

          {hasMultipleCards && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                {tPreview("totalCards")} {allCards.length} {tPreview("cards")}
              </span>
              <span className="text-xs text-blue-700 dark:text-blue-300">
                {tPreview("dragToView")}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Download className="h-4 w-4" />
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleExportPNG}>
                      <FileImage className="h-4 w-4 mr-2" />
                      {tPreview("export.png")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportJPEG}>
                      <FileImage className="h-4 w-4 mr-2" />
                      {tPreview("export.jpeg")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportSVG}>
                      <FileType className="h-4 w-4 mr-2" />
                      {tPreview("export.svg")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportPDF}>
                      <FileType className="h-4 w-4 mr-2" />
                      {tPreview("export.pdf")}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleCopyPNG}>
                      <Clipboard className="h-4 w-4 mr-2" />
                      {tPreview("export.copyPng")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{tPreview("export.tooltip")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* 预览区域 */}
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex-1 overflow-auto",
          hasMultipleCards ? "cursor-grab" : "",
          isDragging ? "cursor-grabbing" : ""
        )}
        onMouseDown={hasMultipleCards ? handleMouseDown : undefined}
        onMouseMove={hasMultipleCards ? handleMouseMove : undefined}
        onMouseUp={hasMultipleCards ? handleMouseUp : undefined}
        onMouseLeave={hasMultipleCards ? handleMouseLeave : undefined}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div className={cn(
          "flex items-center justify-center p-8",
          hasMultipleCards ? "flex-row gap-8 min-w-max" : "min-h-full"
        )}>
          {hasMultipleCards ? (
            allCards.map((card, index) => renderCard(card, index))
          ) : (
            renderCard(allCards[0], 0)
          )}
        </div>
      </div>
    </motion.div>
  );
};