import { MCPTool } from './types';

// 定义所有可用的MCP工具
export const MCP_TOOLS: MCPTool[] = [
  {
    name: "create_card",
    description: "创建一个新的卡片",
    inputSchema: {
      type: "object",
      properties: {
        template: {
          type: "string",
          description: "卡片模板类型",
          enum: ["default", "minimalist", "business", "creative", "academic"]
        },
        title: {
          type: "string",
          description: "卡片标题"
        },
        content: {
          type: "string",
          description: "卡片内容"
        },
        author: {
          type: "string",
          description: "作者名称"
        }
      },
      required: ["title"]
    }
  },
  {
    name: "update_card_content",
    description: "更新卡片的内容信息",
    inputSchema: {
      type: "object",
      properties: {
        cardId: {
          type: "string",
          description: "卡片ID"
        },
        title: {
          type: "string",
          description: "卡片标题"
        },
        content: {
          type: "string",
          description: "卡片内容"
        },
        author: {
          type: "string",
          description: "作者名称"
        },
        date: {
          type: "string",
          description: "日期"
        },
        qrCode: {
          type: "string",
          description: "二维码内容/链接"
        },
        qrCodeTitle: {
          type: "string",
          description: "二维码标题"
        },
        qrCodeText: {
          type: "string",
          description: "二维码描述文本"
        }
      },
      required: ["cardId"]
    }
  },
  {
    name: "update_card_style",
    description: "更新卡片的样式设置",
    inputSchema: {
      type: "object",
      properties: {
        cardId: {
          type: "string",
          description: "卡片ID"
        },
        fontScale: {
          type: "number",
          description: "字体缩放比例",
          minimum: 0.5,
          maximum: 2
        },
        color: {
          type: "string",
          description: "文字颜色（十六进制）"
        },
        backgroundColor: {
          type: "string",
          description: "背景颜色（十六进制）"
        },
        padding: {
          type: "string",
          description: "内边距（CSS格式）"
        },
        borderRadius: {
          type: "string",
          description: "圆角半径（CSS格式）"
        },
        font: {
          type: "string",
          description: "字体名称"
        },
        align: {
          type: "string",
          description: "文本对齐方式",
          enum: ["left", "center", "right"]
        },
        aspectRatio: {
          type: "string",
          description: "宽高比",
          enum: ["1:1", "4:3", "16:9", "3:4", "9:16", "custom"]
        },
        width: {
          type: "number",
          description: "卡片宽度（像素）"
        },
        height: {
          type: "number",
          description: "卡片高度（像素）"
        }
      },
      required: ["cardId"]
    }
  },
  {
    name: "update_card_switches",
    description: "更新卡片的显示开关设置",
    inputSchema: {
      type: "object",
      properties: {
        cardId: {
          type: "string",
          description: "卡片ID"
        },
        showAuthor: {
          type: "boolean",
          description: "是否显示作者"
        },
        showDate: {
          type: "boolean",
          description: "是否显示日期"
        },
        showTitle: {
          type: "boolean",
          description: "是否显示标题"
        },
        showQRCode: {
          type: "boolean",
          description: "是否显示二维码"
        },
        showPageNum: {
          type: "boolean",
          description: "是否显示页码"
        },
        showWatermark: {
          type: "boolean",
          description: "是否显示水印"
        }
      },
      required: ["cardId"]
    }
  },
  {
    name: "export_card",
    description: "导出卡片为指定格式，支持PNG、JPEG、PDF等格式",
    inputSchema: {
      type: "object",
      properties: {
        cardId: {
          type: "string",
          description: "卡片ID"
        },
        format: {
          type: "string",
          description: "导出格式",
          enum: ["png", "jpeg", "svg", "pdf"]
        },
        quality: {
          type: "number",
          description: "图片质量（0-1），仅对JPEG有效",
          minimum: 0.1,
          maximum: 1,
          default: 0.9
        },
        scale: {
          type: "number",
          description: "缩放比例，数值越高图片越清晰",
          minimum: 1,
          maximum: 4,
          default: 2
        },
        backgroundColor: {
          type: "string",
          description: "背景颜色（十六进制），JPEG格式默认为白色，PNG格式默认为透明"
        }
      },
      required: ["cardId", "format"]
    }
  },
  {
    name: "get_card_info",
    description: "获取卡片的详细信息",
    inputSchema: {
      type: "object",
      properties: {
        cardId: {
          type: "string",
          description: "卡片ID"
        }
      },
      required: ["cardId"]
    }
  },
  {
    name: "list_cards",
    description: "获取所有卡片的列表",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "返回数量限制"
        },
        offset: {
          type: "number",
          description: "偏移量"
        }
      }
    }
  },
  {
    name: "delete_card",
    description: "删除指定的卡片",
    inputSchema: {
      type: "object",
      properties: {
        cardId: {
          type: "string",
          description: "要删除的卡片ID"
        }
      },
      required: ["cardId"]
    }
  },
  {
    name: "duplicate_card",
    description: "复制一个现有的卡片",
    inputSchema: {
      type: "object",
      properties: {
        cardId: {
          type: "string",
          description: "要复制的卡片ID"
        },
        newTitle: {
          type: "string",
          description: "新卡片的标题"
        }
      },
      required: ["cardId"]
    }
  },
  {
    name: "change_card_template",
    description: "更改卡片的模板",
    inputSchema: {
      type: "object",
      properties: {
        cardId: {
          type: "string",
          description: "卡片ID"
        },
        template: {
          type: "string",
          description: "新的模板类型",
          enum: ["default", "minimalist", "business", "creative", "academic", "frame", "transparent", "dark-day", "memo", "bento", "story", "code"]
        }
      },
      required: ["cardId", "template"]
    }
  },
  {
    name: "export_card_server",
    description: "服务器端导出卡片（使用Puppeteer生成高质量图片）",
    inputSchema: {
      type: "object",
      properties: {
        cardId: {
          type: "string",
          description: "卡片ID"
        },
        format: {
          type: "string",
          description: "导出格式",
          enum: ["png", "jpeg", "pdf"]
        },
        quality: {
          type: "number",
          description: "图片质量（0-1）",
          minimum: 0.1,
          maximum: 1,
          default: 0.95
        },
        width: {
          type: "number",
          description: "导出宽度（像素）",
          default: 1200
        },
        height: {
          type: "number",
          description: "导出高度（像素）",
          default: 1200
        },
        fullPage: {
          type: "boolean",
          description: "是否导出完整页面",
          default: false
        }
      },
      required: ["cardId", "format"]
    }
  }
];

// 工具名称到工具对象的映射
export const TOOL_MAP = MCP_TOOLS.reduce((map, tool) => {
  map[tool.name] = tool;
  return map;
}, {} as Record<string, MCPTool>);