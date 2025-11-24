import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardForm } from "@/types/template";

interface OtherSettingsFormProps {
    form: CardForm;
    onUpdate: (field: string, value: any) => void;
}

export const OtherSettingsForm = ({ form, onUpdate }: OtherSettingsFormProps) => {
    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
                {/* 字数统计标签 */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium">字数统计标签</Label>
                    <Input
                        value={form.textCount}
                        onChange={(e) => onUpdate("textCount", e.target.value)}
                        placeholder="例如: 字数"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                {/* 字数统计数值 */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium">字数统计数值</Label>
                    <Input
                        type="number"
                        value={form.textCountNum}
                        onChange={(e) => onUpdate("textCountNum", parseInt(e.target.value) || 0)}
                        placeholder="请输入字数"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                </div>
            </div>
        </div>
    );
};
