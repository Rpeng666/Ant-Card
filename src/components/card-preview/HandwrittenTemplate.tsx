import React from 'react';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface HandwrittenTemplateProps {
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

const HandwrittenTemplate: React.FC<HandwrittenTemplateProps> = ({
  date = "2025年10月12日",
  title = "手写心情",
  content = "用心书写的文字总是带着温度，就像手写的信件一样，传递着真挚的情感。",
  author = "手写爱好者",
  icon = "✍️",
  showIcon = true,
  showDate = true,
  showTitle = true,
  showContent = true,
  showAuthor = true,
}) => {
  return (
    <div className="relative overflow-hidden w-full h-full flex items-center justify-center">
      <Card
        className="relative w-full rounded-2xl shadow-lg overflow-hidden border-0"
        style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          transform: 'rotate(1deg)',
        }}
      >
        {/* 手绘纸张纹理效果 */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L100 100M100 0L0 100' stroke='%23d4a017' stroke-width='0.5' stroke-opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* 纸张边缘不规则效果 */}
        <div className="absolute top-0 left-0 right-0 h-2" style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(212,160,23,0.2) 5px, rgba(212,160,23,0.2) 10px)'
        }}></div>
        <div className="absolute bottom-0 left-0 right-0 h-2" style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(212,160,23,0.2) 5px, rgba(212,160,23,0.2) 10px)'
        }}></div>
        <div className="absolute left-0 top-0 bottom-0 w-2" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(212,160,23,0.2) 5px, rgba(212,160,23,0.2) 10px)'
        }}></div>
        <div className="absolute right-0 top-0 bottom-0 w-2" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(212,160,23,0.2) 5px, rgba(212,160,23,0.2) 10px)'
        }}></div>

        {/* 卡片内容 */}
        <div className="p-6 space-y-6 relative z-10">
          {/* 图标 */}
          {showIcon && icon && (
            <div className="text-center text-3xl text-amber-800">
              {icon}
            </div>
          )}

          {/* 标题 */}
          {showTitle && title && (
            <h1
              className="text-2xl font-bold text-center text-amber-900 leading-tight tracking-wide"
              style={{
                fontFamily: "'Kalam', cursive",
                textShadow: '1px 1px 1px rgba(0,0,0,0.1)',
                transform: 'rotate(-0.5deg)'
              }}
            >
              {title}
            </h1>
          )}

          {/* 日期 */}
          {showDate && date && (
            <div className="text-center text-amber-700 text-sm" style={{ fontFamily: "'Kalam', cursive" }}>
              {date}
            </div>
          )}

          {/* 内容区域 */}
          {showContent && content && (
            <div className="prose prose-lg max-w-none text-amber-900">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({node, ...props}) => (
                    <p
                      className="mb-4 leading-relaxed"
                      style={{
                        fontFamily: "'Kalam', cursive",
                        fontSize: '1.1em',
                        lineHeight: '1.8',
                        textIndent: '2em'
                      }}
                      {...props}
                    />
                  ),
                  ul: ({node, ...props}) => (
                    <ul
                      className="mb-4 space-y-2"
                      style={{
                        fontFamily: "'Kalam', cursive",
                        fontSize: '1.1em',
                        lineHeight: '1.8'
                      }}
                      {...props}
                    />
                  ),
                  li: ({node, ...props}) => (
                    <li
                      className="ml-6"
                      style={{
                        fontFamily: "'Kalam', cursive"
                      }}
                      {...props}
                    />
                  ),
                  h1: ({node, ...props}) => (
                    <h1
                      className="text-xl font-bold mb-4 text-amber-900"
                      style={{
                        fontFamily: "'Kalam', cursive",
                        textShadow: '1px 1px 1px rgba(0,0,0,0.1)'
                      }}
                      {...props}
                    />
                  ),
                  h2: ({node, ...props}) => (
                    <h2
                      className="text-lg font-bold mb-3 text-amber-900"
                      style={{
                        fontFamily: "'Kalam', cursive",
                        textShadow: '1px 1px 1px rgba(0,0,0,0.1)'
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

          {/* 作者信息 */}
          {showAuthor && author && (
            <div className="pt-4">
              <p
                className="text-right text-amber-800 text-sm"
                style={{
                  fontFamily: "'Kalam', cursive",
                  transform: 'rotate(0.5deg)'
                }}
              >
                — {author}
              </p>
            </div>
          )}
        </div>

        {/* 手绘装饰元素 */}
        <div className="absolute top-4 left-4 w-8 h-8 opacity-30">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3C8.5 3 6 5.5 6 9C6 12.5 8.5 15 12 15C15.5 15 18 12.5 18 9C18 5.5 15.5 3 12 3Z" stroke="#d4a017" strokeWidth="1.5"/>
            <path d="M9 9C9 9 10.5 10.5 12 9C13.5 7.5 15 9 15 9" stroke="#d4a017" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="absolute bottom-4 right-4 w-6 h-6 opacity-20">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2L21 9L14 16L7 9L14 2Z" stroke="#d4a017" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M3 20L7 16L11 20" stroke="#d4a017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Card>
    </div>
  );
};

export default HandwrittenTemplate;