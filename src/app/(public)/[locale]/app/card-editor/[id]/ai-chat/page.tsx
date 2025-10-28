"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MCPChat } from "@/components/ai/MCPChat";
import { useCardStore } from "@/store/useCardStore";
import { toast } from "sonner";

export default function AICardChatPage() {
  const params = useParams();
  const router = useRouter();
  const { activeCard, setActiveCard, updateCardForm, updateCardStyle } = useCardStore();
  const [isLoading, setIsLoading] = useState(true);

  const cardId = params.id as string;

  useEffect(() => {
    if (cardId) {
      // 设置当前活动卡片
      setActiveCard(cardId);
      setIsLoading(false);
    }
  }, [cardId, setActiveCard]);

  const handleCardOperation = async (operation: string, params: any) => {
    try {
      switch (operation) {
        case 'create_card':
          // 创建新卡片的逻辑
          toast.success('新卡片创建成功！');
          break;
          
        case 'update_card_content':
          if (cardId) {
            updateCardForm(cardId, params);
            toast.success('卡片内容更新成功！');
          }
          break;
          
        case 'update_card_style':
          if (cardId) {
            updateCardStyle(cardId, params);
            toast.success('卡片样式更新成功！');
          }
          break;
          
        case 'export_card':
          // 导出卡片的逻辑
          toast.success('卡片导出成功！');
          break;
          
        default:
          console.log('Unknown operation:', operation, params);
      }
    } catch (error) {
      console.error('Card operation failed:', error);
      toast.error('操作失败，请重试');
    }
  };

  const goBack = () => {
    router.push(`/app/card-editor/${cardId}`);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <Bot className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">正在加载AI助手...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* 头部导航 */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-card/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              返回编辑器
            </Button>
            
            <div className="h-6 w-px bg-border" />
            
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-semibold">AI 卡片助手</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {activeCard && (
              <div className="text-sm text-muted-foreground">
                当前卡片: {activeCard.cards?.[0]?.form?.title || '未命名卡片'}
              </div>
            )}
          </div>
        </div>
      </motion.header>

      {/* 主要内容区域 */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* AI 聊天界面 */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full"
            >
              <MCPChat onCardOperation={handleCardOperation} />
            </motion.div>
          </div>
          
          {/* 侧边栏 - 当前卡片信息 */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">当前卡片</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activeCard?.cards?.[0] ? (
                    <>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">标题</label>
                        <p className="text-sm">{activeCard.cards[0].form.title || '未设置'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">内容</label>
                        <p className="text-sm line-clamp-3">{activeCard.cards[0].form.content || '未设置'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">作者</label>
                        <p className="text-sm">{activeCard.cards[0].form.author || '未设置'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">模板</label>
                        <p className="text-sm">{activeCard.currentTemplate || 'default'}</p>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">没有找到卡片信息</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">使用提示</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm space-y-1">
                    <p className="font-medium">你可以这样说：</p>
                    <ul className="text-muted-foreground space-y-1 text-xs">
                      <li>• &quot;把标题改为技术分享&quot;</li>
                      <li>• &quot;字体调大一点&quot;</li>
                      <li>• &quot;改成蓝色背景&quot;</li>
                      <li>• &quot;导出为PNG格式&quot;</li>
                      <li>• &quot;创建一个新卡片&quot;</li>
                      <li>• &quot;切换到商务模板&quot;</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}