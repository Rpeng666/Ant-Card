import React from 'react';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface QuoteTemplateProps {
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

const QuoteTemplate: React.FC<QuoteTemplateProps> = ({
  date = "2025年10月12日",
  title = "每日金句",
  content = "生活就像骑自行车，想保持平衡就得往前走。",
  author = "阿尔伯特·爱因斯坦",
  icon = "❝",
  showIcon = true,
  showDate = false,
  showTitle = true,
  showContent = true,
  showAuthor = true,
}) => {
  return (
    <div className="relative overflow-hidden w-full h-full flex items-center justify-center">
      <Card
        className="relative w-full rounded-2xl shadow-xl overflow-hidden border-0"
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        }}
      >
        {/* 装饰元素 - 现代引述设计 */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>

        {/* 引号装饰 - 左上角 */}
        <div className="absolute top-6 left-6 text-8xl text-blue-200 opacity-30 font-serif">
          &quot;
        </div>

        {/* 引号装饰 - 右下角 */}
        <div className="absolute bottom-6 right-6 text-8xl text-blue-200 opacity-30 font-serif transform rotate-180">
          &quot;
        </div>

        {/* 卡片内容 */}
        <div className="p-6 space-y-6 relative z-10">
          {/* 标题 - 现代设计 */}
          {showTitle && title && (
            <div className="text-center">
              <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full mb-2">
                <h1 className="text-lg font-bold text-blue-100 tracking-wider uppercase">
                  {title}
                </h1>
              </div>
            </div>
          )}

          {/* 内容区域 - 引述样式 */}
          {showContent && content && (
            <div className="prose prose-lg max-w-none text-center">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({node, ...props}) => (
                    <p
                      className="mb-6 text-xl leading-relaxed font-light text-blue-50 italic"
                      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                      {...props}
                    />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}

          {/* 作者信息 - 底部 */}
          {showAuthor && author && (
            <div className="pt-4 flex justify-center">
              <div className="inline-flex items-center">
                <div className="w-12 h-0.5 bg-blue-300 mr-3"></div>
                <p className="text-blue-200 font-medium tracking-wide">— {author}</p>
                <div className="w-12 h-0.5 bg-blue-300 ml-3"></div>
              </div>
            </div>
          )}

          {/* 图标 - 如果显示的话，确保不溢出 */}
          {showIcon && icon && (
            <div className="absolute bottom-4 left-4 text-2xl text-blue-300 opacity-70 z-20">
              {icon}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuoteTemplate;