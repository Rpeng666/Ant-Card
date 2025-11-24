"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
  id?: string;
}

const predefinedColors = [
  '#000000', '#ffffff', '#ef4444', '#f97316', '#f59e0b',
  '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6',
  '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6',
  '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#64748b'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  label,
  id
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hexInput, setHexInput] = useState(color);

  const handleColorChange = (newColor: string) => {
    onChange(newColor);
    setHexInput(newColor);
  };

  const handleHexInputSubmit = () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(hexInput)) {
      onChange(hexInput);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
      )}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-10 justify-start gap-2 p-2"
            id={id}
          >
            <div
              className="w-6 h-6 rounded border border-border"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm font-mono uppercase">{color}</span>
            <div className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            {/* Current Color Display */}
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg border-2 border-border"
                style={{ backgroundColor: color }}
              />
              <div className="flex-1">
                <div className="text-sm font-mono uppercase">{color}</div>
                <div className="text-xs text-muted-foreground">
                  RGB: {parseInt(color.slice(1, 3), 16)}, {parseInt(color.slice(3, 5), 16)}, {parseInt(color.slice(5, 7), 16)}
                </div>
              </div>
            </div>

            {/* Native Color Input */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">选择颜色</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="h-10 w-20 rounded border border-input cursor-pointer"
                />
                <Input
                  value={hexInput}
                  onChange={(e) => setHexInput(e.target.value)}
                  placeholder="#000000"
                  className="flex-1 font-mono text-sm"
                  onBlur={handleHexInputSubmit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleHexInputSubmit();
                    }
                  }}
                />
              </div>
            </div>

            {/* Predefined Colors */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">预设颜色</Label>
              <div className="grid grid-cols-10 gap-1">
                {predefinedColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    onClick={() => handleColorChange(presetColor)}
                    className={`w-6 h-6 rounded border-2 transition-all hover:scale-110 ${
                      color.toLowerCase() === presetColor.toLowerCase()
                        ? 'border-primary'
                        : 'border-border'
                    }`}
                    style={{ backgroundColor: presetColor }}
                    title={presetColor}
                  />
                ))}
              </div>
            </div>

            {/* Recent Colors - could be implemented later */}
            <div className="pt-2 border-t">
              <div className="text-xs text-muted-foreground">
                提示：点击预设颜色或输入十六进制颜色值
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};