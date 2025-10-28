# Ant Card MCP 使用指南

## 🚀 快速开始

### 1. 部署到Vercel

```bash
# 1. 提交代码
git add .
git commit -m "Add MCP functionality"
git push

# 2. 在Vercel部署
# - 访问 https://vercel.com
# - 导入你的GitHub仓库
# - 点击Deploy
# - 部署完成后获得域名，例如：https://ant-card.vercel.app
```

### 2. 配置Claude Code使用MCP

#### 方法1: 使用Claude Desktop

1. **创建MCP配置文件**
   ```json
   // ~/.config/claude/claude_desktop_config.json
   {
     "mcpServers": {
       "ant-card": {
         "command": "npx",
         "args": [
           "-y",
           "@modelcontextprotocol/server-fetch"
         ],
         "env": {
           "FETCH_BASE_URL": "https://your-domain.vercel.app/api/mcp"
         }
       }
     }
   }
   ```

2. **重启Claude Desktop**

#### 方法2: 使用Cline (VS Code扩展)

1. **安装Cline扩展**
2. **配置MCP设置**
   ```json
   // VS Code settings.json
   {
     "cline.mcpServers": {
       "ant-card": {
         "command": "npx",
         "args": [
           "-y",
           "@modelcontextprotocol/server-fetch"
         ],
         "env": {
           "FETCH_BASE_URL": "https://your-domain.vercel.app/api/mcp"
         }
       }
     }
   }
   ```

#### 方法3: 使用Cursor

1. **打开设置** (Cmd/Ctrl + ,)
2. **搜索MCP**
3. **添加服务器配置**
   ```json
   {
     "name": "ant-card",
     "command": "npx",
     "args": ["-y", "@modelcontextprotocol/server-fetch"],
     "env": {
       "FETCH_BASE_URL": "https://your-domain.vercel.app/api/mcp"
     }
   }
   ```

## 🛠️ 可用的MCP工具

### 1. 卡片管理

#### 创建卡片
```json
{
  "tool": "create_card",
  "arguments": {
    "title": "我的新卡片",
    "content": "这是卡片内容",
    "author": "作者名",
    "template": "code"
  }
}
```

#### 更新卡片内容
```json
{
  "tool": "update_card_content",
  "arguments": {
    "cardId": "card_xxx",
    "updates": {
      "title": "新标题",
      "content": "更新后的内容"
    }
  }
}
```

#### 更改卡片模板
```json
{
  "tool": "change_card_template",
  "arguments": {
    "cardId": "card_xxx",
    "template": "story"
  }
}
```

### 2. 导出功能

#### 客户端导出 (返回配置)
```json
{
  "tool": "export_card",
  "arguments": {
    "cardId": "card_xxx",
    "format": "png",
    "quality": 0.9,
    "scale": 2
  }
}
```

#### 服务器端导出 (直接生成图片)
```json
{
  "tool": "export_card_server",
  "arguments": {
    "cardId": "card_xxx",
    "format": "png",
    "width": 1200,
    "height": 1200,
    "quality": 0.95
  }
}
```

### 3. 卡片信息

#### 获取卡片列表
```json
{
  "tool": "list_cards",
  "arguments": {
    "limit": 10,
    "offset": 0
  }
}
```

#### 获取卡片详情
```json
{
  "tool": "get_card_info",
  "arguments": {
    "cardId": "card_xxx"
  }
}
```

## 💬 使用示例对话

### 示例1: 创建并导出卡片

**用户**: "帮我创建一个代码风格的卡片，内容是一个JavaScript函数，然后导出为PNG图片"

**AI**:
```json
[
  {
    "tool": "create_card",
    "arguments": {
      "title": "JavaScript函数示例",
      "content": "```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));\n```",
      "author": "AI助手",
      "template": "code"
    }
  },
  {
    "tool": "export_card",
    "arguments": {
      "cardId": "{{previous_result.cardId}}",
      "format": "png",
      "scale": 2
    }
  }
]
```

### 示例2: 批量操作

**用户**: "创建3张不同风格的卡片：便当风格的任务列表，故事风格的语录，代码风格的算法"

**AI**:
```json
[
  {
    "tool": "create_card",
    "arguments": {
      "title": "今日任务",
      "content": "## 工作任务\n- [x] 完成项目文档\n- [ ] 代码审查\n- [ ] 团队会议\n\n## 学习任务\n- [ ] 学习新技术\n- [ ] 阅读技术文章",
      "template": "bento"
    }
  },
  {
    "tool": "create_card",
    "arguments": {
      "title": "人生感悟",
      "content": "人生就像一场旅行，不必在乎目的地，在乎的是沿途的风景以及看风景的心情。\n\n让每一天都充满意义，让每一刻都值得回忆。",
      "author": "人生导师",
      "template": "story"
    }
  },
  {
    "tool": "create_card",
    "arguments": {
      "title": "快速排序算法",
      "content": "```javascript\nfunction quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  \n  const pivot = arr[Math.floor(arr.length / 2)];\n  const left = arr.filter(x => x < pivot);\n  const right = arr.filter(x => x > pivot);\n  \n  return [...quickSort(left), pivot, ...quickSort(right)];\n}\n```",
      "template": "code"
    }
  }
]
```

## 🔧 故障排除

### 1. 连接问题

**问题**: Claude Code无法连接到MCP服务器
**解决方案**:
1. 确认Vercel部署成功
2. 检查域名是否正确替换
3. 测试API端点: `https://your-domain.vercel.app/api/mcp?action=health`

### 2. 权限问题

**问题**: Puppeteer在Vercel上无法运行
**解决方案**:
- 使用 `export_card` 工具进行客户端导出
- 或者配置Vercel函数使用更大的内存限制

### 3. 工具不可用

**问题**: 某些工具显示不可用
**解决方案**:
1. 检查工具名称是否正确
2. 查看MCP服务器日志
3. 确认参数格式正确

## 📚 支持的模板类型

- `default` - 默认模板
- `minimalist` - 极简模板
- `business` - 商务模板
- `creative` - 创意模板
- `academic` - 学术模板
- `frame` - 框架模板
- `dark-day` - 黑日模板
- `memo` - 备忘录模板
- `bento` - 便当模板
- `story` - 故事模板
- `code` - 代码模板

## 🎯 最佳实践

1. **批量操作**: 先创建所有卡片，再统一导出
2. **模板选择**: 根据内容类型选择合适的模板
3. **质量设置**: PNG使用高质量，JPEG使用0.8-0.9质量
4. **尺寸设置**: 客户端导出使用scale参数，服务器端导出使用width/height

## 📞 技术支持

如果遇到问题，请检查：
1. Vercel部署状态
2. MCP配置文件语法
3. API端点可访问性
4. 工具参数格式

---

🎉 现在你可以在Claude Code、Cursor、Cline等工具中使用Ant Card的MCP功能了！