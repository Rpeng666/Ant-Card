"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layout,
  Type,
  SpaceIcon,
  Palette,
  Zap,
  Maximize,
  ChevronDown,
  ChevronRight,
  Layers,
  Sliders,
  Eye,
  Sparkles,
  Image,
  Wand2
} from "lucide-react";
import debounce from "lodash/debounce";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCardStore } from "@/store/useCardStore";
import { cn } from "@/lib/utils";
import { ASPECT_RATIOS, DEFAULT_TEMPLATES } from "@/config";
import { splitText, previewSplit } from "@/utils/textSplitter";
import { CardEditorGradientSelector } from "./GradientSelector";
import { AIImageSearch } from "./AIImageSearch";

export const CardSidePanel = () => {
  const t = useTranslations("workbench");
  const tCard = useTranslations("cardEditor.sidePanel");
  const { activeCard, activeCardId, updateCardStyle, updateCardSwitchConfig, updateCardTemplate, updateCardForm, addCardToExport, mergeCardsInExport } = useCardStore();
  
  // 字体和对齐选项
  const fontOptions = [
    { value: "sans", label: tCard("fontOptions.sans") },
    { value: "serif", label: tCard("fontOptions.serif") },
    { value: "mono", label: tCard("fontOptions.mono") },
  ];

  const alignOptions = [
    { value: "left", label: tCard("alignOptions.left") },
    { value: "center", label: tCard("alignOptions.center") },
    { value: "right", label: tCard("alignOptions.right") },
  ];
  
  // 折叠状态管理
  const [expandedSections, setExpandedSections] = useState({
    template: false,
    layout: false,
    style: false,
    advanced: false,
  });

  // 本地状态管理，用于即时反馈
  const [localFontScale, setLocalFontScale] = useState<number | null>(null);

  const allCards = activeCard?.cards || [];
  const currentCard = allCards[0];
  const hasMultipleCards = allCards.length > 1;

  // 计算拆分预览信息
  const splitPreview = useMemo(() => {
    if (!currentCard?.switchConfig.enableTextSplit || !currentCard?.form.content) {
      return null;
    }
    
    return previewSplit(currentCard.form.content, {
      maxCharsPerCard: currentCard.switchConfig.maxCharsPerCard || 200,
      splitMode: currentCard.switchConfig.splitMode || "paragraph"
    });
  }, [
    currentCard?.switchConfig.enableTextSplit,
    currentCard?.switchConfig.maxCharsPerCard,
    currentCard?.switchConfig.splitMode,
    currentCard?.form.content
  ]);

  // 处理拆分开关变化
  const handleSplitToggle = (enabled: boolean) => {
    if (!activeCardId) return;
    
    // 更新开关状态
    debouncedUpdateSwitchConfig({ enableTextSplit: enabled });
    
    // 如果关闭拆分且当前有多个卡片，则合并卡片
    if (!enabled && hasMultipleCards) {
      mergeCardsInExport(activeCardId);
    }
  };

  // 执行文本拆分
  const handleTextSplit = () => {
    if (!activeCardId || !currentCard?.form.content || !currentCard?.switchConfig.enableTextSplit) {
      return;
    }

    const splitResult = splitText(currentCard.form.content, {
      maxCharsPerCard: currentCard.switchConfig.maxCharsPerCard || 200,
      splitMode: currentCard.switchConfig.splitMode || "paragraph"
    });

    if (splitResult.chunks.length <= 1) {
      return; // 不需要拆分
    }

    // 更新第一个卡片的内容
    updateCardForm(activeCardId, {
      content: splitResult.chunks[0],
      title: `${currentCard.form.title} (1/${splitResult.totalChunks})`
    });

    // 为剩余的内容创建新卡片
     for (let i = 1; i < splitResult.chunks.length; i++) {
       const newCard = {
         form: {
           ...currentCard.form,
           content: splitResult.chunks[i],
           title: `${currentCard.form.title} (${i + 1}/${splitResult.totalChunks})`
         },
         style: { ...currentCard.style },
         switchConfig: { ...currentCard.switchConfig },
         cardName: `${currentCard.cardName || '卡片'} - 第${i + 1}页`,
         temp: activeCard?.currentTemplate || 'default',
         language: currentCard.language || "zh"
       };

       addCardToExport(activeCardId, newCard);
     }
  };

  const debouncedUpdateStyle = useMemo(
    () =>
      debounce((updates: any) => {
        if (activeCardId) {
          updateCardStyle(activeCardId, updates);
        }
      }, 100), // 减少防抖延迟从300ms到100ms
    [activeCardId, updateCardStyle]
  );

  const debouncedUpdateSwitchConfig = useMemo(
    () =>
      debounce((updates: any) => {
        if (activeCardId) {
          updateCardSwitchConfig(activeCardId, updates);
        }
      }, 300),
    [activeCardId, updateCardSwitchConfig]
  );

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Section Header 组件
  const SectionHeader = ({ 
    title, 
    icon: Icon, 
    section, 
    description 
  }: { 
    title: string; 
    icon: any; 
    section: keyof typeof expandedSections;
    description?: string;
  }) => (
    <Button
      variant="ghost"
      className="w-full justify-between p-3 h-auto hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors border-0"
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-primary" />
        <div className="text-left">
          <div className="font-medium text-sm">{title}</div>
          {description && (
            <div className="text-xs text-gray-500">{description}</div>
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

  if (!currentCard || !activeCardId) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <Layers className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg font-medium">请选择一个卡片</p>
        <p className="text-gray-400 text-sm mt-2">开始编辑卡片样式和布局</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-1">
        {/* 模板选择 */}
        <div className="border-0 rounded-lg overflow-hidden">
          <SectionHeader
            title={tCard("templateSelection")}
            icon={Layout}
            section="template"
            description={tCard("templateDescription")}
          />
          <AnimatePresence>
            {expandedSections.template && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 space-y-4">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">卡片模板</Label>
                    <Select
                      value={currentCard.temp || "default"}
                      onValueChange={(value) => {
                        if (activeCardId) {
                          updateCardTemplate(activeCardId, value);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DEFAULT_TEMPLATES.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              {template.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      切换模板会应用新的默认样式，但保留您的内容
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 布局设置 */}
        <div className="border-0 rounded-lg overflow-hidden">
          <SectionHeader
            title={tCard("layoutSettings")}
            icon={Maximize}
            section="layout"
            description={tCard("layoutDescription")}
          />
          <AnimatePresence>
            {expandedSections.layout && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 space-y-4">
                  {/* 宽高比选择 */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">{tCard("aspectRatio")}</Label>
                    <Select
                      value={currentCard.style.aspectRatio || "1:1"}
                      onValueChange={(value) =>
                        debouncedUpdateStyle({ aspectRatio: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ASPECT_RATIOS.map((ratio) => (
                          <SelectItem key={ratio.id} value={ratio.id}>
                            {ratio.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* 自定义尺寸 */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">宽度</Label>
                      <Input
                        type="number"
                        value={currentCard.style.width}
                        onChange={(e) =>
                          debouncedUpdateStyle({ width: parseInt(e.target.value) || 440 })
                        }
                        min={200}
                        max={800}
                        placeholder="440"
                        className="text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">高度</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={currentCard.style.height || 0}
                          onChange={(e) =>
                            debouncedUpdateStyle({ height: parseInt(e.target.value) || 0 })
                          }
                          min={0}
                          max={1200}
                          placeholder="自动"
                          disabled={!currentCard.style.height}
                          className="text-sm"
                        />
                        <Switch
                          checked={!!currentCard.style.height}
                          onCheckedChange={(checked) =>
                            debouncedUpdateStyle({ height: checked ? 400 : 0 })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">关闭固定高度将自动适应内容</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 样式设置 */}
        <div className="border-0 rounded-lg overflow-hidden">
          <SectionHeader
            title={tCard("styleSettings")}
            icon={Palette}
            section="style"
            description={tCard("styleDescription")}
          />
          <AnimatePresence>
            {expandedSections.style && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 space-y-4">
                  {/* 背景设置 */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Image className="w-4 h-4" />
                      背景设置
                    </Label>

                    {/* 背景类型选择 */}
                    <div className="space-y-3">
                      <Label className="text-xs text-muted-foreground">背景类型</Label>
                      <Select
                        value={currentCard.style.backgroundType || 'solid'}
                        onValueChange={(value: 'solid' | 'gradient' | 'image') =>
                          debouncedUpdateStyle({ backgroundType: value })
                        }
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solid">纯色背景</SelectItem>
                          <SelectItem value="gradient">渐变背景</SelectItem>
                          <SelectItem value="image">图片背景</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 渐变背景选择器 */}
                    {(currentCard.style.backgroundType || 'solid') === 'gradient' && (
                      <div className="space-y-3">
                        <Label className="text-xs text-muted-foreground">选择渐变</Label>
                        <CardEditorGradientSelector
                          selectedGradient={currentCard.style.gradientClass}
                          onGradientChange={(gradient) =>
                            debouncedUpdateStyle({ gradientClass: gradient })
                          }
                          size="sm"
                          showLabel={false}
                        />
                      </div>
                    )}

                    {/* AI 智能配图 */}
                    {(currentCard.style.backgroundType || 'solid') === 'image' && (
                      <div className="space-y-3">
                        <Label className="text-xs text-muted-foreground flex items-center gap-1">
                          <Wand2 className="w-3 h-3" />
                          AI 智能配图
                        </Label>
                        <AIImageSearch
                          onImageSelect={(imageUrl, imageData) =>
                            debouncedUpdateStyle({
                              backgroundImage: imageUrl,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            })
                          }
                        />

                        {/* 图片遮罩透明度 */}
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              遮罩透明度
                            </span>
                            <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                              {currentCard.style.imageOverlayOpacity || 30}%
                            </span>
                          </Label>
                          <Slider
                            value={[currentCard.style.imageOverlayOpacity || 30]}
                            onValueChange={([value]) =>
                              debouncedUpdateStyle({ imageOverlayOpacity: value })
                            }
                            max={100}
                            min={0}
                            step={5}
                            className="w-full"
                          />
                          <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>透明</span>
                            <span>适中</span>
                            <span>深色</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* 对齐方式 */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">{tCard("textAlign")}</Label>
                    <Select
                      value={currentCard.style.align}
                      onValueChange={(value) =>
                        debouncedUpdateStyle({ align: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {alignOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* 字体设置 */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">{tCard("fontFamily")}</Label>
                    <Input
                      value={currentCard.style.font}
                      onChange={(e) =>
                        debouncedUpdateStyle({ font: e.target.value })
                      }
                      placeholder="字体名称"
                      className="text-sm"
                    />
                  </div>

                  {/* 字体缩放 */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      {tCard("fontSize")}: {(localFontScale ?? currentCard.style.fontScale).toFixed(1)}
                    </Label>
                    <Slider
                      value={[localFontScale ?? currentCard.style.fontScale]}
                      onValueChange={([value]) => {
                        // 立即更新本地状态以提供即时反馈
                        setLocalFontScale(value);
                        // 防抖更新实际状态
                        debouncedUpdateStyle({ fontScale: value });
                      }}
                      onValueCommit={([value]) => {
                        // 拖动结束时立即更新状态，确保最终值被保存
                        if (activeCardId) {
                          updateCardStyle(activeCardId, { fontScale: value });
                        }
                        // 延迟清除本地状态，确保更新完成
                        setTimeout(() => {
                          setLocalFontScale(null);
                        }, 150);
                      }}
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <Separator />

                  {/* 内边距 */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">内边距</Label>
                    <Input
                      value={currentCard.style.padding}
                      onChange={(e) =>
                        debouncedUpdateStyle({ padding: e.target.value })
                      }
                      placeholder="例如: 20px"
                      className="text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 高级设置 */}
        <div className="border-0 rounded-lg overflow-hidden">
          <SectionHeader
            title={tCard("advancedSettings")}
            icon={Sliders}
            section="advanced"
            description={tCard("advancedDescription")}
          />
          <AnimatePresence>
            {expandedSections.advanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 space-y-4">
                  {/* 显示开关 */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">{tCard("displayOptions")}</Label>
                    
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">{tCard("showAuthor")}</Label>
                          <Switch
                            checked={currentCard.switchConfig.showAuthor}
                            onCheckedChange={(checked) =>
                              debouncedUpdateSwitchConfig({ showAuthor: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label className="text-sm">{tCard("showDate")}</Label>
                          <Switch
                            checked={currentCard.switchConfig.showDate}
                            onCheckedChange={(checked) =>
                              debouncedUpdateSwitchConfig({ showDate: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label className="text-sm">{tCard("showQRCode")}</Label>
                          <Switch
                            checked={currentCard.switchConfig.showQRCode}
                            onCheckedChange={(checked) =>
                              debouncedUpdateSwitchConfig({ showQRCode: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label className="text-sm">{tCard("showPageNum")}</Label>
                          <Switch
                            checked={currentCard.switchConfig.showPageNum}
                            onCheckedChange={(checked) =>
                              debouncedUpdateSwitchConfig({ showPageNum: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label className="text-sm">{tCard("showTextCount")}</Label>
                          <Switch
                            checked={currentCard.switchConfig.showTextCount}
                            onCheckedChange={(checked) =>
                              debouncedUpdateSwitchConfig({ showTextCount: checked })
                            }
                          />
                        </div>
                      </div>
                  </div>

                  <Separator />

                  {/* 长文本处理 */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">{tCard("textProcessing")}</Label>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm">{tCard("enableTextSplit")}</Label>
                          <p className="text-xs text-gray-500">
                            {tCard("textSplitDescription")}
                          </p>
                        </div>
                        <Switch
                          checked={currentCard.switchConfig.enableTextSplit || false}
                          onCheckedChange={handleSplitToggle}
                        />
                      </div>

                      {currentCard.switchConfig.enableTextSplit && (
                        <>
                          <div className="space-y-2">
                            <Label className="text-sm">{tCard("maxCharsPerCard")}</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="number"
                                value={currentCard.switchConfig.maxCharsPerCard || 200}
                                onChange={(e) =>
                                  debouncedUpdateSwitchConfig({ 
                                    maxCharsPerCard: parseInt(e.target.value) || 200 
                                  })
                                }
                                min={50}
                                max={1000}
                                className="text-sm"
                              />
                              <span className="text-xs text-gray-500">{tCard("characters")}</span>
                            </div>
                            <p className="text-xs text-gray-500">
                              {tCard("charLimitTip")}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm">{tCard("splitMode")}</Label>
                            <Select
                              value={currentCard.switchConfig.splitMode || "paragraph"}
                              onValueChange={(value) =>
                                debouncedUpdateSwitchConfig({ splitMode: value })
                              }
                            >
                              <SelectTrigger className="text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="paragraph">{tCard("splitByParagraph")}</SelectItem>
                                <SelectItem value="sentence">{tCard("splitBySentence")}</SelectItem>
                                <SelectItem value="character">{tCard("splitByCharacter")}</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-500">
                              {tCard("splitModeTip")}
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                     {/* 拆分预览和操作 */}
                      {currentCard?.switchConfig.enableTextSplit && splitPreview && (
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                {tCard("splitPreview")}
                              </span>
                              {splitPreview.willSplit && (
                                <Button
                                  size="sm"
                                  onClick={handleTextSplit}
                                  className="h-7 px-3 text-xs"
                                >
                                  {tCard("executeSplit")}
                                </Button>
                              )}
                            </div>
                            
                            <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                              {splitPreview.willSplit ? (
                                <>
                                  <p>• {tCard("willSplitInto")} <strong>{splitPreview.estimatedChunks}</strong> {tCard("cards")}</p>
                                  <p>• {tCard("averageLength")} <strong>{splitPreview.averageChunkLength}</strong> {tCard("characters")}</p>
                                  <p>• {tCard("originalLength")} <strong>{currentCard.form.content.length}</strong> {tCard("characters")}</p>
                                </>
                              ) : (
                                <p>• {tCard("noSplitNeeded")}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 合并提示 */}
                      {!currentCard?.switchConfig.enableTextSplit && hasMultipleCards && (
                        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-amber-900 dark:text-amber-100">
                                {tCard("multiCardMerge")}
                              </span>
                              <Button
                                size="sm"
                                onClick={() => activeCardId && mergeCardsInExport(activeCardId)}
                                className="h-7 px-3 text-xs"
                                variant="outline"
                              >
                                {tCard("mergeNow")}
                              </Button>
                            </div>
                            
                            <div className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
                              <p>• {tCard("detected")} <strong>{allCards.length}</strong> {tCard("cards")}</p>
                              <p>• {tCard("mergeRecommendation")}</p>
                              <p>• {tCard("mergeKeepsContent")}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};