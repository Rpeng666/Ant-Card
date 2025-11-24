import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardForm } from "@/types/template";

interface QRCodeFormProps {
    form: CardForm;
    onUpdate: (field: string, value: any) => void;
}

export const QRCodeForm = ({ form, onUpdate }: QRCodeFormProps) => {
    return (
        <div className="p-6 space-y-6">
            {/* 二维码标题 */}
            <div className="space-y-3">
                <Label className="text-sm font-medium">二维码标题</Label>
                <Input
                    value={form.qrCodeTitle}
                    onChange={(e) => onUpdate("qrCodeTitle", e.target.value)}
                    placeholder="请输入二维码标题"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
            </div>

            {/* 二维码文本 */}
            <div className="space-y-3">
                <Label className="text-sm font-medium">二维码文本</Label>
                <Input
                    value={form.qrCodeText}
                    onChange={(e) => onUpdate("qrCodeText", e.target.value)}
                    placeholder="请输入二维码下方文本"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
            </div>

            {/* 二维码链接 */}
            <div className="space-y-3">
                <Label className="text-sm font-medium">二维码链接</Label>
                <Input
                    value={form.qrCode}
                    onChange={(e) => onUpdate("qrCode", e.target.value)}
                    placeholder="请输入二维码链接"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
            </div>
        </div>
    );
};
