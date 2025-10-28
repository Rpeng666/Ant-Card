import React from 'react';
import { Card } from '@/components/ui/card';
import { MoreHorizontal, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MemoTemplateProps {
  date?: string;
  title?: string;
  content?: string;
  author?: string;
  icon?: string;
  showIcon?: boolean;
  showDate?: boolean;
  showTitle?: boolean;
  showContent?: boolean;
  showAuthor?: boolean;
}

const MemoTemplate: React.FC<MemoTemplateProps> = ({
  date = "2025年10月12日",
  title = "重要提醒",
  content = "• 完成项目报告\n• 参加团队会议\n• 回复客户邮件\n• 准备明天的演示",
  author = "备忘录",
  icon = "📝",
  showIcon = true,
  showDate = true,
  showTitle = true,
  showContent = true,
  showAuthor = false,
}) => {
  return (
    <div className="relative overflow-hidden w-full h-full flex items-center justify-center bg-yellow-50">
      {/* iPhone备忘录风格卡片 */}
      <Card
        className="relative w-full bg-yellow-100 rounded-lg shadow-lg border-0 overflow-hidden"
        style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* 顶部导航栏 - 模拟iPhone备忘录顶部栏，与背景融合 */}
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 px-4 py-2 flex items-center justify-between border-b border-yellow-200">
          <div className="flex items-center">
            <span className="text-yellow-700 font-medium text-xs">备忘录</span>
          </div>
          <div className="flex items-center space-x-2">
            <Share2 className="w-3 h-3 text-yellow-600 cursor-pointer hover:opacity-70" />
            <MoreHorizontal className="w-3 h-3 text-yellow-600 cursor-pointer hover:opacity-70" />
          </div>
        </div>

        {/* 卡片内容 */}
        <div className="p-4 space-y-4">
          {/* 日期 */}
          {showDate && date && (
            <div className="text-xs text-yellow-700 font-medium">
              {date}
            </div>
          )}

          {/* 标题 */}
          {showTitle && title && (
            <h1 className="text-lg font-bold text-yellow-900 leading-tight">
              {title}
            </h1>
          )}

          {/* 内容区域 */}
          {showContent && content && (
            <div className="prose prose-sm max-w-none text-yellow-800">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({node, ...props}) => (
                    <p
                      className="mb-2 leading-relaxed"
                      {...props}
                    />
                  ),
                  ul: ({node, ...props}) => (
                    <ul
                      className="mb-3 pl-4 space-y-1"
                      {...props}
                    />
                  ),
                  ol: ({node, ...props}) => (
                    <ol
                      className="mb-3 pl-4 space-y-1"
                      {...props}
                    />
                  ),
                  li: ({node, ...props}) => (
                    <li
                      className="pl-1"
                      {...props}
                    />
                  )
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}

          {/* 作者信息 */}
          {showAuthor && author && (
            <div className="pt-2 border-t border-yellow-200">
              <p className="text-xs text-yellow-700">— {author}</p>
            </div>
          )}
        </div>

        {/* 底部装饰线 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
      </Card>
    </div>
  );
};

export default MemoTemplate;