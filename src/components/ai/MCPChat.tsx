"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Settings, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  toolCalls?: Array<{
    name: string;
    arguments: any;
    result?: any;
  }>;
}

interface MCPChatProps {
  onCardOperation?: (operation: string, params: any) => void;
}

export const MCPChat: React.FC<MCPChatProps> = ({ onCardOperation }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '你好！我是AI助手，可以帮你创建和编辑卡片。你可以说："创建一个关于技术的卡片"或"把字体调大一点"等。',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [aiProvider, setAiProvider] = useState('openai');
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 初始化会话
  useEffect(() => {
    initializeSession();
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const initializeSession = async () => {
    try {
      const response = await fetch('/api/mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 'init',
          method: 'session/create',
          params: {}
        })
      });

      const data = await response.json();
      if (data.result?.sessionId) {
        setSessionId(data.result.sessionId);
      }
    } catch (error) {
      console.error('Failed to initialize session:', error);
      toast.error('初始化会话失败');
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !sessionId) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 调用AI模型
      const aiResponse = await callAI([...messages, userMessage]);
      
      const assistantMessage: Message = {
        id: `msg_${Date.now()}_ai`,
        role: 'assistant',
        content: aiResponse.content,
        timestamp: Date.now(),
        toolCalls: aiResponse.toolCalls
      };

      // 执行工具调用
      if (aiResponse.toolCalls && aiResponse.toolCalls.length > 0) {
        for (const toolCall of aiResponse.toolCalls) {
          try {
            const result = await executeTool(toolCall.name, toolCall.arguments);
            toolCall.result = result;
            
            // 通知父组件
            if (onCardOperation) {
              onCardOperation(toolCall.name, toolCall.arguments);
            }
          } catch (error) {
            toolCall.result = { error: error instanceof Error ? error.message : String(error) };
          }
        }
      }

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('发送消息失败');
      
      const errorMessage: Message = {
        id: `msg_${Date.now()}_error`,
        role: 'assistant',
        content: '抱歉，我遇到了一些问题。请稍后再试。',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const callAI = async (messages: Message[]): Promise<{ content: string; toolCalls?: Array<{ name: string; arguments: any; result?: any }> }> => {
    // 这里应该调用实际的AI服务
    // 为了演示，我们模拟一个响应
    const lastMessage = messages[messages.length - 1];
    
    // 简单的关键词匹配来模拟AI理解
    const content = lastMessage.content.toLowerCase();
    
    if (content.includes('创建') || content.includes('新建')) {
      return {
        content: '好的，我来为你创建一个新卡片。',
        toolCalls: [{
          name: 'create_card',
          arguments: {
            title: extractTitle(content) || '新卡片',
            content: extractContent(content) || '这是一个新创建的卡片',
            template: 'default'
          },
          result: undefined
        }]
      };
    }
    
    if (content.includes('字体') && (content.includes('大') || content.includes('小'))) {
      const scale = content.includes('大') ? 1.2 : 0.8;
      return {
        content: `好的，我来调整字体大小到 ${scale}。`,
        toolCalls: [{
          name: 'update_card_style',
          arguments: {
            cardId: 'current', // 这里应该是当前卡片ID
            fontScale: scale
          },
          result: undefined
        }]
      };
    }
    
    return {
      content: '我理解了你的需求。不过我需要更多信息来帮助你。你可以尝试说："创建一个关于技术的卡片"或"调整字体大小"。'
    };
  };

  const executeTool = async (toolName: string, args: any) => {
    const response = await fetch('/api/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: `tool_${Date.now()}`,
        method: 'tools/call',
        params: {
          name: toolName,
          arguments: args
        }
      })
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    return data.result;
  };

  const extractTitle = (content: string): string | null => {
    const matches = content.match(/关于(.+?)的|(.+?)卡片/);
    return matches ? (matches[1] || matches[2]) : null;
  };

  const extractContent = (content: string): string | null => {
    // 简单的内容提取逻辑
    return null;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMessage = (message: Message) => (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      {message.role === 'assistant' && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
        <div
          className={`rounded-lg px-4 py-2 ${
            message.role === 'user'
              ? 'bg-primary text-primary-foreground ml-auto'
              : 'bg-muted'
          }`}
        >
          <p className="text-sm">{message.content}</p>
          
          {message.toolCalls && message.toolCalls.length > 0 && (
            <div className="mt-2 space-y-1">
              {message.toolCalls.map((call, index) => (
                <div key={index} className="text-xs opacity-75">
                  <Badge variant="secondary" className="mr-1">
                    {call.name}
                  </Badge>
                  {call.result?.success ? (
                    <span className="text-green-600">✓ 执行成功</span>
                  ) : call.result?.error ? (
                    <span className="text-red-600">✗ {call.result.error}</span>
                  ) : (
                    <span>执行中...</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
      
      {message.role === 'user' && (
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4" />
        </div>
      )}
    </motion.div>
  );

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">AI 卡片助手</CardTitle>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={aiProvider} onValueChange={setAiProvider}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="claude">Claude</SelectItem>
                <SelectItem value="local">本地模型</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsConfigOpen(!isConfigOpen)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          通过自然语言创建和编辑卡片
        </p>
      </CardHeader>
      
      <Separator />
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map(renderMessage)}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                </div>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <p className="text-sm">正在思考...</p>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>
        
        <Separator />
        
        <div className="p-4">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入消息，比如：创建一个关于技术的卡片"
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput('创建一个新卡片')}
              disabled={isLoading}
            >
              创建卡片
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput('调整字体大小')}
              disabled={isLoading}
            >
              调整样式
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput('导出为PNG格式')}
              disabled={isLoading}
            >
              导出卡片
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};