import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getFileHandle, verifyPermission } from "@/utils/fileSystem";
import { CardExportData, Card, CardTemplate, CardForm, CardStyle, CardSwitchConfig } from "../types/template";
import { DEFAULT_TEMPLATES } from "@/config";
import { generateUUID } from "@/utils/uuid";

interface CardStore {
  // 卡片数据
  cards: Record<string, CardExportData>;
  activeCardId: string | null;
  activeCard: CardExportData | null;

  // 编辑状态
  selectedEditField: string | null;
  setSelectedEditField: (field: string | null) => void;

  // 基础操作
  createCard: (templateId?: string) => string;
  deleteCard: (cardId: string) => void;
  duplicateCard: (cardId: string) => string;
  updateCard: (cardId: string, data: Partial<CardExportData>) => void;
  setActiveCard: (cardId: string) => void;
  updateCardFromFile: (card: CardExportData) => void;
  addCard: (card: CardExportData) => string;

  // 卡片内容操作
  updateCardForm: (cardId: string, form: Partial<Card["form"]>) => void;
  updateCardStyle: (cardId: string, style: Partial<Card["style"]>) => void;
  updateCardSwitchConfig: (cardId: string, switchConfig: Partial<Card["switchConfig"]>) => void;
  updateCardTemplate: (cardId: string, templateId: string) => void;
  updateCardLanguage: (cardId: string, language: string) => void;
  updateCardName: (cardId: string, cardName: string) => void;

  // 批量操作
  updateCardsInExport: (cardId: string, cards: Card[]) => void;
  addCardToExport: (cardId: string, card: Card) => void;
  removeCardFromExport: (cardId: string, cardIndex: number) => void;
  mergeCardsInExport: (cardId: string) => void;
}

// 同步卡片到文件系统
const syncCardToFile = async (
  cardData: CardExportData,
  prevCard?: CardExportData
) => {
  try {
    const handle = await getFileHandle("syncDirectory");
    if (!handle) {
      console.warn("No directory handle found");
      return;
    }

    const hasPermission = await verifyPermission(handle);
    if (!hasPermission) {
      console.warn("No permission to write to directory");
      return;
    }

    const dirHandle = handle as FileSystemDirectoryHandle;

    // 如果标题改变了，删除旧文件
    if (
      prevCard &&
      prevCard.cards[0]?.cardName !== cardData.cards[0]?.cardName
    ) {
      try {
        const oldFileName = `${prevCard.cards[0]?.cardName || 'untitled'}.json`;
        await dirHandle.removeEntry(oldFileName);
      } catch (error) {
        console.warn("Error deleting old file:", error);
      }
    }

    const fileName = `${cardData.cards[0]?.cardName || 'untitled'}.json`;
    const fileHandle = await dirHandle.getFileHandle(fileName, {
      create: true,
    });

    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(cardData, null, 2));
    await writable.close();
  } catch (error) {
    console.error("Error syncing card to file:", error);
  }
};

export const useCardStore = create(
  persist<CardStore>(
    (set, get) => ({
      cards: {},
      activeCardId: null,
      activeCard: null,
      selectedEditField: null,

      setSelectedEditField: (field) => {
        set({ selectedEditField: field });
      },

      createCard: (templateId) => {
        const locale =
          typeof document !== "undefined"
            ? document.cookie
                .split("; ")
                .find((row) => row.startsWith("NEXT_LOCALE="))
                ?.split("=")[1] || "zh"
            : "zh";

        const id = generateUUID();
        const template = templateId
          ? DEFAULT_TEMPLATES.find((t) => t.id === templateId)
          : DEFAULT_TEMPLATES[0];

        if (!template) {
          console.error("Template not found");
          return id;
        }

        // 创建默认的卡片数据
        const defaultForm: CardForm = {
          icon: "",
          date: new Date().toLocaleDateString(locale === "en" ? "en-US" : "zh-CN"),
          title: locale === "en" ? "New Card" : "新卡片",
          content: locale === "en" ? "Card content" : "卡片内容",
          author: locale === "en" ? "Author" : "作者",
          textCount: locale === "en" ? "Word count" : "字数",
          qrCodeTitle: "Ant Card",
          qrCodeText: locale === "en" ? "Scan QR Code" : "扫描二维码",
          pagination: "01",
          qrCode: "https://antcard.airouter.tech",
          textCountNum: 0,
          ...template.defaultForm,
        };

        const defaultStyle: CardStyle = {
          align: "left",
          backgroundName: "vertical-blue-color-29",
          backShadow: "",
          backShadowPositionX: 50,
          backShadowPositionY: 50,
          backShadowSize: 100,
          backShadowRotation: 0,
          font: "Alibaba-PuHuiTi-Regular",
          width: 440,
          ratio: "",
          height: 0,
          fontScale: 1,
          padding: "30px",
          borderRadius: "15px",
          color: "#ffffff",
          opacity: 1,
          blur: 0,
          blurInset: "",
          backgroundAngle: "0deg",
          containerBg: "",
          containerRotate: 0,
          aspectRatio: "1:1", // 默认宽高比

          // 新增背景相关属性的默认值
          backgroundType: "solid",
          gradientClass: undefined,
          backgroundImage: undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",

          lineHeights: {
            content: "",
          },
          letterSpacings: {
            content: "",
          },
          rowSpacings: {
            content: "",
          },
          ...template.defaultStyle,
        };

        const defaultSwitchConfig: CardSwitchConfig = {
          showIcon: true,
          showDate: true,
          showTitle: true,
          showContent: true,
          showAuthor: true,
          showTextCount: true,
          showQRCode: true,
          showPageNum: false,
          showWatermark: true,
          ...template.defaultSwitchConfig,
        };

        const newCard: CardExportData = {
          exportTime: new Date().toISOString(),
          totalCards: 1,
          currentTemplate: template.id,
          cards: [
            {
              form: defaultForm,
              style: defaultStyle,
              switchConfig: defaultSwitchConfig,
              cardName: `${locale === "en" ? "Card" : "卡片"} ${id.slice(0, 6)}`,
              temp: template.id,
              language: locale as "zh" | "en",
            },
          ],
        };

        set((state) => ({
          cards: {
            ...state.cards,
            [id]: newCard,
          },
          activeCardId: id,
          activeCard: newCard,
        }));

        syncCardToFile(newCard);
        return id;
      },

      updateCard: (cardId, data) => {
        set((state) => {
          const card = state.cards[cardId];
          if (!card) return state;

          const updatedCard = {
            ...card,
            ...data,
            exportTime: new Date().toISOString(),
          };

          syncCardToFile(updatedCard, card);

          return {
            cards: {
              ...state.cards,
              [cardId]: updatedCard,
            },
            activeCard:
              state.activeCardId === cardId ? updatedCard : state.activeCard,
          };
        });
      },

      updateCardFromFile: (card) => {
        const cardId = generateUUID(); // 为导入的卡片生成新ID
        set((state) => ({
          cards: {
            ...state.cards,
            [cardId]: card,
          },
        }));
      },

      deleteCard: (cardId) => {
        set((state) => {
          const card = state.cards[cardId];
          if (!card) return state;

          const { [cardId]: _, ...rest } = state.cards;
          
          // 异步删除文件
          (async () => {
            try {
              const handle = await getFileHandle("syncDirectory");
              if (!handle) return;

              const hasPermission = await verifyPermission(handle);
              if (!hasPermission) return;

              const dirHandle = handle as FileSystemDirectoryHandle;
              try {
                const fileName = `${card.cards[0]?.cardName || 'untitled'}.json`;
                await dirHandle.removeEntry(fileName);
              } catch (error) {
                console.warn("Error deleting card file:", error);
              }
            } catch (error) {
              console.error("Error deleting card file:", error);
            }
          })();

          return {
            cards: rest,
            activeCardId: state.activeCardId === cardId ? null : state.activeCardId,
            activeCard: state.activeCardId === cardId ? null : state.activeCard,
          };
        });
      },

      duplicateCard: (cardId) => {
        const newId = generateUUID();
        const originalCard = get().cards[cardId];
        if (!originalCard) return newId;

        const locale =
          typeof document !== "undefined"
            ? document.cookie
                .split("; ")
                .find((row) => row.startsWith("NEXT_LOCALE="))
                ?.split("=")[1] || "zh"
            : "zh";

        const duplicatedCard: CardExportData = {
          ...originalCard,
          exportTime: new Date().toISOString(),
          cards: originalCard.cards.map((card) => ({
            ...card,
            cardName: `${card.cardName} (${locale === "en" ? "Copy" : "复制"})`,
          })),
        };

        set((state) => ({
          cards: {
            ...state.cards,
            [newId]: duplicatedCard,
          },
          activeCardId: newId,
          activeCard: duplicatedCard,
        }));

        syncCardToFile(duplicatedCard);
        return newId;
      },

      setActiveCard: (cardId) => {
        const card = get().cards[cardId];
        if (card) {
          set({ activeCard: card, activeCardId: cardId });
        }
      },

      updateCardForm: (cardId, form) => {
        const { cards, updateCard } = get();
        const card = cards[cardId];
        if (!card || !card.cards[0]) return;

        const updatedCards = [...card.cards];
        updatedCards[0] = {
          ...updatedCards[0],
          form: {
            ...updatedCards[0].form,
            ...form,
          },
        };

        updateCard(cardId, { cards: updatedCards });
      },

      updateCardStyle: (cardId, style) => {
        const { cards, updateCard } = get();
        const card = cards[cardId];
        if (!card || !card.cards[0]) return;

        const updatedCards = [...card.cards];
        updatedCards[0] = {
          ...updatedCards[0],
          style: {
            ...updatedCards[0].style,
            ...style,
          },
        };

        updateCard(cardId, { cards: updatedCards });
      },

      updateCardSwitchConfig: (cardId, switchConfig) => {
        const { cards, updateCard } = get();
        const card = cards[cardId];
        if (!card || !card.cards[0]) return;

        const updatedCards = [...card.cards];
        updatedCards[0] = {
          ...updatedCards[0],
          switchConfig: {
            ...updatedCards[0].switchConfig,
            ...switchConfig,
          },
        };

        updateCard(cardId, { cards: updatedCards });
      },

      updateCardTemplate: (cardId, templateId) => {
        const { cards, updateCard } = get();
        const card = cards[cardId];
        if (!card || !card.cards[0]) return;

        const template = DEFAULT_TEMPLATES.find((t) => t.id === templateId);
        if (!template) return;

        const currentCard = card.cards[0];
        const updatedCards = [...card.cards];
        
        // 保持用户的内容数据，只更新样式和开关配置
        updatedCards[0] = {
          ...currentCard,
          temp: templateId,
          style: {
            ...currentCard.style,
            ...template.defaultStyle,
            // 保持用户自定义的尺寸设置
            width: currentCard.style.width,
            height: currentCard.style.height,
            aspectRatio: currentCard.style.aspectRatio,
          },
          switchConfig: {
            ...currentCard.switchConfig,
            ...template.defaultSwitchConfig,
          },
        };

        updateCard(cardId, {
          currentTemplate: templateId,
          cards: updatedCards,
        });
      },

      updateCardLanguage: (cardId, language) => {
        const { cards, updateCard } = get();
        const card = cards[cardId];
        if (!card || !card.cards[0]) return;

        const validLanguage = language === "en" ? "en" : "zh";
        const updatedCards = [...card.cards];
        updatedCards[0] = {
          ...updatedCards[0],
          language: validLanguage,
        };

        updateCard(cardId, { cards: updatedCards });
      },

      updateCardName: (cardId, cardName) => {
        const { cards, updateCard } = get();
        const card = cards[cardId];
        if (!card || !card.cards[0]) return;

        const updatedCards = [...card.cards];
        updatedCards[0] = {
          ...updatedCards[0],
          cardName,
        };

        updateCard(cardId, { cards: updatedCards });
      },

      updateCardsInExport: (cardId, newCards) => {
        const { updateCard } = get();
        updateCard(cardId, {
          cards: newCards,
          totalCards: newCards.length,
        });
      },

      addCardToExport: (cardId, newCard) => {
        const { cards, updateCard } = get();
        const card = cards[cardId];
        if (!card) return;

        const updatedCards = [...card.cards, newCard];
        updateCard(cardId, {
          cards: updatedCards,
          totalCards: updatedCards.length,
        });
      },

      removeCardFromExport: (cardId, cardIndex) => {
        const { cards, updateCard } = get();
        const card = cards[cardId];
        if (!card || cardIndex < 0 || cardIndex >= card.cards.length) return;

        const updatedCards = card.cards.filter((_, index) => index !== cardIndex);
        updateCard(cardId, {
          cards: updatedCards,
          totalCards: updatedCards.length,
        });
      },

      mergeCardsInExport: (cardId) => {
        const { cards, updateCard } = get();
        const card = cards[cardId];
        if (!card || card.cards.length <= 1) return;

        // 合并所有卡片的内容
        const mergedContent = card.cards.map(c => c.form.content).join('\n\n');
        
        // 获取原始标题（去掉序号部分）
        const originalTitle = card.cards[0].form.title.replace(/\s*\(\d+\/\d+\)$/, '');
        
        // 创建合并后的单个卡片
        const mergedCard: Card = {
          ...card.cards[0],
          form: {
            ...card.cards[0].form,
            content: mergedContent,
            title: originalTitle
          }
        };

        updateCard(cardId, {
          cards: [mergedCard],
          totalCards: 1,
        });
      },

      addCard: (card: CardExportData) => {
        const id = generateUUID();
        set((state) => ({
          cards: {
            ...state.cards,
            [id]: card,
          },
          activeCardId: id,
          activeCard: card,
        }));

        syncCardToFile(card);
        return id;
      },
    }),
    {
      name: "card-storage",
    }
  )
);