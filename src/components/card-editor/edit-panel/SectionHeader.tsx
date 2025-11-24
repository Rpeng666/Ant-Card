import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    icon: any;
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    description?: string;
}

export const SectionHeader = ({
    icon: Icon,
    title,
    isExpanded,
    onToggle,
    description
}: SectionHeaderProps) => {
    return (
        <Button
            variant="ghost"
            className={cn(
                "w-full justify-between p-4 h-auto",
                "hover:bg-gray-50 dark:hover:bg-neutral-800/50",
                "border-b border-gray-100 dark:border-neutral-800"
            )}
            onClick={onToggle}
        >
            <div className="flex items-center gap-3">
                <div className={cn(
                    "p-2 rounded-lg",
                    "bg-primary/10 text-primary"
                )}>
                    <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                    <div className="font-medium text-sm">{title}</div>
                    {description && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">{description}</div>
                    )}
                </div>
            </div>
            {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
        </Button>
    );
};
