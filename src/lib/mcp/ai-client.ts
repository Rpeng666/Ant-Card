import { AIModelConfig } from './types';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  toolCalls?: Array<{
    name: string;
    arguments: any;
  }>;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export abstract class AIClient {
  protected config: AIModelConfig;

  constructor(config: AIModelConfig) {
    this.config = config;
  }

  abstract chat(messages: AIMessage[], tools?: any[]): Promise<AIResponse>;
  abstract validateConfig(): boolean;
}

// OpenAI客户端
export class OpenAIClient extends AIClient {
  async chat(messages: AIMessage[], tools?: any[]): Promise<AIResponse> {
    if (!this.config.apiKey) {
      throw new Error('OpenAI API key is required');
    }

    const response = await fetch(this.config.baseUrl || 'https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.model || 'gpt-4',
        messages,
        tools: tools?.map(tool => ({
          type: 'function',
          function: {
            name: tool.name,
            description: tool.description,
            parameters: tool.inputSchema
          }
        })),
        tool_choice: tools && tools.length > 0 ? 'auto' : undefined,
        temperature: this.config.temperature || 0.7,
        max_tokens: this.config.maxTokens || 2000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const choice = data.choices[0];

    const result: AIResponse = {
      content: choice.message.content || '',
      usage: data.usage ? {
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
        totalTokens: data.usage.total_tokens
      } : undefined
    };

    // 处理工具调用
    if (choice.message.tool_calls) {
      result.toolCalls = choice.message.tool_calls.map((call: any) => ({
        name: call.function.name,
        arguments: JSON.parse(call.function.arguments)
      }));
    }

    return result;
  }

  validateConfig(): boolean {
    return !!this.config.apiKey && !!this.config.model;
  }
}

// Claude客户端
export class ClaudeClient extends AIClient {
  async chat(messages: AIMessage[], tools?: any[]): Promise<AIResponse> {
    if (!this.config.apiKey) {
      throw new Error('Claude API key is required');
    }

    // 转换消息格式
    const claudeMessages = messages.filter(m => m.role !== 'system').map(m => ({
      role: m.role,
      content: m.content
    }));

    const systemMessage = messages.find(m => m.role === 'system')?.content;

    const response = await fetch(this.config.baseUrl || 'https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.config.model || 'claude-3-sonnet-20240229',
        messages: claudeMessages,
        system: systemMessage,
        tools: tools?.map(tool => ({
          name: tool.name,
          description: tool.description,
          input_schema: tool.inputSchema
        })),
        max_tokens: this.config.maxTokens || 2000,
        temperature: this.config.temperature || 0.7
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Claude API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();

    const result: AIResponse = {
      content: data.content[0]?.text || '',
      usage: data.usage ? {
        promptTokens: data.usage.input_tokens,
        completionTokens: data.usage.output_tokens,
        totalTokens: data.usage.input_tokens + data.usage.output_tokens
      } : undefined
    };

    // 处理工具调用
    const toolUse = data.content.find((c: any) => c.type === 'tool_use');
    if (toolUse) {
      result.toolCalls = [{
        name: toolUse.name,
        arguments: toolUse.input
      }];
    }

    return result;
  }

  validateConfig(): boolean {
    return !!this.config.apiKey && !!this.config.model;
  }
}

// 本地模型客户端（支持Ollama等）
export class LocalClient extends AIClient {
  async chat(messages: AIMessage[], tools?: any[]): Promise<AIResponse> {
    const baseUrl = this.config.baseUrl || 'http://localhost:11434';
    
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.config.model || 'llama2',
        messages,
        tools,
        stream: false,
        options: {
          temperature: this.config.temperature || 0.7,
          num_predict: this.config.maxTokens || 2000
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Local model error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      content: data.message?.content || '',
      toolCalls: data.tool_calls || []
    };
  }

  validateConfig(): boolean {
    return !!this.config.model;
  }
}

// AI客户端工厂
export class AIClientFactory {
  static create(config: AIModelConfig): AIClient {
    switch (config.provider) {
      case 'openai':
        return new OpenAIClient(config);
      case 'claude':
        return new ClaudeClient(config);
      case 'local':
        return new LocalClient(config);
      default:
        throw new Error(`Unsupported AI provider: ${config.provider}`);
    }
  }
}

// 默认配置
export const DEFAULT_AI_CONFIGS: Record<string, AIModelConfig> = {
  openai: {
    provider: 'openai',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000
  },
  claude: {
    provider: 'claude',
    model: 'claude-3-sonnet-20240229',
    temperature: 0.7,
    maxTokens: 2000
  },
  local: {
    provider: 'local',
    model: 'llama2',
    baseUrl: 'http://localhost:11434',
    temperature: 0.7,
    maxTokens: 2000
  }
};