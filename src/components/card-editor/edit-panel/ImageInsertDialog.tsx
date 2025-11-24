import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ImageInsertDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onInsert: (url: string, alt: string) => void;
}

export const ImageInsertDialog = ({ open, onOpenChange, onInsert }: ImageInsertDialogProps) => {
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');

    const handleInsert = () => {
        if (!imageUrl.trim()) return;
        onInsert(imageUrl, imageAlt);
        setImageUrl('');
        setImageAlt('');
        onOpenChange(false);
    };

    const handleCancel = () => {
        onOpenChange(false);
        setImageUrl('');
        setImageAlt('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>插入图片</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="image-url">图片URL</Label>
                        <Input
                            id="image-url"
                            placeholder="https://example.com/image.jpg"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image-alt">图片描述 (可选)</Label>
                        <Input
                            id="image-alt"
                            placeholder="输入图片描述"
                            value={imageAlt}
                            onChange={(e) => setImageAlt(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                        >
                            取消
                        </Button>
                        <Button
                            onClick={handleInsert}
                            disabled={!imageUrl.trim()}
                        >
                            插入图片
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
