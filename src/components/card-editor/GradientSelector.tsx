'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  getAllGradientOptions,
  getFontColorForGradient,
  GradientClass,
  getDisplayNameForGradient
} from '@/lib/gradientConfig';

interface CardEditorGradientSelectorProps {
  selectedGradient?: GradientClass;
  onGradientChange: (gradient: GradientClass) => void;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10'
};

export function CardEditorGradientSelector({
  selectedGradient,
  onGradientChange,
  className,
  showLabel = true,
  size = 'md'
}: CardEditorGradientSelectorProps) {
  const gradientOptions = getAllGradientOptions();

  return (
    <div className={cn('space-y-3', className)}>
      {showLabel && (
        <div>
          <h4 className="text-sm font-medium mb-2">渐变背景</h4>
          <p className="text-xs text-muted-foreground">
            选择精美渐变作为卡片背景
          </p>
        </div>
      )}

      <div className="grid grid-cols-7 gap-2">
        {gradientOptions.map((option) => (
          <div key={option.value} className="relative group">
            <button
              onClick={() => onGradientChange(option.value)}
              className={cn(
                'relative rounded-md border-2 transition-all duration-200 overflow-hidden',
                sizeClasses[size],
                selectedGradient === option.value
                  ? 'border-primary ring-2 ring-primary/20 scale-110'
                  : 'border-border hover:border-primary/50 hover:scale-105',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
              )}
              title={option.label}
            >
              <div
                className={cn(
                  'w-full h-full',
                  option.value
                )}
              />

              {/* 选中状态指示器 */}
              {selectedGradient === option.value && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              )}
            </button>

            {/* 悬浮提示 */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
              {option.label}
            </div>
          </div>
        ))}
      </div>

      {selectedGradient && (
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <span>当前选择:</span>
          <div className="flex items-center gap-2">
            <div className={cn('w-4 h-4 rounded', selectedGradient)}></div>
            <span className="font-medium">{getDisplayNameForGradient(selectedGradient)}</span>
          </div>
        </div>
      )}

      {/* 预设推荐 */}
      {showLabel && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">热门推荐:</p>
          <div className="flex flex-wrap gap-1">
            {gradientOptions.slice(0, 4).map((option) => (
              <button
                key={option.value}
                onClick={() => onGradientChange(option.value)}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-md border text-xs transition-colors',
                  selectedGradient === option.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50 hover:bg-primary/5'
                )}
              >
                <div className={cn('w-3 h-3 rounded', option.value)}></div>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}