'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2, Image as ImageIcon, Wand2, Upload, Link, Globe, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface SearchResult {
  url: string;
  title: string;
  description: string;
  thumb: string;
  credit: {
    name: string;
    username: string;
    link: string;
  };
}

interface AIImageSearchProps {
  onImageSelect: (imageUrl: string, imageData: SearchResult | null) => void;
  className?: string;
}

export function AIImageSearch({ onImageSelect, className }: AIImageSearchProps) {
  const [searchText, setSearchText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState('ai-search');
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<SearchResult | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ESC 键关闭预览模态框
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showPreviewModal) {
        closePreviewModal();
      }
    };

    if (showPreviewModal) {
      document.addEventListener('keydown', handleKeyDown);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showPreviewModal]);

  // AI智能搜索
  const handleAISearch = async () => {
    if (!searchText.trim()) {
      toast.error('请输入搜索内容');
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    setSearchResults([]); // 清空之前的结果

    try {
      const response = await fetch('/api/ai/image-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: searchText,
          orientation: 'landscape'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '搜索失败');
      }

      const data = await response.json();
      setSearchResults(data.images || []);

      if (data.images.length === 0) {
        toast.info('未找到相关图片，请尝试其他关键词');
      } else {
        toast.success(`AI 找到 ${data.images.length} 张图片`);
      }
    } catch (error) {
      console.error('AI image search error:', error);
      toast.error(error instanceof Error ? error.message : '搜索失败，请稍后重试');
    } finally {
      setIsSearching(false);
    }
  };

  // URL图片获取
  const handleUrlImage = async () => {
    if (!imageUrl.trim()) {
      toast.error('请输入图片URL');
      return;
    }

    // 验证URL格式
    const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
    if (!urlPattern.test(imageUrl)) {
      toast.error('请输入有效的图片URL');
      return;
    }

    setIsLoadingUrl(true);
    const loadingToast = toast.loading('正在获取图片...');

    try {
      // 创建临时对象验证图片是否可访问
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const result: SearchResult = {
          url: imageUrl,
          title: 'URL图片',
          description: '来自URL的图片',
          thumb: imageUrl,
          credit: {
            name: '用户上传',
            username: 'user',
            link: imageUrl
          }
        };
        onImageSelect(imageUrl, result);
        toast.success('URL图片加载成功', { id: loadingToast });
        setImageUrl('');
        setIsLoadingUrl(false);
      };

      img.onerror = () => {
        toast.error('无法加载图片，请检查URL是否正确', { id: loadingToast });
        setIsLoadingUrl(false);
      };

      // 设置超时
      setTimeout(() => {
        if (!img.complete) {
          toast.error('图片加载超时，请检查网络或更换URL', { id: loadingToast });
          setIsLoadingUrl(false);
        }
      }, 10000);

      img.src = imageUrl;
    } catch (error) {
      toast.error('URL处理失败', { id: loadingToast });
      setIsLoadingUrl(false);
    }
  };

  // 本地文件上传
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('请选择有效的图片文件 (JPG, PNG, GIF, WebP, SVG)');
      return;
    }

    // 验证文件大小 (5MB限制)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('图片文件大小不能超过5MB');
      return;
    }

    const loadingToast = toast.loading('正在处理图片...');

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const searchResult: SearchResult = {
        url: result,
        title: file.name,
        description: `本地文件 - ${(file.size / 1024).toFixed(1)}KB`,
        thumb: result,
        credit: {
          name: '本地上传',
          username: 'local',
          link: ''
        }
      };
      onImageSelect(result, searchResult);
      toast.success(`${file.name} 上传成功`, { id: loadingToast });
    };

    reader.onerror = () => {
      toast.error('文件读取失败', { id: loadingToast });
    };

    reader.readAsDataURL(file);

    // 清空文件输入
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 拖拽事件处理
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        // 创建一个新的FileList对象
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        // 模拟文件输入事件
        const event = {
          target: { files: dataTransfer.files }
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleFileUpload(event);
      } else {
        toast.error('请上传图片文件');
      }
    }
  };

  // 图片预览功能
  const handleImagePreview = (image: SearchResult, e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止选择事件
    setPreviewImage(image);
    setShowPreviewModal(true);
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
    setPreviewImage(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (activeTab === 'ai-search') {
        handleAISearch();
      } else if (activeTab === 'url') {
        handleUrlImage();
      }
    }
  };

  return (
    <div className={className}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Wand2 className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">AI 智能配图</h3>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ai-search" className="text-xs">
              <Wand2 className="h-3 w-3 mr-1" />
              AI搜索
            </TabsTrigger>
            <TabsTrigger value="url" className="text-xs">
              <Link className="h-3 w-3 mr-1" />
              URL链接
            </TabsTrigger>
            <TabsTrigger value="upload" className="text-xs">
              <Upload className="h-3 w-3 mr-1" />
              本地上传
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-search" className="space-y-3 mt-3">
            <div className="flex gap-2">
              <Input
                placeholder="输入卡片主题，AI 自动找图..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isSearching}
                className="flex-1 text-sm"
              />
              <Button
                onClick={handleAISearch}
                disabled={isSearching || !searchText.trim()}
                size="sm"
                className="btn-gradient-blue"
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="url" className="space-y-3 mt-3">
            <div className="flex gap-2">
              <Input
                placeholder="输入图片URL (https://example.com/image.jpg)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoadingUrl}
                className="flex-1 text-sm"
              />
              <Button
                onClick={handleUrlImage}
                disabled={!imageUrl.trim() || isLoadingUrl}
                size="sm"
                className="btn-gradient-pink"
              >
                {isLoadingUrl ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Globe className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              支持 JPG、PNG、GIF、WebP 格式的图片链接
            </p>
          </TabsContent>

          <TabsContent value="upload" className="space-y-3 mt-3">
            <div
              className={`btn-upload border-2 border-dashed rounded-lg p-4 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-blue-500 bg-blue-50 scale-105'
                  : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Camera className={`h-10 w-10 mx-auto mb-3 transition-colors ${isDragging ? 'text-blue-500 animate-bounce' : 'text-gray-400'}`} />
              <p className={`text-sm mb-2 font-medium transition-colors ${isDragging ? 'text-blue-600' : 'text-gray-600'}`}>
                {isDragging ? '松开以上传图片 🎉' : '点击或拖拽上传图片 📸'}
              </p>
              <p className="text-xs text-gray-500">
                支持 JPG、PNG、GIF、WebP 格式，最大 5MB
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Search Results - 仅显示AI搜索结果 */}
        {activeTab === 'ai-search' && hasSearched && (
          <div className="space-y-3">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto animate-fade-up">
                {searchResults.map((image, index) => (
                  <Card
                    key={index}
                    className="card-hover-lift cursor-pointer hover:ring-2 hover:ring-primary transition-all duration-300 overflow-hidden group image-hover-zoom animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => onImageSelect(image.url, image)}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-video">
                        <img
                          src={image.thumb}
                          alt={image.title}
                          className="w-full h-full object-cover transition-transform duration-300"
                        />
                        <div className="card-hover-overlay">
                          <div className="flex gap-2 mb-2">
                            <button
                              onClick={(e) => handleImagePreview(image, e)}
                              className="bg-white/90 hover:bg-white text-black px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 transform hover:scale-105"
                              title="预览图片"
                            >
                              <ImageIcon className="h-4 w-4" />
                            </button>
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-2 rounded-lg text-xs font-medium">
                              选择图片
                            </div>
                          </div>
                          {/* 图片信息 */}
                          <div className="text-center">
                            <p className="text-white text-sm font-medium mb-1">{image.title}</p>
                            <p className="text-white/80 text-xs">作者: {image.credit.name}</p>
                          </div>
                        </div>
                        {/* 悬停时的快速信息条 */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-xs truncate font-medium">{image.title}</p>
                          <p className="text-white/80 text-xs truncate">@{image.credit.username}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              !isSearching && (
                <div className="text-center py-6 text-muted-foreground">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">未找到相关图片</p>
                  <p className="text-xs">尝试更具体的关键词</p>
                </div>
              )
            )}
          </div>
        )}

        {/* Tips - 仅显示AI搜索的提示 */}
        {activeTab === 'ai-search' && searchResults.length > 0 && (
          <div className="text-xs text-muted-foreground border-t pt-2">
            <p>💡 提示：图片来自 Unsplash，可免费使用</p>
          </div>
        )}

        {/* Example searches - 仅在AI搜索标签页显示 */}
        {activeTab === 'ai-search' && !hasSearched && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">试试这些：</p>
            <div className="flex flex-wrap gap-2">
              {['自然风景', '科技感', '商务会议', '创意设计', '学习成长'].map((example, index) => (
                <Button
                  key={example}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 btn-enhanced animate-fade-up hover:scale-105 transition-transform"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => {
                    setSearchText(example);
                    setTimeout(handleAISearch, 100);
                  }}
                >
                  ✨ {example}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* 图片预览模态框 */}
        {showPreviewModal && previewImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-fade-in"
            onClick={closePreviewModal}
          >
            <div
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl animate-fade-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 关闭按钮 */}
              <button
                onClick={closePreviewModal}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                title="关闭预览"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 图片容器 */}
              <div className="relative">
                <img
                  src={previewImage.url}
                  alt={previewImage.title}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>

              {/* 图片信息 */}
              <div className="p-4 border-t bg-white">
                <h3 className="font-medium text-lg mb-2">{previewImage.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{previewImage.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    作者: <a
                      href={previewImage.credit.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {previewImage.credit.name} (@{previewImage.credit.username})
                    </a>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="btn-enhanced hover:scale-105 transition-transform"
                      onClick={() => {
                        navigator.clipboard.writeText(previewImage.url);
                        toast.success('图片链接已复制 📋');
                      }}
                    >
                      📋 复制链接
                    </Button>
                    <Button
                      className="btn-primary-gradient hover:scale-105 transition-transform"
                      onClick={() => {
                        onImageSelect(previewImage.url, previewImage);
                        closePreviewModal();
                        toast.success('图片已选择 ✨');
                      }}
                    >
                      ✨ 选择此图片
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}