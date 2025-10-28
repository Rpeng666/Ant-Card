// MCP (Model Context Protocol) 类型定义
export interface MCPRequest {
  id: string;
  method: string;
  params: any;
}

export interface MCPResponse {
  id: string;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
}

// 卡片操作相关类型
export interface CardCreateParams {
  template?: string;
  title?: string;
  content?: string;
  author?: string;
  style?: Partial<CardStyle>;
}

export interface CardUpdateParams {
  cardId: string;
  updates: {
    title?: string;
    content?: string;
    author?: string;
    date?: string;
    qrCode?: string;
    qrCodeTitle?: string;
    qrCodeText?: string;
  };
}

export interface CardStyleParams {
  cardId: string;
  style: {
    fontScale?: number;
    color?: string;
    backgroundColor?: string;
    padding?: string;
    borderRadius?: string;
    font?: string;
    align?: "left" | "center" | "right";
    aspectRatio?: string;
    width?: number;
    height?: number;
  };
}

export interface CardExportParams {
  cardId: string;
  format: "png" | "jpeg" | "svg" | "pdf";
  options?: {
    quality?: number;
    scale?: number;
    backgroundColor?: string;
  };
}

export interface CardStyle {
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
}

// AI 模型配置
export interface AIModelConfig {
  provider: "openai" | "claude" | "local";
  model: string;
  apiKey?: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
}

// 对话上下文
export interface ConversationContext {
  sessionId: string;
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: number;
  }>;
  currentCard?: string;
  tools: MCPTool[];
}