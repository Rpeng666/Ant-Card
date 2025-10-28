"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCardStore } from "@/store/useCardStore";
import { Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
export default function CardEditorPage() {
  const router = useRouter();
  const locale = useLocale();
  const { createCard } = useCardStore();

  useEffect(() => {
    // 自动创建新卡片并跳转到编辑器
    const newCardId = createCard();
    if (newCardId) {
      router.replace(`/${locale}/app/card-editor/${newCardId}`);
    }
  }, [createCard, router, locale]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">正在创建新卡片...</p>
      </div>
    </div>
  );
}