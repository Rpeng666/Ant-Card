"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCardStore } from "@/store/useCardStore";
import { Loader2 } from "lucide-react";
import { useLocale } from "next-intl";

function CardEditorPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const { createCard } = useCardStore();

  useEffect(() => {
    // 获取 URL 中的 template 参数
    const templateId = searchParams.get("template");

    // 自动创建新卡片并跳转到编辑器
    const newCardId = createCard(templateId || undefined);
    if (newCardId) {
      router.replace(`/${locale}/app/card-editor/${newCardId}`);
    }
  }, [createCard, router, locale, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">正在创建新卡片...</p>
      </div>
    </div>
  );
}

export default function CardEditorPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">正在创建新卡片...</p>
        </div>
      </div>
    }>
      <CardEditorPageContent />
    </Suspense>
  );
}