import { CardCreateParams, CardUpdateParams, CardStyleParams, CardExportParams } from './types';

// 模拟的卡片存储（实际项目中应该使用数据库或状态管理）
interface CardData {
  id: string;
  template: string;
  form: {
    title: string;
    content: string;
    author: string;
    date: string;
    qrCode: string;
    qrCodeTitle: string;
    qrCodeText: string;
  };
  style: {
    fontScale: number;
    color: string;
    backgroundColor: string;
    padding: string;
    borderRadius: string;
    font: string;
    align: "left" | "center" | "right";
    aspectRatio: string;
    width: number;
    height: number;
    opacity: number;
    blur: number;
  };
  switchConfig: {
    showAuthor: boolean;
    showDate: boolean;
    showTitle: boolean;
    showQRCode: boolean;
    showPageNum: boolean;
    showWatermark: boolean;
  };
  createdAt: number;
  updatedAt: number;
}

export class CardOperations {
  private cards: Map<string, CardData> = new Map();

  // 创建卡片
  async createCard(params: CardCreateParams) {
    const cardId = `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const defaultCard: CardData = {
      id: cardId,
      template: params.template || 'default',
      form: {
        title: params.title || '新卡片',
        content: params.content || '这是卡片内容',
        author: params.author || '作者',
        date: new Date().toLocaleDateString('zh-CN'),
        qrCode: 'https://example.com',
        qrCodeTitle: 'Ant Card',
        qrCodeText: '扫描二维码'
      },
      style: {
        fontScale: 1,
        color: '#000000',
        backgroundColor: '#ffffff',
        padding: '32px',
        borderRadius: '16px',
        font: 'sans-serif',
        align: 'left',
        aspectRatio: '1:1',
        width: 440,
        height: 440,
        opacity: 1,
        blur: 0,
        ...params.style
      },
      switchConfig: {
        showAuthor: true,
        showDate: true,
        showTitle: true,
        showQRCode: true,
        showPageNum: false,
        showWatermark: false
      },
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.cards.set(cardId, defaultCard);

    return {
      success: true,
      cardId,
      message: '卡片创建成功',
      card: defaultCard
    };
  }

  // 更新卡片内容
  async updateCardContent(params: CardUpdateParams) {
    const card = this.cards.get(params.cardId);
    if (!card) {
      throw new Error(`卡片不存在: ${params.cardId}`);
    }

    // 更新表单数据
    Object.keys(params.updates).forEach(key => {
      if (params.updates[key as keyof typeof params.updates] !== undefined) {
        (card.form as any)[key] = params.updates[key as keyof typeof params.updates];
      }
    });

    card.updatedAt = Date.now();
    this.cards.set(params.cardId, card);

    return {
      success: true,
      message: '卡片内容更新成功',
      card
    };
  }

  // 更新卡片样式
  async updateCardStyle(params: CardStyleParams) {
    const card = this.cards.get(params.cardId);
    if (!card) {
      throw new Error(`卡片不存在: ${params.cardId}`);
    }

    // 更新样式
    Object.keys(params.style).forEach(key => {
      if (params.style[key as keyof typeof params.style] !== undefined) {
        (card.style as any)[key] = params.style[key as keyof typeof params.style];
      }
    });

    card.updatedAt = Date.now();
    this.cards.set(params.cardId, card);

    return {
      success: true,
      message: '卡片样式更新成功',
      card
    };
  }

  // 更新卡片开关配置
  async updateCardSwitches(params: { cardId: string; [key: string]: any }) {
    const card = this.cards.get(params.cardId);
    if (!card) {
      throw new Error(`卡片不存在: ${params.cardId}`);
    }

    // 更新开关配置
    Object.keys(params).forEach(key => {
      if (key !== 'cardId' && params[key] !== undefined) {
        (card.switchConfig as any)[key] = params[key];
      }
    });

    card.updatedAt = Date.now();
    this.cards.set(params.cardId, card);

    return {
      success: true,
      message: '卡片显示设置更新成功',
      card
    };
  }

  // 导出卡片
  async exportCard(params: CardExportParams) {
    const card = this.cards.get(params.cardId);
    if (!card) {
      throw new Error(`卡片不存在: ${params.cardId}`);
    }

    // 生成导出配置，供前端使用
    const exportConfig = {
      cardId: params.cardId,
      format: params.format,
      quality: params.options?.quality || 0.9,
      scale: params.options?.scale || 2,
      backgroundColor: params.options?.backgroundColor || (params.format === 'jpeg' ? '#ffffff' : null),
      cardData: {
        template: card.template,
        form: card.form,
        style: card.style,
        switchConfig: card.switchConfig
      }
    };

    return {
      success: true,
      message: `卡片准备导出为${params.format.toUpperCase()}格式`,
      exportConfig,
      instructions: {
        frontend: {
          action: "use_html2canvas",
          selector: `[data-card-id="${params.cardId}"]`,
          options: {
            backgroundColor: exportConfig.backgroundColor,
            scale: exportConfig.scale,
            useCORS: true,
            allowTaint: true
          },
          output: {
            format: params.format,
            quality: exportConfig.quality,
            filename: `${card.form.title.replace(/[^\w\s-]/g, '') || 'card'}.${params.format}`
          }
        }
      }
    };
  }

  // 获取卡片信息
  async getCardInfo(params: { cardId: string }) {
    const card = this.cards.get(params.cardId);
    if (!card) {
      throw new Error(`卡片不存在: ${params.cardId}`);
    }

    return {
      success: true,
      card
    };
  }

  // 获取卡片列表
  async listCards(params: { limit?: number; offset?: number } = {}) {
    const allCards = Array.from(this.cards.values());
    const { limit = 10, offset = 0 } = params;
    
    const cards = allCards
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(offset, offset + limit);

    return {
      success: true,
      cards,
      total: allCards.length,
      limit,
      offset
    };
  }

  // 删除卡片
  async deleteCard(params: { cardId: string }) {
    const card = this.cards.get(params.cardId);
    if (!card) {
      throw new Error(`卡片不存在: ${params.cardId}`);
    }

    this.cards.delete(params.cardId);

    return {
      success: true,
      message: '卡片删除成功',
      deletedCard: card
    };
  }

  // 复制卡片
  async duplicateCard(params: { cardId: string; newTitle?: string }) {
    const originalCard = this.cards.get(params.cardId);
    if (!originalCard) {
      throw new Error(`卡片不存在: ${params.cardId}`);
    }

    const newCardId = `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newCard: CardData = {
      ...originalCard,
      id: newCardId,
      form: {
        ...originalCard.form,
        title: params.newTitle || `${originalCard.form.title} (副本)`
      },
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.cards.set(newCardId, newCard);

    return {
      success: true,
      message: '卡片复制成功',
      cardId: newCardId,
      card: newCard
    };
  }

  // 更改卡片模板
  async changeCardTemplate(params: { cardId: string; template: string }) {
    const card = this.cards.get(params.cardId);
    if (!card) {
      throw new Error(`卡片不存在: ${params.cardId}`);
    }

    card.template = params.template;
    card.updatedAt = Date.now();
    this.cards.set(params.cardId, card);

    return {
      success: true,
      message: '卡片模板更新成功',
      card
    };
  }

  // 服务器端导出卡片（使用Puppeteer）
  async exportCardServer(params: {
    cardId: string;
    format: 'png' | 'jpeg' | 'pdf';
    quality?: number;
    width?: number;
    height?: number;
    fullPage?: boolean;
  }) {
    const card = this.cards.get(params.cardId);
    if (!card) {
      throw new Error(`卡片不存在: ${params.cardId}`);
    }

    try {
      // 动态导入Puppeteer（仅在服务器端使用）
      const puppeteer = require('puppeteer');

      // 创建浏览器实例
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu'
        ]
      });

      const page = await browser.newPage();

      // 设置视口大小
      const viewportWidth = params.width || 1200;
      const viewportHeight = params.height || 1200;
      await page.setViewport({
        width: viewportWidth,
        height: viewportHeight,
        deviceScaleFactor: 2
      });

      // 创建HTML内容用于渲染
      const htmlContent = this.generateCardHTML(card, viewportWidth, viewportHeight);

      // 设置页面内容
      await page.setContent(htmlContent, {
        waitUntil: 'networkidle0'
      });

      let result: any;

      if (params.format === 'pdf') {
        // PDF导出
        const pdfBuffer = await page.pdf({
          format: 'A4',
          printBackground: true,
          margin: {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px'
          }
        });

        result = {
          success: true,
          data: pdfBuffer.toString('base64'),
          format: 'pdf',
          filename: `${card.form.title.replace(/[^\w\s-]/g, '') || 'card'}.pdf`,
          mimeType: 'application/pdf'
        };
      } else {
        // 图片导出
        const screenshot = await page.screenshot({
          type: params.format,
          quality: params.format === 'jpeg' ? Math.round((params.quality || 0.95) * 100) : undefined,
          fullPage: params.fullPage || false,
          omitBackground: params.format === 'png'
        });

        result = {
          success: true,
          data: screenshot.toString('base64'),
          format: params.format,
          filename: `${card.form.title.replace(/[^\w\s-]/g, '') || 'card'}.${params.format}`,
          mimeType: `image/${params.format}`
        };
      }

      await browser.close();

      return {
        success: true,
        message: `卡片成功导出为${params.format.toUpperCase()}格式`,
        ...result
      };

    } catch (error) {
      throw new Error(`服务器端导出失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // 生成卡片HTML内容
  private generateCardHTML(card: any, width: number, height: number) {
    return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${card.form.title}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
        }

        .card-container {
          width: ${width}px;
          height: ${height}px;
          background-color: ${card.style.backgroundColor};
          border-radius: ${card.style.borderRadius};
          padding: ${card.style.padding};
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          color: ${card.style.color};
          font-size: ${16 * (card.style.fontScale || 1)}px;
          text-align: ${card.style.align};
          overflow: hidden;
          position: relative;
        }

        .card-title {
          font-size: 1.5em;
          font-weight: bold;
          margin-bottom: 1em;
          ${!card.switchConfig?.showTitle ? 'display: none;' : ''}
        }

        .card-content {
          line-height: 1.6;
          margin-bottom: 1em;
          ${!card.switchConfig?.showContent ? 'display: none;' : ''}
        }

        .card-author {
          font-style: italic;
          color: ${card.style.color}99;
          ${!card.switchConfig?.showAuthor ? 'display: none;' : ''}
        }

        .card-date {
          font-size: 0.9em;
          color: ${card.style.color}99;
          margin-bottom: 1em;
          ${!card.switchConfig?.showDate ? 'display: none;' : ''}
        }
      </style>
    </head>
    <body>
      <div class="card-container" data-card-id="${card.id}">
        ${card.switchConfig?.showDate ? `<div class="card-date">${card.form.date}</div>` : ''}
        ${card.switchConfig?.showTitle ? `<div class="card-title">${card.form.title}</div>` : ''}
        ${card.switchConfig?.showContent ? `<div class="card-content">${card.form.content}</div>` : ''}
        ${card.switchConfig?.showAuthor ? `<div class="card-author">— ${card.form.author}</div>` : ''}
      </div>
    </body>
    </html>
    `;
  }

  // 获取所有卡片（用于调试）
  getAllCards() {
    return Array.from(this.cards.values());
  }

  // 清空所有卡片（用于测试）
  clearAllCards() {
    this.cards.clear();
    return {
      success: true,
      message: '所有卡片已清空'
    };
  }
}