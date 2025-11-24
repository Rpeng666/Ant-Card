"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  QrCode,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCardStore } from "@/store/useCardStore";
import { Card } from "@/components/ui/card";
import { BasicInfoForm } from "./edit-panel/BasicInfoForm";
import { QRCodeForm } from "./edit-panel/QRCodeForm";
import { OtherSettingsForm } from "./edit-panel/OtherSettingsForm";
import { SectionHeader } from "./edit-panel/SectionHeader";

export const CardEditPanel = () => {
  const { activeCard, activeCardId, updateCardForm, selectedEditField, setSelectedEditField } = useCardStore();
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    qrcode: false,
    other: false,
  });

  const currentCard = activeCard?.cards?.[0];

  // 防抖定时器引用
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  // 根据选中的编辑字段自动展开对应区域
  useEffect(() => {
    if (selectedEditField) {
      if (['title', 'content', 'author', 'date', 'icon', 'pagination'].includes(selectedEditField)) {
        setExpandedSections(prev => ({ ...prev, basic: true }));
      }
    }
  }, [selectedEditField]);

  // 清理防抖定时器
  useEffect(() => {
    return () => {
      // 组件卸载时清除所有定时器
      Object.values(debounceTimers.current).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  if (!currentCard || !activeCardId) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <FileText className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg font-medium">请选择一个卡片进行编辑</p>
        <p className="text-gray-500 text-sm mt-2">从左侧模板面板选择或创建新卡片</p>
      </div>
    );
  }

  const handleFormUpdate = (field: string, value: string | number) => {
    if (activeCardId) {
      // 对于内容字段使用较短的防抖时间，其他字段立即更新
      const delay = field === 'content' ? 100 : 0;

      if (delay === 0) {
        // 立即更新非内容字段
        updateCardForm(activeCardId, { [field]: value });
      } else {
        // 对内容字段使用防抖
        if (debounceTimers.current[field]) {
          clearTimeout(debounceTimers.current[field]);
        }

        debounceTimers.current[field] = setTimeout(() => {
          updateCardForm(activeCardId, { [field]: value });
        }, delay);
      }
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="h-full overflow-y-auto"
      >

        <div className="space-y-0">
          {/* 基础信息 */}
          <Card className="rounded-none border-x-0 border-t-0">
            <SectionHeader
              icon={FileText}
              title="基础信息"
              isExpanded={expandedSections.basic}
              onToggle={() => toggleSection("basic")}
              description="编辑卡片的标题、内容等基本信息"
            />
            <AnimatePresence>
              {expandedSections.basic && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <BasicInfoForm
                    form={currentCard.form}
                    selectedEditField={selectedEditField}
                    onUpdate={handleFormUpdate}
                    onClearSelection={() => setSelectedEditField(null)}
                    isExpanded={expandedSections.basic}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* 二维码设置 */}
          <Card className="rounded-none border-x-0 border-t-0">
            <SectionHeader
              icon={QrCode}
              title="二维码设置"
              isExpanded={expandedSections.qrcode}
              onToggle={() => toggleSection("qrcode")}
              description="配置卡片中的二维码信息"
            />
            <AnimatePresence>
              {expandedSections.qrcode && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <QRCodeForm
                    form={currentCard.form}
                    onUpdate={handleFormUpdate}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* 其他设置 */}
          <Card className="rounded-none border-x-0 border-t-0">
            <SectionHeader
              icon={Settings}
              title="其他设置"
              isExpanded={expandedSections.other}
              onToggle={() => toggleSection("other")}
              description="字数统计等其他配置选项"
            />
            <AnimatePresence>
              {expandedSections.other && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <OtherSettingsForm
                    form={currentCard.form}
                    onUpdate={handleFormUpdate}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </motion.div>
    </>
  );
};
