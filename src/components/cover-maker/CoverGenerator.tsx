"use client";

import { useEffect, useState, useRef } from 'react';
import { useCoverMaker } from './hooks/useCoverMaker';
import { defaultConfig } from './config';
import { SettingsModal } from './SettingsModal';
import { ImageUploader } from './ImageUploader';
import { RandomImagePicker } from './RandomImagePicker';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColorPicker } from '@/components/ui/color-picker';
import { ChevronDown } from "lucide-react";

export const CoverGenerator: React.FC = () => {
  const [iconName, setIconName] = useState('');
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [dragHighlight, setDragHighlight] = useState<'icon' | 'bg' | null>(null);
  const [isDragging, setIsDragging] = useState<'icon' | 'text' | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [forceRerender, setForceRerender] = useState(0);
  const [imageSourceType, setImageSourceType] = useState<'icon' | 'random'>('icon');

  const {
    canvasRef,
    state,
    setState,
    updatePreview,
    saveWebp,
    loadStyles,
    drawSquareImage,
    getCanvasCoordinates,
    isPointInIcon,
    isPointInText
  } = useCoverMaker(defaultConfig);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadStyles();
  }, [loadStyles]);

  // Handle window resize to recalculate canvas display size
  useEffect(() => {
    const handleResize = () => {
      setForceRerender(prev => prev + 1);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setState(prev => ({ ...prev, isFontMenuOpen: false }));
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setState]);

  const loadIcon = () => {
    if (iconName) {
      const url = `https://api.iconify.design/${iconName}.svg`;
      setIconUrl(url);
      selectIcon(url);
    } else {
      setIconUrl(null);
      setState(prev => ({ ...prev, squareImageUrl: null }));
    }
  };

  const selectIcon = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], 'icon.svg', { type: 'image/svg+xml' });
      const imageUrl = URL.createObjectURL(file);

      setState(prev => ({ ...prev, squareImageUrl: imageUrl }));
      updatePreview('square', { target: { files: [file] } } as any);
    } catch (error) {
      console.error('加载图标时出错:', error);
      // 这里可以添加错误提示
    }
  };

  const selectRandomImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], 'random-bg-image.jpg', { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(file);

      setState(prev => ({ ...prev, bgImageUrl: imageUrl }));
      updatePreview('bg', { target: { files: [file] } } as any);
    } catch (error) {
      console.error('加载随机背景图片时出错:', error);
      // 这里可以添加错误提示
    }
  };

  const getDropArea = (event: React.DragEvent<HTMLCanvasElement>) => {
    const canvas = event.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const centerRadius = 100;
    const distanceToCenter = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    );
    return distanceToCenter < centerRadius ? 'icon' : 'bg';
  };

  // Calculate canvas display size based on aspect ratio
  const getCanvasDisplaySize = () => {
    if (typeof window === 'undefined') {
      return { width: 800, height: 400 };
    }

    const aspectRatio = state.canvasWidth / state.canvasHeight;
    const isLandscape = aspectRatio > 1; // 横版判断

    // 计算左侧编辑面板的参考高度
    const leftPanelHeight = window.innerHeight * 0.8; // 80% of viewport height
    const maxViewportHeight = window.innerHeight * 0.9; // 90% of viewport height

    let displayWidth, displayHeight;

    if (isLandscape) {
      // 横版：占据2/3的可用宽度
      const availableWidth = window.innerWidth * 0.66; // 2/3 of viewport width
      const maxHeight = Math.min(leftPanelHeight, maxViewportHeight);

      displayWidth = Math.min(availableWidth, 1200); // 最大1200px
      displayHeight = displayWidth / aspectRatio;

      // 如果高度超出限制，按高度缩放
      if (displayHeight > maxHeight) {
        displayHeight = maxHeight;
        displayWidth = displayHeight * aspectRatio;
      }
    } else {
      // 竖版：高度与左侧编辑面板一致，但不超过屏幕高度
      displayHeight = Math.min(leftPanelHeight, maxViewportHeight);
      displayWidth = displayHeight * aspectRatio;

      // 如果宽度超出可用空间，按宽度缩放
      const availableWidth = window.innerWidth * 0.66; // 2/3 of viewport width
      if (displayWidth > availableWidth) {
        displayWidth = availableWidth;
        displayHeight = displayWidth / aspectRatio;
      }
    }

    return {
      width: displayWidth,
      height: displayHeight
    };
  };

  const handleCanvasDragOver = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    setDragHighlight(getDropArea(event));
  };

  const handleCanvasDragLeave = () => {
    setDragHighlight(null);
  };

  const handleCanvasDrop = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    setDragHighlight(null);
    const file = event.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const area = getDropArea(event);
    updatePreview(area === 'icon' ? 'square' : 'bg', { target: { files: [file] } } as any);
  };

  // New dragging functions for internal elements
  const handleCanvasMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const coords = getCanvasCoordinates(event.clientX, event.clientY, canvasRef.current);

    // Check if clicking on icon (higher priority - drawn on top)
    if (state.squareImageUrl && isPointInIcon(coords.x, coords.y)) {
      setIsDragging('icon');
      setDragOffset({
        x: coords.x - state.iconX,
        y: coords.y - state.iconY
      });
      event.preventDefault();
    }
    // Check if clicking on text
    else if (isPointInText(coords.x, coords.y)) {
      setIsDragging('text');
      setDragOffset({
        x: coords.x - state.textX,
        y: coords.y - state.textY
      });
      event.preventDefault();
    }
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current) return;

    const coords = getCanvasCoordinates(event.clientX, event.clientY, canvasRef.current);
    const newX = coords.x - dragOffset.x;
    const newY = coords.y - dragOffset.y;

    if (isDragging === 'icon') {
      // Keep icon within canvas bounds
      const iconSize = state.squareSize;
      const halfSize = iconSize / 2;
      const boundedX = Math.max(halfSize, Math.min(state.canvasWidth - halfSize, newX));
      const boundedY = Math.max(halfSize, Math.min(state.canvasHeight - halfSize, newY));

      updatePreview('iconPosition', { x: boundedX, y: boundedY });
    }
    else if (isDragging === 'text') {
      // Keep text within canvas bounds
      const textHeight = state.textSize * state.lineHeight * state.text.split('\n').length;
      const textPadding = 50; // Some padding for text
      const boundedX = Math.max(textPadding, Math.min(state.canvasWidth - textPadding, newX));
      const boundedY = Math.max(textHeight / 2, Math.min(state.canvasHeight - textHeight / 2, newY));

      updatePreview('textPosition', { x: boundedX, y: boundedY });
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const selectFont = (fontValue: string) => {
    setState(prev => ({
      ...prev,
      selectedFont: fontValue,
      isFontMenuOpen: false
    }));
    updatePreview('font', { target: { value: fontValue } } as any);
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  return (
    <main className="container mx-auto max-w-[1800px] p-4 flex flex-col lg:flex-row lg:items-start lg:justify-center gap-6 min-h-[600px]">
      {/* Control Panel */}
      <Card className="w-full lg:max-w-md lg:flex-shrink-0 lg:h-[calc(100vh-8rem)] lg:overflow-hidden">
        <CardContent className="p-6 h-full lg:overflow-y-auto lg:scrollbar-thin lg:scrollbar-thumb-gray-300 lg:scrollbar-track-gray-100 lg:dark:scrollbar-thumb-gray-600 lg:dark:scrollbar-track-gray-800">
          {/* Image Source Selector */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">图片类型</Label>
            <ToggleGroup
              type="single"
              value={imageSourceType}
              onValueChange={(value: 'icon' | 'random') => {
                if (value) setImageSourceType(value);
              }}
              className="w-full"
            >
              <ToggleGroupItem value="icon" className="flex-1">
                图标
              </ToggleGroupItem>
              <ToggleGroupItem value="random" className="flex-1">
                随机背景
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Icon or Random Image Selector */}
          {imageSourceType === 'icon' ? (
            <div className="flex gap-2 items-center mb-6">
              <Input
                type="text"
                value={iconName}
                onChange={(e) => setIconName(e.target.value)}
                onInput={loadIcon}
                placeholder="输入图标名称，例如 logos:chrome"
                className="flex-1"
              />
              <a
                href="https://yesicon.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-2 text-sm whitespace-nowrap transition-colors ${buttonVariants({ variant: "outline", size: "sm" })}`}
              >
                图标库
              </a>
            </div>
          ) : (
            <div className="mb-6">
              <RandomImagePicker onImageSelect={selectRandomImage} />
            </div>
          )}

          {/* Aspect Ratio Settings */}
          <div className="flex items-center gap-3 mb-6">
            <Label htmlFor="inputAspectRatio" className="text-sm font-medium whitespace-nowrap">
              画面比例
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 justify-between"
                >
                  <span className="truncate">
                    {defaultConfig.aspectRatioOptions.find(r => r.ratio === state.selectedAspectRatio)?.label || '2:1 横版'}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {defaultConfig.aspectRatioOptions.map((ratio) => (
                  <DropdownMenuItem
                    key={ratio.ratio}
                    onClick={() => updatePreview('aspectRatio', { target: { value: ratio.ratio } })}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{ratio.label}</span>
                      <span className="text-muted-foreground text-xs ml-2">
                        {ratio.width}×{ratio.height}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Background Settings */}
          <div className="flex gap-2 mb-6">
            <Button
              asChild
              variant="default"
              size="sm"
              className="flex-1"
            >
              <label htmlFor="inputBgImage" className="cursor-pointer">
                上传背景图片
              </label>
            </Button>
            <input
              type="file"
              id="inputBgImage"
              accept="image/*"
              onChange={(e) => updatePreview('bg', e)}
              className="hidden"
            />
            <Button
              asChild
              variant="default"
              size="sm"
              className="flex-1"
            >
              <label htmlFor="inputSquareImage" className="cursor-pointer">
                上传图标图片
              </label>
            </Button>
            <input
              type="file"
              id="inputSquareImage"
              accept="image/*"
              onChange={(e) => updatePreview('square', e)}
              className="hidden"
            />
            <Button
              asChild
              variant="default"
              size="sm"
            >
              <a
                href="https://icon.ruom.top"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap"
              >
                图标下载站
              </a>
            </Button>
          </div>

          {/* Color Settings */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <ColorPicker
              color={state.textColor}
              onChange={(color) => updatePreview('textColor', { target: { value: color } })}
              label="标题颜色"
              id="inputTextColor"
            />
            <ColorPicker
              color={state.watermarkColor}
              onChange={(color) => updatePreview('watermarkColor', { target: { value: color } })}
              label="水印颜色"
              id="inputWatermarkColor"
            />
          </div>

          {/* Background Blur Settings */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="w-full sm:flex-[6] flex items-center gap-3">
              <Label htmlFor="inputBgBlur" className="text-sm font-medium whitespace-nowrap">
                背景模糊
              </Label>
              <Slider
                id="inputBgBlur"
                min={0}
                max={20}
                step={1}
                value={[state.bgBlur]}
                onValueChange={([value]) => updatePreview('bgBlur', { target: { value } })}
                className="flex-1"
              />
            </div>
            <div className="w-full sm:flex-[4] flex gap-2">
              <ColorPicker
                color={state.bgColor}
                onChange={(color) => updatePreview('bgColor', { target: { value: color } })}
                label="背景颜色"
                id="inputBgColor"
              />
              <Button
                onClick={() => updatePreview('bgColor', { target: { value: '#ffffff' } })}
                variant="outline"
                size="sm"
                className="px-3"
                title="重置为白色"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Icon and Shadow Settings */}
          <div
            className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-out ${state.squareImageUrl
                ? 'mb-6 max-h-[300px] sm:max-h-[200px] opacity-100'
                : 'max-h-0 opacity-0'
              }`}
          >
            {/* Icon Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:flex-1 flex items-center gap-3">
                <Label htmlFor="inputSquareSize" className="text-sm font-medium whitespace-nowrap">
                  图标大小
                </Label>
                <Slider
                  id="inputSquareSize"
                  min={200}
                  max={500}
                  step={10}
                  value={[state.squareSize]}
                  onValueChange={([value]) => updatePreview('squareSize', { target: { value } })}
                  className="flex-1"
                />
              </div>
              <div className="w-full sm:flex-1 flex items-center gap-3">
                <Label htmlFor="inputRotation" className="text-sm font-medium whitespace-nowrap">
                  图标旋转
                </Label>
                <Slider
                  id="inputRotation"
                  min={0}
                  max={360}
                  step={1}
                  value={[state.rotation]}
                  onValueChange={([value]) => updatePreview('rotation', { target: { value } })}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Shadow Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:flex-[6] flex items-center gap-3">
                <Label htmlFor="inputShadowStrength" className="text-sm font-medium whitespace-nowrap">
                  图标阴影大小
                </Label>
                <Slider
                  id="inputShadowStrength"
                  min={0}
                  max={100}
                  step={5}
                  value={[state.shadowStrength]}
                  onValueChange={([value]) => updatePreview('shadowStrength', { target: { value } })}
                  className="flex-1"
                />
              </div>
              <div className="w-full sm:flex-[4]">
                <ColorPicker
                  color={state.shadowColor.startsWith('rgba') ? '#000000' : state.shadowColor}
                  onChange={(color) => updatePreview('shadowColor', { target: { value: color } })}
                  label="图标阴影颜色"
                  id="inputShadowColor"
                />
              </div>
            </div>

            {/* Icon Background Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:flex-[6] flex items-center gap-3">
                <Label htmlFor="inputIconBgSize" className="text-sm font-medium whitespace-nowrap">
                  图标背景大小
                </Label>
                <Slider
                  id="inputIconBgSize"
                  min={0}
                  max={20}
                  step={1}
                  value={[state.iconBgSize]}
                  onValueChange={([value]) => updatePreview('iconBgSize', { target: { value } })}
                  className="flex-1"
                />
              </div>
              <div className="w-full sm:flex-[4]">
                <ColorPicker
                  color={state.iconColor}
                  onChange={(color) => updatePreview('iconColor', { target: { value: color } })}
                  label="图标背景颜色"
                  id="inputIconColor"
                />
              </div>
            </div>
          </div>

          {/* Position Controls */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <h4 className="text-sm font-medium">位置控制</h4>
            </div>

            {/* Icon Position Controls */}
            {state.squareImageUrl && (
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">图标位置</span>
                  {isDragging === 'icon' && (
                    <span className="text-xs text-blue-500 font-mono">
                      ({Math.round(state.iconX)}, {Math.round(state.iconY)})
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="iconX" className="text-xs whitespace-nowrap">X:</Label>
                    <Input
                      id="iconX"
                      type="number"
                      value={Math.round(state.iconX)}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        updatePreview('iconX', { target: { value } });
                      }}
                      className="h-8 text-xs"
                      min={0}
                      max={state.canvasWidth}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="iconY" className="text-xs whitespace-nowrap">Y:</Label>
                    <Input
                      id="iconY"
                      type="number"
                      value={Math.round(state.iconY)}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        updatePreview('iconY', { target: { value } });
                      }}
                      className="h-8 text-xs"
                      min={0}
                      max={state.canvasHeight}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Text Position Controls */}
            {state.text && (
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">文本位置</span>
                  {isDragging === 'text' && (
                    <span className="text-xs text-blue-500 font-mono">
                      ({Math.round(state.textX)}, {Math.round(state.textY)})
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="textX" className="text-xs whitespace-nowrap">X:</Label>
                    <Input
                      id="textX"
                      type="number"
                      value={Math.round(state.textX)}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        updatePreview('textX', { target: { value } });
                      }}
                      className="h-8 text-xs"
                      min={0}
                      max={state.canvasWidth}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="textY" className="text-xs whitespace-nowrap">Y:</Label>
                    <Input
                      id="textY"
                      type="number"
                      value={Math.round(state.textY)}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        updatePreview('textY', { target: { value } });
                      }}
                      className="h-8 text-xs"
                      min={0}
                      max={state.canvasHeight}
                    />
                  </div>
                </div>
              </div>
            )}

            {!state.squareImageUrl && !state.text && (
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center text-xs text-gray-500">
                添加图标或文本后可调整位置
              </div>
            )}

          </div>

          {/* Text Settings */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="w-full sm:flex-1 flex items-center gap-3">
              <Label htmlFor="inputTextSize" className="text-sm font-medium whitespace-nowrap">
                标题大小
              </Label>
              <Slider
                id="inputTextSize"
                min={100}
                max={300}
                step={10}
                value={[state.textSize]}
                onValueChange={([value]) => updatePreview('textSize', { target: { value } })}
                className="flex-1"
              />
            </div>
            <div className="w-full sm:flex-1 flex items-center gap-3">
              <Label className="text-sm font-medium whitespace-nowrap">
                字体
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between"
                    style={{ fontFamily: state.selectedFont }}
                  >
                    <span className="truncate">
                      {defaultConfig.fontOptions.find(f => f.value === state.selectedFont)?.label}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-full">
                  {defaultConfig.fontOptions.map((font) => (
                    <DropdownMenuItem
                      key={font.value}
                      onClick={() => selectFont(font.value)}
                      className="cursor-pointer"
                      style={{ fontFamily: font.value }}
                    >
                      {font.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Line Height and 3D Effect Settings */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div
              className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ease-out ${state.hasMultipleLines
                  ? 'opacity-100 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-[300px]'
                  : 'h-0 opacity-0 w-0'
                }`}
            >
              <Label htmlFor="inputLineHeight" className="text-sm font-medium whitespace-nowrap">
                标题行高
              </Label>
              <Slider
                id="inputLineHeight"
                min={0.5}
                max={2}
                step={0.1}
                value={[state.lineHeight]}
                onValueChange={([value]) => updatePreview('lineHeight', { target: { value } })}
                className="flex-1"
              />
            </div>
            <div className="flex-1 flex items-center gap-3">
              <Label htmlFor="input3D" className="text-sm font-medium whitespace-nowrap">
                立体字
              </Label>
              <Slider
                id="input3D"
                min={0}
                max={10}
                step={1}
                value={[state.text3D]}
                onValueChange={([value]) => updatePreview('text3D', { target: { value } })}
                className="flex-1"
              />
            </div>
          </div>

          {/* Title Input */}
          <Textarea
            id="inputText"
            onChange={(e) => updatePreview('text', e)}
            placeholder="输入标题"
            rows={2}
            className="min-h-[60px] resize-y mb-3"
          />

          {/* Watermark Settings */}
          <div className="flex items-center gap-3 mb-3">
            <Input
              type="text"
              id="inputWatermark"
              onChange={(e) => updatePreview('watermark', e)}
              placeholder="输入水印"
              defaultValue={defaultConfig.watermark}
              className="flex-1"
            />
          </div>

          {/* Position Reset Buttons */}
          <div className="flex gap-2 mb-4">
            <Button
              onClick={() => {
                const centerX = state.canvasWidth / 2;
                const centerY = state.canvasHeight / 2;
                updatePreview('iconX', { target: { value: centerX } });
                updatePreview('iconY', { target: { value: centerY } });
              }}
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={!state.squareImageUrl}
            >
              🔄 重置图标位置
            </Button>
            <Button
              onClick={() => {
                const centerX = state.canvasWidth / 2;
                const centerY = state.canvasHeight / 2;
                updatePreview('textX', { target: { value: centerX } });
                updatePreview('textY', { target: { value: centerY } });
              }}
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={!state.text}
            >
              🔄 重置文本位置
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={saveWebp}
              className="flex-1"
              size="sm"
            >
              保存图片
            </Button>
            <ImageUploader canvasId="canvasPreview" />
            <Button
              onClick={openSettings}
              variant="outline"
              size="sm"
              className="px-3"
              title="设置"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Canvas Preview */}
      <Card key={`canvas-${forceRerender}`} className="relative w-full lg:flex-1 lg:flex-shrink-0 overflow-hidden lg:h-[calc(100vh-8rem)] min-h-[400px]">
        <CardContent className="p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
          <div
            className="relative flex items-center justify-center"
            style={{
              width: `${getCanvasDisplaySize().width}px`,
              height: `${getCanvasDisplaySize().height}px`,
              maxWidth: '100%',
              maxHeight: 'calc(100vh-12rem)'
            }}
          >
            <canvas
              ref={canvasRef}
              id="canvasPreview"
              width={state.canvasWidth}
              height={state.canvasHeight}
              onDragOver={handleCanvasDragOver}
              onDragLeave={handleCanvasDragLeave}
              onDrop={handleCanvasDrop}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
              className={`w-full h-full rounded-lg shadow-md bg-white dark:bg-gray-800 transition-all ${isDragging ? 'cursor-grabbing' :
                  state.squareImageUrl || state.text ? 'cursor-grab' : 'cursor-default'
                }`}
              style={{
                width: '100%',
                height: '100%'
              }}
            />
          </div>

          {/* Icon Area Highlight */}
          {dragHighlight === 'icon' && (
            <div
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{
                width: '200px',
                height: '200px',
                transform: 'translate(-50%, -50%)',
                border: '3px dashed #22c55e',
                borderRadius: '24px',
                boxSizing: 'border-box',
                zIndex: 10
              }}
            />
          )}

          {/* Background Area Highlight */}
          {dragHighlight === 'bg' && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                border: '3px dashed #22c55e',
                borderRadius: '16px',
                boxSizing: 'border-box',
                zIndex: 9
              }}
            />
          )}

          {/* Dragging Status Indicator */}
          {isDragging && (
            <div className="pointer-events-none absolute top-4 left-4 bg-black/75 text-white px-3 py-1 rounded-full text-sm z-20">
              正在拖拽{isDragging === 'icon' ? '图标' : '文本'}
            </div>
          )}

          {/* Draggable Hint */}
          {!isDragging && (state.squareImageUrl || state.text) && (
            <div className="pointer-events-none absolute top-4 right-4 bg-blue-500/75 text-white px-3 py-1 rounded-full text-xs z-20">
              💡 拖拽{state.squareImageUrl && state.text ? '图标和文本' :
                state.squareImageUrl ? '图标' : '文本'}可移动位置
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={closeSettings} />
    </main>
  );
};