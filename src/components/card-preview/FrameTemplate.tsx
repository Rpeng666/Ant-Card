import React from 'react';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface FrameTemplateProps {
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

const FrameTemplate: React.FC<FrameTemplateProps> = ({
  date = "2025年10月12日",
  title = "艺术之作",
  content = "每一个想法都是一件艺术品，\n每一句话都值得被精心装裱。\n\n在这个数字世界里，\n让文字回归艺术的本质。",
  author = "艺术家",
  icon = "🎨",
  showIcon = true,
  showDate = false,
  showTitle = true,
  showContent = true,
  showAuthor = true,
}) => {
  return (
    <div className="relative overflow-hidden w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
      <Card className="relative w-full bg-white rounded-2xl shadow-2xl overflow-hidden border-0">
        {/* 装饰边框 - 现代艺术风格，确保不溢出 */}
        <div className="absolute inset-2 border-2 border-amber-200 rounded-xl"></div>
        <div className="absolute inset-3 border border-amber-300 rounded-lg"></div>

        {/* 装饰角 - 艺术画笔风格，确保在容器内 */}
        <div className="absolute top-2 left-2 w-4 h-4">
          <div className="absolute w-3 h-3 border-l border-t border-amber-500 rounded-tl"></div>
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rounded-full top-0 left-0"></div>
        </div>
        <div className="absolute top-2 right-2 w-4 h-4">
          <div className="absolute w-3 h-3 border-r border-t border-amber-500 rounded-tr"></div>
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rounded-full top-0 right-0"></div>
        </div>
        <div className="absolute bottom-2 left-2 w-4 h-4">
          <div className="absolute w-3 h-3 border-l border-b border-amber-500 rounded-bl"></div>
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rounded-full bottom-0 left-0"></div>
        </div>
        <div className="absolute bottom-2 right-2 w-4 h-4">
          <div className="absolute w-3 h-3 border-r border-b border-amber-500 rounded-br"></div>
          <div className="absolute w-1.5 h-1.5 bg-amber-500 rounded-full bottom-0 right-0"></div>
        </div>

        {/* 装饰元素 - 艺术笔触，确保不溢出 */}
        <div className="absolute top-3 left-3 w-4 h-4 opacity-60">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z" fill="#f59e0b"/>
          </svg>
        </div>
        <div className="absolute bottom-3 right-3 w-4 h-4 opacity-60">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" stroke="#f59e0b" strokeWidth="2"/>
          </svg>
        </div>

        {/* 卡片内容 */}
        <div className="p-6 space-y-6 relative z-10">
          {/* 图标 - 确保不溢出 */}
          {showIcon && icon && (
            <div className="text-center text-3xl text-amber-600 drop-shadow-sm">
              {icon}
            </div>
          )}

          {/* 标题 - 确保文字不溢出 */}
          {showTitle && title && (
            <h1 className="text-2xl font-bold text-center text-amber-900 leading-tight tracking-wide break-words">
              {title}
            </h1>
          )}

          {/* 内容区域 - 确保文字不溢出 */}
          {showContent && content && (
            <div className="prose prose-sm max-w-none text-center text-amber-800">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({node, ...props}) => (
                    <p
                      className="mb-4 leading-relaxed text-base font-medium break-words"
                      style={{
                        letterSpacing: '0.3px',
                        lineHeight: '1.6'
                      }}
                      {...props}
                    />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}

          {/* 作者信息 - 确保不溢出 */}
          {showAuthor && author && (
            <div className="pt-4 flex justify-center">
              <div className="inline-flex items-center">
                <div className="w-8 h-px bg-amber-300 mr-3"></div>
                <p className="text-amber-700 text-xs font-bold break-words">— {author}</p>
                <div className="w-8 h-px bg-amber-300 ml-3"></div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FrameTemplate;