"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Shuffle, Image as ImageIcon } from 'lucide-react';

interface RandomImagePickerProps {
  onImageSelect: (imageUrl: string) => void;
}

const imageTypes = [
  { value: 'nature', label: '自然风景', description: '美丽的自然景观背景' },
  { value: 'city', label: '城市建筑', description: '现代城市风光背景' },
  { value: 'tech', label: '科技数码', description: '科技主题背景图片' },
  { value: 'food', label: '美食料理', description: '诱人的食物背景图片' },
  { value: 'animal', label: '可爱动物', description: '萌宠动物背景' },
  { value: 'art', label: '艺术创作', description: '艺术风格背景图片' },
  { value: 'abstract', label: '抽象背景', description: '抽象艺术背景' },
  { value: 'texture', label: '纹理材质', description: '纹理材质背景' },
];

export const RandomImagePicker: React.FC<RandomImagePickerProps> = ({ onImageSelect }) => {
  const [selectedType, setSelectedType] = useState('nature');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const fetchRandomImage = async (type?: string) => {
    const imageType = type || selectedType;
    setIsLoading(true);

    try {
      // 映射我们的类型到API类型
      const apiTypeMap: Record<string, string> = {
        'nature': 'nature',
        'city': 'city',
        'tech': 'tech',
        'food': 'food',
        'animal': 'animal',
        'art': 'art',
        'abstract': 'art',
        'texture': 'nature'
      };

      const apiType = apiTypeMap[imageType] || 'nature';
      const response = await fetch(`/api/image/random?type=${apiType}&seed=${Date.now()}`);
      const data = await response.json();

      if (data.url) {
        setPreviewUrl(data.url);
        onImageSelect(data.url);
      }
    } catch (error) {
      console.error('获取随机背景图片失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setPreviewUrl('');
  };

  const currentType = imageTypes.find(t => t.value === selectedType);

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image-type" className="text-sm font-medium">
            背景图片类型
          </Label>
          <Select value={selectedType} onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="选择图片类型" />
            </SelectTrigger>
            <SelectContent>
              {imageTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs text-muted-foreground">{type.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => fetchRandomImage()}
            disabled={isLoading}
            className="flex-1"
            variant="default"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                获取中...
              </>
            ) : (
              <>
                <Shuffle className="w-4 h-4 mr-2" />
                随机背景
              </>
            )}
          </Button>

          {previewUrl && (
            <Button
              onClick={() => fetchRandomImage()}
              disabled={isLoading}
              variant="outline"
              size="icon"
              title="换一张"
            >
              <Shuffle className="w-4 h-4" />
            </Button>
          )}
        </div>

        {previewUrl && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">预览</Label>
            <div className="relative rounded-lg overflow-hidden border bg-muted/20">
              <img
                src={previewUrl}
                alt={currentType?.label}
                className="w-full h-32 object-cover"
                onError={(e) => {
                  e.currentTarget.src = '';
                }}
              />
              <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {currentType?.label}
              </div>
            </div>
          </div>
        )}

        {!previewUrl && !isLoading && (
          <div className="flex items-center justify-center h-24 border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">点击&quot;随机背景&quot;获取背景图片</p>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          💡 背景图片来源于网络，仅供学习参考使用
        </div>
      </CardContent>
    </Card>
  );
};