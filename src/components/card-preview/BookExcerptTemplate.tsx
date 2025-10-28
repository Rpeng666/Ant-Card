import React from 'react';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BookExcerptTemplateProps {
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
  showPageNum?: boolean;
  pagination?: string;
}

const BookExcerptTemplate: React.FC<BookExcerptTemplateProps> = ({
  date = "2025年10月12日",
  title = "文学摘录",
  content = "读书是在别人思想的帮助下，建立起自己的思想。\n\n——鲁巴金",
  author = "摘录者",
  icon = "📚",
  showIcon = true,
  showDate = false,
  showTitle = true,
  showContent = true,
  showAuthor = true,
  showPageNum = true,
  pagination = "01",
}) => {
  return (
    <div className="relative overflow-hidden w-full h-full flex items-center justify-center bg-amber-50">
      <Card
        className="relative w-full bg-amber-50 rounded-none shadow-lg border border-amber-200 overflow-hidden"
        style={{
          fontFamily: 'Songti SC, serif',
        }}
      >
        {/* 装订线效果 */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-300"></div>
        <div className="absolute left-1 top-0 bottom-0 w-px bg-amber-400"></div>

        {/* 页边距 */}
        <div className="p-8 space-y-8 relative">
          {/* 顶部装饰线 */}
          <div className="absolute top-8 left-8 right-8 h-px bg-amber-300"></div>

          {/* 图标 - 确保不溢出 */}
          {showIcon && icon && (
            <div className="text-center text-3xl text-amber-800 relative z-10">
              {icon}
            </div>
          )}

          {/* 标题 */}
          {showTitle && title && (
            <h1 className="text-2xl font-bold text-center text-amber-900 leading-tight tracking-wide">
              {title}
            </h1>
          )}

          {/* 内容区域 */}
          {showContent && content && (
            <div className="prose prose-lg max-w-none text-amber-900">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({node, ...props}) => (
                    <p
                      className="mb-6 leading-relaxed text-lg"
                      style={{
                        letterSpacing: '0.8px',
                        textIndent: '2em'
                      }}
                      {...props}
                    />
                  ),
                  br: ({node, ...props}) => <br {...props} />,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}

          {/* 作者信息 */}
          {showAuthor && author && (
            <div className="text-right pt-6">
              <p className="text-amber-800 font-medium">{author}</p>
            </div>
          )}

          {/* 底部装饰线 */}
          <div className="absolute bottom-8 left-8 right-8 h-px bg-amber-300"></div>
        </div>

        {/* 页码 */}
        {showPageNum && pagination && (
          <div className="absolute bottom-4 right-8 text-amber-700 text-sm font-mono">
            {pagination}
          </div>
        )}
      </Card>
    </div>
  );
};

export default BookExcerptTemplate;