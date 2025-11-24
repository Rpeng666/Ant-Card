import { useEffect, useRef, useState, useCallback } from 'react';

export interface IconItem {
  id: string;
  imageUrl: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
}

export interface CoverMakerState {
  bgImageUrl: string | null;
  bgColor: string;
  textColor: string;
  watermarkColor: string;
  icons: IconItem[];
  rotation: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowStrength: number;
  watermark: string;
  textSize: number;
  lineHeight: number;
  text3D: number;
  text: string;
  bgBlur: number;
  selectedFont: string;
  isFontMenuOpen: boolean;
  hasMultipleLines: boolean;
  canvasWidth: number;
  canvasHeight: number;
  selectedAspectRatio: string;
  textX: number;
  textY: number;
  watermarkX: number;
  watermarkY: number;
  squareImageUrl: string | null;
  squareSize: number;
  iconX: number;
  iconY: number;
  iconColor: string;
  iconBgSize: number;
}

const loadedImages = new Map();

export const useCoverMaker = (defaultConfig: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Create offscreen canvases
  const [offscreenCanvases, setOffscreenCanvases] = useState<{
    bgCanvas: HTMLCanvasElement;
    bgCtx: CanvasRenderingContext2D;
    textCanvas: HTMLCanvasElement;
    textCtx: CanvasRenderingContext2D;
    watermarkCanvas: HTMLCanvasElement;
    watermarkCtx: CanvasRenderingContext2D;
    squareCanvas: HTMLCanvasElement;
    squareCtx: CanvasRenderingContext2D;
  } | null>(null);

  // State
  const [state, setState] = useState<CoverMakerState>({
    bgImageUrl: null,
    bgColor: '#ffffff',
    textColor: '#eeeeee',
    watermarkColor: '#dddddd',
    icons: [],
    rotation: 0,
    shadowColor: '#646464',
    shadowBlur: 120,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    shadowStrength: 60,
    watermark: defaultConfig.watermark,
    textSize: 200,
    lineHeight: 1,
    text3D: 0,
    text: defaultConfig.text,
    bgBlur: 3,
    selectedFont: defaultConfig.fontFamily,
    isFontMenuOpen: false,
    hasMultipleLines: false,
    canvasWidth: 1000,
    canvasHeight: 500,
    selectedAspectRatio: '2:1',
    textX: 500, // 初始在中心
    textY: 250,
    watermarkX: -20, // 右下角偏移
    watermarkY: -20,
    squareImageUrl: null,
    squareSize: 300,
    iconX: 500, // 初始在中心
    iconY: 250,
    iconColor: '#ffffff',
    iconBgSize: 10
  });

  // Initialize offscreen canvases - dependent on canvas dimensions
  useEffect(() => {
    const createCanvas = (width: number, height: number) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Failed to get 2D context');
      }
      return { canvas, ctx };
    };

    try {
      const { canvas: bgCanvas, ctx: bgCtx } = createCanvas(state.canvasWidth, state.canvasHeight);
      const { canvas: textCanvas, ctx: textCtx } = createCanvas(state.canvasWidth, state.canvasHeight);
      const { canvas: watermarkCanvas, ctx: watermarkCtx } = createCanvas(state.canvasWidth, state.canvasHeight);
      const { canvas: squareCanvas, ctx: squareCtx } = createCanvas(state.canvasWidth, state.canvasHeight);

      setOffscreenCanvases({
        bgCanvas,
        bgCtx,
        textCanvas,
        textCtx,
        watermarkCanvas,
        watermarkCtx,
        squareCanvas,
        squareCtx
      });
    } catch (error) {
      console.error('Failed to initialize canvases:', error);
    }
  }, [state.canvasWidth, state.canvasHeight]);

  // Initialize main canvas
  useEffect(() => {
    if (canvasRef.current && offscreenCanvases) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) {
        console.error('Failed to get main canvas context');
        return;
      }

      // Initial draw after a short delay to ensure everything is ready
      const timer = setTimeout(() => {
        drawBackground();
        drawText();
        drawWatermark();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [offscreenCanvases]);

  // Update main canvas dimensions when they change
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = state.canvasWidth;
      canvasRef.current.height = state.canvasHeight;
    }
  }, [state.canvasWidth, state.canvasHeight]);

  const composeCanvases = useCallback(() => {
    if (!canvasRef.current || !offscreenCanvases) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);
    ctx.drawImage(offscreenCanvases.bgCanvas, 0, 0);
    ctx.drawImage(offscreenCanvases.textCanvas, 0, 0);
    ctx.drawImage(offscreenCanvases.squareCanvas, 0, 0);
    ctx.drawImage(offscreenCanvases.watermarkCanvas, 0, 0);
  }, [offscreenCanvases, state.canvasWidth, state.canvasHeight]);

  const loadImage = useCallback((file: File, callback: (url: string) => void) => {
    if (!loadedImages.has(file)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          loadedImages.set(file, result);
          callback(result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      callback(loadedImages.get(file) as string);
    }
  }, []);

  const drawBackground = useCallback(() => {
    if (!offscreenCanvases) return;

    const { bgCanvas, bgCtx } = offscreenCanvases;
    bgCtx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);

    if (state.bgImageUrl) {
      const img = new Image();
      img.onload = () => {
        const scaleX = state.canvasWidth / img.width;
        const scaleY = state.canvasHeight / img.height;
        const scale = Math.max(scaleX, scaleY);
        const width = img.width * scale;
        const height = img.height * scale;
        const x = (state.canvasWidth - width) / 2;
        const y = (state.canvasHeight - height) / 2;

        // 重置混合模式
        bgCtx.globalCompositeOperation = 'source-over';
        bgCtx.filter = `blur(${state.bgBlur}px)`;

        // 绘制背景图片
        bgCtx.drawImage(img, x, y, width, height);

        // 如果背景颜色不是白色或透明，在图片上添加颜色覆盖层
        if (state.bgColor !== '#ffffff' && state.bgColor !== '#FFFFFF' && state.bgColor !== 'transparent') {
          bgCtx.globalCompositeOperation = 'multiply';
          bgCtx.fillStyle = state.bgColor;
          bgCtx.fillRect(0, 0, state.canvasWidth, state.canvasHeight);
          bgCtx.globalCompositeOperation = 'source-over';
        }

        composeCanvases();
      };
      img.onerror = () => {
        console.error('Failed to load background image');
        // 如果图片加载失败，只显示背景颜色
        bgCtx.fillStyle = state.bgColor;
        bgCtx.fillRect(0, 0, state.canvasWidth, state.canvasHeight);
        composeCanvases();
      };
      img.src = state.bgImageUrl;
    } else {
      // 没有背景图片，只显示背景颜色
      bgCtx.fillStyle = state.bgColor;
      bgCtx.fillRect(0, 0, state.canvasWidth, state.canvasHeight);
      composeCanvases();
    }
  }, [state.bgImageUrl, state.bgColor, state.bgBlur, state.canvasWidth, state.canvasHeight, offscreenCanvases, composeCanvases]);

  const drawSquareImage = useCallback(() => {
    if (!offscreenCanvases) return;

    const { squareCanvas, squareCtx } = offscreenCanvases;
    squareCtx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);

    // 绘制单个方形图片/图标
    if (state.squareImageUrl) {
      const img = new Image();
      img.onload = () => {
        const totalSize = state.squareSize;
        const borderWidth = state.iconBgSize;
        const size = totalSize - 2 * borderWidth;
        const x = state.iconX - totalSize / 2;
        const y = state.iconY - totalSize / 2;

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = totalSize;
        tempCanvas.height = totalSize;
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) return;

        // 绘制背景圆
        if (borderWidth > 0) {
          tempCtx.save();
          tempCtx.beginPath();
          tempCtx.arc(totalSize / 2, totalSize / 2, totalSize / 2, 0, Math.PI * 2);
          tempCtx.closePath();
          tempCtx.fillStyle = state.iconColor;
          tempCtx.fill();
          tempCtx.restore();
        }

        // 创建圆形遮罩
        tempCtx.save();
        tempCtx.beginPath();
        tempCtx.arc(totalSize / 2, totalSize / 2, size / 2, 0, Math.PI * 2);
        tempCtx.closePath();
        tempCtx.clip();

        // 计算图片缩放
        const imgAspectRatio = img.width / img.height;
        const containerAspectRatio = size / size;

        let scaledWidth, scaledHeight;
        if (imgAspectRatio > containerAspectRatio) {
          scaledWidth = size;
          scaledHeight = size / imgAspectRatio;
        } else {
          scaledWidth = size * imgAspectRatio;
          scaledHeight = size;
        }

        const offsetX = (size - scaledWidth) / 2;
        const offsetY = (size - scaledHeight) / 2;

        // 绘制图片
        tempCtx.drawImage(img, borderWidth + offsetX, borderWidth + offsetY, scaledWidth, scaledHeight);
        tempCtx.restore();

        // 应用阴影和旋转
        squareCtx.save();
        squareCtx.shadowColor = state.shadowColor;
        squareCtx.shadowBlur = state.shadowBlur;
        squareCtx.shadowOffsetX = state.shadowOffsetX;
        squareCtx.shadowOffsetY = state.shadowOffsetY;

        squareCtx.translate(x + totalSize / 2, y + totalSize / 2);
        squareCtx.rotate((state.rotation * Math.PI) / 180);
        squareCtx.translate(-(x + totalSize / 2), -(y + totalSize / 2));

        squareCtx.drawImage(tempCanvas, x, y, totalSize, totalSize);
        squareCtx.restore();

        composeCanvases();
      };
      img.onerror = () => {
        console.error('Failed to load icon image');
        composeCanvases();
      };
      img.src = state.squareImageUrl;
    } else {
      composeCanvases();
    }
  }, [state.squareImageUrl, state.squareSize, state.iconX, state.iconY, state.iconBgSize, state.iconColor, state.shadowColor, state.shadowBlur, state.shadowOffsetX, state.shadowOffsetY, state.rotation, offscreenCanvases, composeCanvases]);

  const drawText = useCallback(() => {
    if (!offscreenCanvases) return;

    const { textCanvas, textCtx } = offscreenCanvases;
    textCtx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);

    const htmlElement = document.documentElement;
    const computedStyle = getComputedStyle(htmlElement);
    const fontFamily = computedStyle.fontFamily;
    const font = state.selectedFont ? `${state.selectedFont}, ${fontFamily}` : fontFamily;

    textCtx.font = `600 ${state.textSize}px ${font}`;
    textCtx.fillStyle = state.textColor;
    textCtx.textAlign = 'center';
    textCtx.textBaseline = 'middle';

    if (state.text3D > 0) {
      textCtx.shadowColor = 'rgba(0, 0, 0, .4)';
      textCtx.shadowBlur = state.text3D * 0.5;
      textCtx.shadowOffsetX = state.text3D;
      textCtx.shadowOffsetY = state.text3D;
    } else {
      textCtx.shadowColor = 'transparent';
      textCtx.shadowBlur = 0;
      textCtx.shadowOffsetX = 0;
      textCtx.shadowOffsetY = 0;
    }

    // Handle multi-line text
    const lines = state.text.split('\n');
    const lineHeight = state.textSize * state.lineHeight;
    const totalHeight = lineHeight * lines.length;
    const startY = state.textY - totalHeight / 2 + lineHeight / 2;

    lines.forEach((line, index) => {
      const y = startY + index * lineHeight;
      textCtx.fillText(line, state.textX, y);
    });

    composeCanvases();
  }, [state.text, state.textColor, state.textSize, state.lineHeight, state.text3D, state.selectedFont, state.canvasWidth, state.canvasHeight, state.textX, state.textY, offscreenCanvases, composeCanvases]);

  const drawWatermark = useCallback(() => {
    if (!offscreenCanvases) return;

    const { watermarkCanvas, watermarkCtx } = offscreenCanvases;
    watermarkCtx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);

    const htmlElement = document.documentElement;
    const computedStyle = getComputedStyle(htmlElement);
    const fontFamily = computedStyle.fontFamily;
    const font = state.selectedFont ? `${state.selectedFont}, ${fontFamily}` : fontFamily;

    watermarkCtx.font = `italic 14px ${font}`;
    watermarkCtx.fillStyle = state.watermarkColor;
    watermarkCtx.textAlign = 'right';
    watermarkCtx.fillText(state.watermark, state.canvasWidth + state.watermarkX, state.canvasHeight + state.watermarkY);
    composeCanvases();
  }, [state.watermark, state.watermarkColor, state.selectedFont, state.canvasWidth, state.canvasHeight, state.watermarkX, state.watermarkY, offscreenCanvases, composeCanvases]);

  const updatePreview = useCallback((type: string, event: any) => {
    switch (type) {
      case 'bg':
        const bgImage = event.target.files[0];
        if (bgImage) {
          loadImage(bgImage, (url) => {
            setState(prev => ({ ...prev, bgImageUrl: url }));
            setTimeout(drawBackground, 0);
          });
        }
        break;
      case 'bgColor':
        setState(prev => ({ ...prev, bgColor: event.target.value }));
        setTimeout(drawBackground, 0);
        break;
      case 'textColor':
        setState(prev => ({ ...prev, textColor: event.target.value }));
        setTimeout(drawText, 0);
        break;
      case 'watermarkColor':
        setState(prev => ({ ...prev, watermarkColor: event.target.value }));
        setTimeout(drawWatermark, 0);
        break;
      case 'square':
        const squareImage = event.target.files[0];
        if (squareImage) {
          loadImage(squareImage, (url) => {
            setState(prev => ({ ...prev, squareImageUrl: url }));
            setTimeout(drawSquareImage, 0);
          });
        }
        break;
      case 'rotation':
        setState(prev => ({ ...prev, rotation: event.target.value }));
        setTimeout(drawSquareImage, 0);
        break;
      case 'text':
        const text = event.target.value || defaultConfig.text;
        setState(prev => ({
          ...prev,
          text,
          hasMultipleLines: text.includes('\n')
        }));
        setTimeout(drawText, 0);
        break;
      case 'watermark':
        setState(prev => ({ ...prev, watermark: event.target.value }));
        setTimeout(drawWatermark, 0);
        break;
      case 'textSize':
        setState(prev => ({ ...prev, textSize: event.target.value }));
        setTimeout(drawText, 0);
        break;
      case 'squareSize':
        setState(prev => ({ ...prev, squareSize: event.target.value }));
        setTimeout(drawSquareImage, 0);
        break;
      case 'bgBlur':
        setState(prev => ({ ...prev, bgBlur: event.target.value }));
        setTimeout(drawBackground, 0);
        break;
      case 'iconColor':
        setState(prev => ({ ...prev, iconColor: event.target.value }));
        setTimeout(drawSquareImage, 0);
        break;
      case 'iconBgSize':
        setState(prev => ({ ...prev, iconBgSize: Number(event.target.value) }));
        setTimeout(drawSquareImage, 0);
        break;
      case 'font':
        setState(prev => ({ ...prev, selectedFont: event.target.value, isFontMenuOpen: false }));
        setTimeout(() => {
          drawText();
          drawWatermark();
        }, 0);
        break;
      case 'lineHeight':
        setState(prev => ({ ...prev, lineHeight: event.target.value }));
        setTimeout(drawText, 0);
        break;
      case 'text3D':
        setState(prev => ({ ...prev, text3D: event.target.value }));
        setTimeout(drawText, 0);
        break;
      case 'shadowColor':
        setState(prev => ({ ...prev, shadowColor: event.target.value }));
        setTimeout(drawSquareImage, 0);
        break;
      case 'shadowStrength':
        const strength = event.target.value;
        setState(prev => ({
          ...prev,
          shadowStrength: strength,
          shadowBlur: strength * 2,
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }));
        setTimeout(drawSquareImage, 0);
        break;
      case 'aspectRatio':
        const selectedRatio = defaultConfig.aspectRatioOptions.find(
          (ratio: any) => ratio.ratio === event.target.value
        );
        if (selectedRatio) {
          setState(prev => ({
            ...prev,
            canvasWidth: selectedRatio.width,
            canvasHeight: selectedRatio.height,
            selectedAspectRatio: selectedRatio.ratio
          }));
        }
        break;
      case 'iconPosition':
        setState(prev => ({
          ...prev,
          iconX: event.x,
          iconY: event.y
        }));
        setTimeout(drawSquareImage, 0);
        break;
      case 'textPosition':
        setState(prev => ({
          ...prev,
          textX: event.x,
          textY: event.y
        }));
        setTimeout(drawText, 0);
        break;
      case 'iconX':
        setState(prev => ({
          ...prev,
          iconX: event.value
        }));
        setTimeout(drawSquareImage, 0);
        break;
      case 'iconY':
        setState(prev => ({
          ...prev,
          iconY: event.value
        }));
        setTimeout(drawSquareImage, 0);
        break;
      case 'textX':
        setState(prev => ({
          ...prev,
          textX: event.value
        }));
        setTimeout(drawText, 0);
        break;
      case 'textY':
        setState(prev => ({
          ...prev,
          textY: event.value
        }));
        setTimeout(drawText, 0);
        break;
    }
  }, [loadImage, drawBackground, drawText, drawWatermark, drawSquareImage, defaultConfig]);

  const saveWebp = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.toBlob(blob => {
        if (blob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'AntCard-Cover.webp';
          link.click();
          URL.revokeObjectURL(link.href);
        }
      }, 'image/webp');
    }
  }, []);

  const loadStyles = useCallback(() => {
    defaultConfig.fontStyles?.forEach((url: string) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    });
  }, [defaultConfig.fontStyles]);

  // Redraw all content when canvas dimensions change
  useEffect(() => {
    if (offscreenCanvases && canvasRef.current) {
      const timer = setTimeout(() => {
        drawBackground();
        drawText();
        drawWatermark();
        if (state.squareImageUrl) {
          drawSquareImage();
        }
      }, 50); // Short delay to ensure canvases are ready

      return () => clearTimeout(timer);
    }
  }, [state.canvasWidth, state.canvasHeight, offscreenCanvases, drawBackground, drawText, drawWatermark, drawSquareImage, state.squareImageUrl]);

  // Convert mouse coordinates to canvas coordinates
  const getCanvasCoordinates = useCallback((clientX: number, clientY: number, canvasElement: HTMLCanvasElement) => {
    const rect = canvasElement.getBoundingClientRect();
    const scaleX = state.canvasWidth / rect.width;
    const scaleY = state.canvasHeight / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }, [state.canvasWidth, state.canvasHeight]);

  // Check if point is within icon bounds
  const isPointInIcon = useCallback((x: number, y: number): boolean => {
    if (!state.squareImageUrl) return false;

    const halfSize = state.squareSize / 2;
    const inIconBounds = x >= state.iconX - halfSize &&
                        x <= state.iconX + halfSize &&
                        y >= state.iconY - halfSize &&
                        y <= state.iconY + halfSize;

    return inIconBounds;
  }, [state.squareImageUrl, state.squareSize, state.iconX, state.iconY]);

  // Add a new icon
  const addIcon = useCallback((imageUrl: string, x?: number, y?: number) => {
    const newIcon: IconItem = {
      id: Date.now().toString(),
      imageUrl,
      x: x || state.canvasWidth / 2,
      y: y || state.canvasHeight / 2,
      size: 300,
      rotation: 0,
      color: '#eeeeee',
      shadowColor: state.shadowColor,
      shadowBlur: state.shadowBlur,
      shadowOffsetX: state.shadowOffsetX,
      shadowOffsetY: state.shadowOffsetY
    };

    setState(prev => ({
      ...prev,
      icons: [...prev.icons, newIcon]
    }));
  }, [state.canvasWidth, state.canvasHeight, state.shadowColor, state.shadowBlur, state.shadowOffsetX, state.shadowOffsetY]);

  // Update an existing icon
  const updateIcon = useCallback((iconId: string, updates: Partial<IconItem>) => {
    setState(prev => ({
      ...prev,
      icons: prev.icons.map(icon =>
        icon.id === iconId ? { ...icon, ...updates } : icon
      )
    }));
  }, []);

  // Remove an icon
  const removeIcon = useCallback((iconId: string) => {
    setState(prev => ({
      ...prev,
      icons: prev.icons.filter(icon => icon.id !== iconId)
    }));
  }, []);

  // Clear all icons
  const clearIcons = useCallback(() => {
    setState(prev => ({
      ...prev,
      icons: []
    }));
  }, []);

  // Check if point is within text bounds
  const isPointInText = useCallback((x: number, y: number) => {
    const lines = state.text.split('\n');
    const lineHeight = state.textSize * state.lineHeight;
    const totalHeight = lineHeight * lines.length;
    const startY = state.textY - totalHeight / 2;
    const endY = startY + totalHeight;

    // Estimate text width (this is approximate, actual width depends on font metrics)
    const maxLineLength = Math.max(...lines.map(line => line.length));
    const estimatedWidth = maxLineLength * state.textSize * 0.6; // Rough estimate
    const startX = state.textX - estimatedWidth / 2;
    const endX = startX + estimatedWidth;

    return x >= startX && x <= endX && y >= startY && y <= endY;
  }, [state.text, state.textSize, state.lineHeight, state.textX, state.textY]);

  return {
    canvasRef,
    state,
    setState,
    updatePreview,
    saveWebp,
    loadStyles,
    drawSquareImage,
    getCanvasCoordinates,
    isPointInIcon,
    isPointInText,
    addIcon,
    updateIcon,
    removeIcon,
    clearIcons
  };
};