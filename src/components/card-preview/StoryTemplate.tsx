import React from 'react';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface StoryTemplateProps {
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

const StoryTemplate: React.FC<StoryTemplateProps> = ({
  date = "2025年10月12日",
  title = "故事开始",
  content = "每个人都有自己的故事，每个故事都值得被倾听和记录。让我们一起分享这些美好的时光。",
  author = "故事讲述者",
  icon = "📖",
  showIcon = true,
  showDate = false,
  showTitle = true,
  showContent = true,
  showAuthor = true,
}) => {
  return (
    <div className="relative overflow-hidden w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* 背景装饰 - 温暖的故事氛围 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-yellow-200 to-amber-200 rounded-full blur-3xl"></div>
      </div>

      <Card className="relative w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-100/50 overflow-hidden">
        {/* 顶部装饰带 */}
        <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400"></div>

        {/* 卡片内容 */}
        <div className="p-8 space-y-6 relative z-10">
          {/* 图标和标题区域 */}
          <div className="text-center space-y-4">
            {/* 图标 */}
            {showIcon && icon && (
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center shadow-lg shadow-amber-200/50">
                  <span className="text-3xl">{icon}</span>
                </div>
              </div>
            )}

            {/* 标题 */}
            {showTitle && title && (
              <h1 className="text-3xl font-bold text-amber-900 leading-tight tracking-wide break-words">
                {title}
              </h1>
            )}

            {/* 装饰线 */}
            <div className="flex items-center justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-24"></div>
            </div>
          </div>

          {/* 内容区域 - 故事叙述风格 */}
          {showContent && content && (
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({node, ...props}) => (
                    <p
                      className="mb-4 leading-relaxed text-base text-gray-700 break-words"
                      style={{
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        textIndent: '2em',
                        lineHeight: '1.8'
                      }}
                      {...props}
                    />
                  ),
                  h1: ({node, ...props}) => (
                    <h1
                      className="text-2xl font-bold text-amber-900 mb-4 break-words"
                      style={{
                        fontFamily: "'Georgia', 'Times New Roman', serif"
                      }}
                      {...props}
                    />
                  ),
                  h2: ({node, ...props}) => (
                    <h2
                      className="text-xl font-semibold text-amber-800 mb-3 mt-6 break-words"
                      style={{
                        fontFamily: "'Georgia', 'Times New Roman', serif"
                      }}
                      {...props}
                    />
                  ),
                  h3: ({node, ...props}) => (
                    <h3
                      className="text-lg font-medium text-amber-700 mb-2 mt-4 break-words"
                      style={{
                        fontFamily: "'Georgia', 'Times New Roman', serif"
                      }}
                      {...props}
                    />
                  ),
                  blockquote: ({node, ...props}) => (
                    <blockquote
                      className="border-l-4 border-amber-300 pl-4 py-2 my-4 bg-amber-50/50 rounded-r-lg italic text-amber-800 break-words"
                      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                      {...props}
                    />
                  ),
                  ul: ({node, ...props}) => (
                    <ul
                      className="space-y-2 my-4 text-gray-700 break-words"
                      {...props}
                    />
                  ),
                  ol: ({node, ...props}) => (
                    <ol
                      className="space-y-2 my-4 text-gray-700 break-words list-decimal list-inside"
                      {...props}
                    />
                  ),
                  li: ({node, ...props}) => (
                    <li
                      className="leading-relaxed break-words"
                      {...props}
                    />
                  ),
                  strong: ({node, ...props}) => (
                    <strong
                      className="text-amber-800 font-bold"
                      {...props}
                    />
                  ),
                  em: ({node, ...props}) => (
                    <em
                      className="text-amber-700 italic"
                      {...props}
                    />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}

          {/* 作者信息 - 故事讲述者签名 */}
          {showAuthor && author && (
            <div className="pt-6 flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
              </div>
              <p className="text-amber-700 text-sm font-medium tracking-wide italic">
                — {author}
              </p>
              <div className="flex items-center justify-center">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
              </div>
            </div>
          )}

          {/* 日期 */}
          {showDate && date && (
            <div className="pt-2 text-center">
              <p className="text-amber-600 text-xs font-medium">
                {date}
              </p>
            </div>
          )}
        </div>

        {/* 底部装饰 */}
        <div className="h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 opacity-50"></div>
      </Card>
    </div>
  );
};

export default StoryTemplate;