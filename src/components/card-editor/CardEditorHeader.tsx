"use client";
import { useTranslations, useLocale } from "next-intl";
import { AlertCircle, Sun, Moon, Languages } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useCardStore } from "@/store/useCardStore";
import { getThemeConfig } from "@/theme/themeConfig";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export const CardEditorHeader = () => {
  const t = useTranslations("workbench");
  const tLang = useTranslations("language");
  const router = useRouter();
  const locale = useLocale();
  const { activeCard, updateCardName } = useCardStore();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const switchLanguage = (newLocale: string) => {
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(zh|en)/, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-16 border-b border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between px-6"
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/${locale}/app/dashboard`)}
          className="text-gray-600 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          ← {t("backToDashboard")}
        </Button>

        <div className="h-6 w-px bg-gray-200 dark:bg-neutral-800" />

        <div className="flex items-center gap-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">卡片编辑器</h4>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  在这里编辑您的卡片内容、样式和布局设置。
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>

          <Input
            value="卡片编辑器"
            className="w-48 h-8 text-sm"
            placeholder="卡片名称"
            readOnly
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* 语言切换按钮 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title={tLang("switch")}
            >
              <Languages className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={() => switchLanguage('zh')}
              className={locale === 'zh' ? 'bg-gray-100 dark:bg-gray-800' : ''}
            >
              🇨🇳 {tLang("chinese")}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => switchLanguage('en')}
              className={locale === 'en' ? 'bg-gray-100 dark:bg-gray-800' : ''}
            >
              🇺🇸 {tLang("english")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 主题切换按钮 */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </motion.header>
  );
};