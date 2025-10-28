"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Edit2, Menu, PanelLeft, Minimize2 } from "lucide-react";
import { CardEditorHeader } from "@/components/card-editor/CardEditorHeader";
import { CardSidePanel } from "@/components/card-editor/CardSidePanel";
import { CardEditPanel } from "@/components/card-editor/CardEditPanel";
import { CardPreviewPanel } from "@/components/card-preview/CardPreviewPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCardStore } from "@/store/useCardStore";
import { useParams } from "next/navigation";

const LAYOUT_CONFIG = {
  DEFAULT: [25, 50, 25], // 左侧面板25%，中间预览50%，右侧面板25%
  SIDE_COLLAPSED: [0, 75, 25],
  EDIT_COLLAPSED: [25, 75, 0],
  BOTH_COLLAPSED: [0, 100, 0],
};

const DragHandle = memo(() => (
  <ResizableHandle
    className={cn(
      "w-1 bg-gray-200 hover:bg-gray-300 transition-colors",
      "dark:bg-neutral-800 dark:hover:bg-neutral-700"
    )}
  />
));

DragHandle.displayName = "DragHandle";

const LayoutControls = memo(
  ({
    sidePanelCollapsed,
    editPanelCollapsed,
    previewPanelCollapsed,
    toggleSidePanel,
    toggleEditPanel,
    togglePreviewPanel,
  }: {
    sidePanelCollapsed: boolean;
    editPanelCollapsed: boolean;
    previewPanelCollapsed: boolean;
    toggleSidePanel: () => void;
    toggleEditPanel: () => void;
    togglePreviewPanel: () => void;
  }) => (
    <div
      className={cn(
        "absolute bottom-6 left-1/2 -translate-x-1/2",
        "flex items-center gap-2 z-10 p-2 rounded-full",
        "dark:bg-neutral-900/80 dark:border dark:border-neutral-800 bg-white/80 border border-gray-200",
        "backdrop-blur-sm shadow-lg"
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={sidePanelCollapsed ? "secondary" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={toggleSidePanel}
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              {sidePanelCollapsed ? "展开侧边栏" : "收起侧边栏"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className={cn("h-5 w-px mx-1", "dark:bg-neutral-800 bg-gray-200")} />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={editPanelCollapsed ? "secondary" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={toggleEditPanel}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              {editPanelCollapsed ? "展开编辑面板" : "收起编辑面板"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={previewPanelCollapsed ? "secondary" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={togglePreviewPanel}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              {previewPanelCollapsed ? "展开预览面板" : "收起预览面板"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
);

LayoutControls.displayName = "LayoutControls";

export default function CardEditor() {
  const params = useParams();
  const cardId = params.id as string;
  const { setActiveCard } = useCardStore();
  
  const [sidePanelCollapsed, setSidePanelCollapsed] = useState(false);
  const [editPanelCollapsed, setEditPanelCollapsed] = useState(false);
  const [previewPanelCollapsed, setPreviewPanelCollapsed] = useState(false);
  const [panelSizes, setPanelSizes] = useState<number[]>(LAYOUT_CONFIG.DEFAULT);

  // 设置当前活跃的卡片
  useEffect(() => {
    if (cardId) {
      setActiveCard(cardId);
    }
  }, [cardId, setActiveCard]);

  const toggleSidePanel = () => {
    setSidePanelCollapsed(!sidePanelCollapsed);
  };

  const toggleEditPanel = () => {
    setEditPanelCollapsed(!editPanelCollapsed);
  };

  const togglePreviewPanel = () => {
    setPreviewPanelCollapsed(!previewPanelCollapsed);
  };

  const updateLayout = (sizes: number[]) => {
    setPanelSizes(sizes);
  };

  useEffect(() => {
    let newSizes = [];

    if (sidePanelCollapsed && editPanelCollapsed) {
      // 两个面板都收起，只显示预览
      newSizes = LAYOUT_CONFIG.BOTH_COLLAPSED;
    } else if (sidePanelCollapsed) {
      // 左侧面板收起
      newSizes = LAYOUT_CONFIG.SIDE_COLLAPSED;
    } else if (editPanelCollapsed) {
      // 右侧面板收起
      newSizes = LAYOUT_CONFIG.EDIT_COLLAPSED;
    } else {
      // 默认布局：左侧模板面板，中间预览，右侧编辑面板
      newSizes = LAYOUT_CONFIG.DEFAULT;
    }

    updateLayout([...newSizes]);
  }, [sidePanelCollapsed, editPanelCollapsed, previewPanelCollapsed]);

  return (
    <main
      className={cn(
        "w-full min-h-screen overflow-hidden",
        "bg-white text-gray-900",
        "dark:bg-neutral-900 dark:text-neutral-200"
      )}
    >
      <CardEditorHeader />
      {/* 桌面端布局 */}
      <div className="hidden md:block h-[calc(100vh-64px)]">
        <ResizablePanelGroup
          key={panelSizes?.join("-")}
          direction="horizontal"
          className={cn(
            "h-full",
            "border border-gray-200 bg-white",
            "dark:border-neutral-800 dark:bg-neutral-900/50"
          )}
        >
          {/* 左侧模板面板 */}
          {!sidePanelCollapsed && (
            <>
              <ResizablePanel
                id="side-panel"
                order={1}
                defaultSize={panelSizes?.[0]}
                minSize={20}
                className={cn(
                  "dark:bg-neutral-900 dark:border-r dark:border-neutral-800"
                )}
              >
                <div className="h-full overflow-y-auto">
                  <CardSidePanel />
                </div>
              </ResizablePanel>
              <DragHandle />
            </>
          )}

          {/* 中间预览面板 */}
          <ResizablePanel
            id="preview-panel"
            order={2}
            collapsible={false}
            defaultSize={panelSizes?.[1]}
            minSize={30}
            className="bg-gray-50 dark:bg-neutral-950"
          >
            <div className="h-full overflow-y-auto">
              <CardPreviewPanel
                sidePanelCollapsed={sidePanelCollapsed}
                editPanelCollapsed={editPanelCollapsed}
                previewPanelCollapsed={previewPanelCollapsed}
                toggleSidePanel={toggleSidePanel}
                toggleEditPanel={toggleEditPanel}
              />
            </div>
          </ResizablePanel>

          {/* 右侧编辑面板 */}
          {!editPanelCollapsed && (
            <>
              <DragHandle />
              <ResizablePanel
                id="edit-panel"
                order={3}
                minSize={20}
                defaultSize={panelSizes?.[2]}
                className={cn(
                  "dark:bg-neutral-900 dark:border-l dark:border-neutral-800"
                )}
              >
                <div className="h-full">
                  <CardEditPanel />
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>

      {/* 移动端布局 */}
      <div className="md:hidden h-[calc(100vh-64px)]">
        <div className="h-full overflow-y-auto">
          <CardPreviewPanel
            sidePanelCollapsed={true}
            editPanelCollapsed={true}
            previewPanelCollapsed={false}
            toggleSidePanel={toggleSidePanel}
            toggleEditPanel={toggleEditPanel}
          />
        </div>
      </div>

      <LayoutControls
        sidePanelCollapsed={sidePanelCollapsed}
        editPanelCollapsed={editPanelCollapsed}
        previewPanelCollapsed={previewPanelCollapsed}
        toggleSidePanel={toggleSidePanel}
        toggleEditPanel={toggleEditPanel}
        togglePreviewPanel={togglePreviewPanel}
      />
    </main>
  );
}