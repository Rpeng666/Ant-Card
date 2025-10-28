import { NextRequest, NextResponse } from 'next/server';
import { MCPServer } from '@/lib/mcp/server';
import { MCPRequest } from '@/lib/mcp/types';

// 创建MCP服务器实例
const mcpServer = new MCPServer();

// 定期清理过期会话
setInterval(() => {
  mcpServer.cleanupSessions();
}, 60 * 60 * 1000); // 每小时清理一次

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证请求格式
    if (!body.id || !body.method) {
      return NextResponse.json({
        id: body.id || 'unknown',
        error: {
          code: -32600,
          message: 'Invalid Request'
        }
      }, { status: 400 });
    }

    const mcpRequest: MCPRequest = {
      id: body.id,
      method: body.method,
      params: body.params || {}
    };

    // 处理MCP请求
    const response = await mcpServer.handleRequest(mcpRequest);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('MCP API Error:', error);
    
    return NextResponse.json({
      id: 'unknown',
      error: {
        code: -32603,
        message: 'Internal error',
        data: error instanceof Error ? error.message : String(error)
      }
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'tools':
        // 返回可用工具列表
        const toolsResponse = await mcpServer.handleRequest({
          id: 'tools-list',
          method: 'tools/list',
          params: {}
        });
        return NextResponse.json(toolsResponse);

      case 'health':
        // 健康检查
        return NextResponse.json({
          status: 'healthy',
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        });

      default:
        return NextResponse.json({
          error: 'Unknown action',
          availableActions: ['tools', 'health']
        }, { status: 400 });
    }
  } catch (error) {
    console.error('MCP GET Error:', error);
    
    return NextResponse.json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

// 支持OPTIONS请求（CORS预检）
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}