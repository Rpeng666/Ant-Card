"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useCardStore } from "@/store/useCardStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CardTestPage() {
  const router = useRouter();
  const locale = useLocale();
  const { cards, createCard, setActiveCard } = useCardStore();

  const cardList = Object.values(cards);

  useEffect(() => {
    // 如果没有卡片，创建一个测试卡片
    if (cardList.length === 0) {
      createCard();
    }
  }, [cardList.length, createCard]);

  const handleOpenEditor = (cardId: string) => {
    router.push(`/${locale}/app/card-editor/${cardId}`);
  };

  const handleCreateNewCard = () => {
    const newCardId = createCard();
    if (newCardId) {
      router.push(`/${locale}/app/card-editor/${newCardId}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">卡片编辑器测试</h1>
          <p className="text-gray-600 mt-2">测试新的卡片数据结构和编辑器功能</p>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleCreateNewCard} size="lg">
            创建新卡片
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cardList.map((card) => (
            <Card key={card.currentTemplate} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  {card.cards[0]?.cardName || "未命名卡片"}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  模板: {card.currentTemplate}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>标题:</strong> {card.cards[0]?.form.title || "无标题"}
                  </p>
                  <p className="text-sm">
                    <strong>作者:</strong> {card.cards[0]?.form.author || "无作者"}
                  </p>
                  <p className="text-sm">
                    <strong>内容:</strong> {card.cards[0]?.form.content?.substring(0, 50) || "无内容"}...
                  </p>
                </div>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => handleOpenEditor(card.currentTemplate)}
                >
                  编辑卡片
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {cardList.length === 0 && (
          <div className="text-center text-gray-500">
            <p>暂无卡片，点击上方按钮创建新卡片</p>
          </div>
        )}
      </div>
    </div>
  );
}