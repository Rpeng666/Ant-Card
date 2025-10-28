"use client";
import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ResizableCardProps {
  children: React.ReactNode;
  width: number;
  height?: number;
  onResize: (width: number, height?: number) => void;
  className?: string;
  style?: React.CSSProperties;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

export const ResizableCard: React.FC<ResizableCardProps> = ({
  children,
  width,
  height,
  onResize,
  className,
  style,
  minWidth = 200,
  maxWidth = 800,
  minHeight = 100,
  maxHeight = 1200,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeDirection(direction);
    
    startPos.current = { x: e.clientX, y: e.clientY };
    startSize.current = { width, height: height || 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;

      let newWidth = startSize.current.width;
      let newHeight = startSize.current.height;

      if (direction.includes('right')) {
        newWidth = Math.max(minWidth, Math.min(maxWidth, startSize.current.width + deltaX));
      }
      if (direction.includes('left')) {
        newWidth = Math.max(minWidth, Math.min(maxWidth, startSize.current.width - deltaX));
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(minHeight, Math.min(maxHeight, startSize.current.height + deltaY));
      }
      if (direction.includes('top')) {
        newHeight = Math.max(minHeight, Math.min(maxHeight, startSize.current.height - deltaY));
      }

      // 总是传递高度值，如果没有初始高度则使用计算出的高度
      onResize(newWidth, newHeight || startSize.current.height || 400);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection("");
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [width, height, onResize, minWidth, maxWidth, minHeight, maxHeight]);

  return (
    <div
      ref={cardRef}
      className={cn("relative", className)}
      style={{
        width: `${width}px`,
        ...(height ? { height: `${height}px` } : {}),
        ...style,
      }}
    >
      {children}
      
      {/* 调整手柄 */}
      {/* 右边缘 */}
      <div
        className={cn(
          "absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-gray-400 hover:bg-gray-500 transition-all",
          "opacity-0 hover:opacity-60",
          isResizing && resizeDirection.includes('right') && "opacity-60"
        )}
        onMouseDown={(e) => handleMouseDown(e, 'right')}
      />
      
      {/* 底边缘 */}
      <div
        className={cn(
          "absolute bottom-0 left-0 w-full h-1 cursor-ns-resize bg-gray-400 hover:bg-gray-500 transition-all",
          "opacity-0 hover:opacity-60",
          isResizing && resizeDirection.includes('bottom') && "opacity-60"
        )}
        onMouseDown={(e) => handleMouseDown(e, 'bottom')}
      />
      
      {/* 右下角 */}
      <div
        className={cn(
          "absolute bottom-0 right-0 w-3 h-3 cursor-nw-resize bg-gray-400 hover:bg-gray-500 rounded-tl-sm transition-all",
          "opacity-0 hover:opacity-60",
          isResizing && resizeDirection.includes('right') && resizeDirection.includes('bottom') && "opacity-60"
        )}
        onMouseDown={(e) => handleMouseDown(e, 'right-bottom')}
      />

      {/* 调整提示 */}
      {isResizing && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {width}px {height ? `× ${height}px` : ''}
        </div>
      )}
    </div>
  );
};