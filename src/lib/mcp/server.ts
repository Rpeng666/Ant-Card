import { MCPRequest, MCPResponse, MCPTool, ConversationContext } from './types';
import { MCP_TOOLS, TOOL_MAP } from './tools';
import { CardOperations } from './operations';

export class MCPServer {
  private cardOps: CardOperations;
  private contexts: Map<string, ConversationContext> = new Map();

  constructor() {
    this.cardOps = new CardOperations();
  }

  // 处理MCP请求
  async handleRequest(request: MCPRequest): Promise<MCPResponse> {
    try {
      switch (request.method) {
        case 'tools/list':
          return this.listTools(request);
        case 'tools/call':
          return await this.callTool(request);
        case 'session/create':
          return this.createSession(request);
        case 'session/get':
          return this.getSession(request);
        default:
          return {
            id: request.id,
            error: {
              code: -32601,
              message: `Method not found: ${request.method}`
            }
          };
      }
    } catch (error) {
      return {
        id: request.id,
        error: {
          code: -32603,
          message: 'Internal error',
          data: error instanceof Error ? error.message : String(error)
        }
      };
    }
  }

  // 列出所有可用工具
  private listTools(request: MCPRequest): MCPResponse {
    return {
      id: request.id,
      result: {
        tools: MCP_TOOLS
      }
    };
  }

  // 调用指定工具
  private async callTool(request: MCPRequest): Promise<MCPResponse> {
    const { name, arguments: args } = request.params;
    
    if (!TOOL_MAP[name]) {
      return {
        id: request.id,
        error: {
          code: -32602,
          message: `Unknown tool: ${name}`
        }
      };
    }

    try {
      let result;
      
      switch (name) {
        case 'create_card':
          result = await this.cardOps.createCard(args);
          break;
        case 'update_card_content':
          result = await this.cardOps.updateCardContent(args);
          break;
        case 'update_card_style':
          result = await this.cardOps.updateCardStyle(args);
          break;
        case 'update_card_switches':
          result = await this.cardOps.updateCardSwitches(args);
          break;
        case 'export_card':
          result = await this.cardOps.exportCard(args);
          break;
        case 'get_card_info':
          result = await this.cardOps.getCardInfo(args);
          break;
        case 'list_cards':
          result = await this.cardOps.listCards(args);
          break;
        case 'delete_card':
          result = await this.cardOps.deleteCard(args);
          break;
        case 'duplicate_card':
          result = await this.cardOps.duplicateCard(args);
          break;
        case 'change_card_template':
          result = await this.cardOps.changeCardTemplate(args);
          break;
        case 'export_card_server':
          result = await this.cardOps.exportCardServer(args);
          break;
        default:
          throw new Error(`Tool implementation not found: ${name}`);
      }

      return {
        id: request.id,
        result
      };
    } catch (error) {
      return {
        id: request.id,
        error: {
          code: -32603,
          message: 'Tool execution failed',
          data: error instanceof Error ? error.message : String(error)
        }
      };
    }
  }

  // 创建会话
  private createSession(request: MCPRequest): MCPResponse {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const context: ConversationContext = {
      sessionId,
      messages: [],
      tools: MCP_TOOLS
    };

    this.contexts.set(sessionId, context);

    return {
      id: request.id,
      result: {
        sessionId,
        tools: MCP_TOOLS
      }
    };
  }

  // 获取会话信息
  private getSession(request: MCPRequest): MCPResponse {
    const { sessionId } = request.params;
    const context = this.contexts.get(sessionId);

    if (!context) {
      return {
        id: request.id,
        error: {
          code: -32602,
          message: `Session not found: ${sessionId}`
        }
      };
    }

    return {
      id: request.id,
      result: context
    };
  }

  // 添加消息到会话
  addMessage(sessionId: string, role: 'user' | 'assistant' | 'system', content: string) {
    const context = this.contexts.get(sessionId);
    if (context) {
      context.messages.push({
        role,
        content,
        timestamp: Date.now()
      });
    }
  }

  // 设置当前操作的卡片
  setCurrentCard(sessionId: string, cardId: string) {
    const context = this.contexts.get(sessionId);
    if (context) {
      context.currentCard = cardId;
    }
  }

  // 获取会话上下文
  getContext(sessionId: string): ConversationContext | undefined {
    return this.contexts.get(sessionId);
  }

  // 清理过期会话
  cleanupSessions(maxAge: number = 24 * 60 * 60 * 1000) { // 默认24小时
    const now = Date.now();
    const sessionsToDelete: string[] = [];
    
    this.contexts.forEach((context, sessionId) => {
      const lastMessage = context.messages[context.messages.length - 1];
      if (lastMessage && now - lastMessage.timestamp > maxAge) {
        sessionsToDelete.push(sessionId);
      }
    });

    sessionsToDelete.forEach(sessionId => {
      this.contexts.delete(sessionId);
    });
  }
}