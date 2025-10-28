import React from 'react';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DarkDayTemplateProps {
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

const DarkDayTemplate: React.FC<DarkDayTemplateProps> = ({
  date = "2025年10月12日",
  title = "夜的诗篇",
  content = "夜空中的每一颗星，都是宇宙写给地球的情书。\n\n在这静谧的夜晚，让我们聆听内心的声音。",
  author = "观星者",
  icon = "✨",
  showIcon = true,
  showDate = false,
  showTitle = true,
  showContent = true,
  showAuthor = true,
}) => {
  return (
    <div className="relative overflow-hidden w-full h-full flex items-center justify-center">
      <Card
        className="relative w-full rounded-3xl shadow-2xl overflow-hidden border-0"
        style={{
          background: 'linear-gradient(135deg, #0a0e27 0%, #151937 25%, #1a1f4e 50%, #0d1225 100%)',
        }}
      >
        {/* 现代化星空背景 */}
        <div className="absolute inset-0">
          {/* 流星效果 */}
          <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white rounded-full shadow-lg shadow-white/80 animate-ping"></div>
          <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white rounded-full shadow-md shadow-white/60 animate-ping" style={{ animationDelay: '1s' }}></div>

          {/* 星座连线 */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
            <line x1="20%" y1="30%" x2="25%" y2="35%" stroke="white" strokeWidth="0.5"/>
            <line x1="25%" y1="35%" x2="30%" y2="32%" stroke="white" strokeWidth="0.5"/>
            <line x1="30%" y1="32%" x2="35%" y2="38%" stroke="white" strokeWidth="0.5"/>
            <line x1="70%" y1="20%" x2="75%" y2="25%" stroke="white" strokeWidth="0.5"/>
            <line x1="75%" y1="25%" x2="80%" y2="22%" stroke="white" strokeWidth="0.5"/>
          </svg>

          {/* 动态星星 */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                opacity: Math.random() * 0.9 + 0.1,
                animationDuration: `${Math.random() * 4 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)'
              }}
            />
          ))}

          {/* 微小星星 */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`tiny-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: '1px',
                height: '1px',
                opacity: Math.random() * 0.6 + 0.2,
              }}
            />
          ))}
        </div>

        {/* 现代化月亮设计 */}
        <div className="absolute top-8 right-8 relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 shadow-2xl shadow-gray-400/50"></div>
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-tl from-gray-200/40 to-transparent"></div>
          {/* 月亮表面纹理 */}
          <div className="absolute top-4 left-3 w-3 h-3 bg-gray-400/30 rounded-full"></div>
          <div className="absolute top-8 left-6 w-2 h-2 bg-gray-400/20 rounded-full"></div>
          <div className="absolute bottom-5 right-4 w-4 h-4 bg-gray-400/25 rounded-full"></div>
        </div>

        {/* 月亮光晕 */}
        <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 opacity-10 blur-2xl"></div>

        {/* 极光效果 */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-400/10 via-blue-400/10 to-transparent opacity-50"></div>

        {/* 卡片内容 */}
        <div className="p-8 space-y-8 relative z-10">
          {/* 图标 */}
          {showIcon && icon && (
            <div className="text-center text-4xl text-white/90 drop-shadow-lg animate-pulse">
              {icon}
            </div>
          )}

          {/* 标题 */}
          {showTitle && title && (
            <h1 className="text-3xl font-bold text-center text-white/95 leading-tight tracking-wide"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(100,150,255,0.3)' }}>
              {title}
            </h1>
          )}

          {/* 内容区域 */}
          {showContent && content && (
            <div className="prose prose-lg max-w-none text-center">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({node, ...props}) => (
                    <p
                      className="mb-6 text-lg leading-relaxed text-white/85 font-light"
                      style={{
                        letterSpacing: '0.8px',
                        textShadow: '0 1px 4px rgba(0,0,0,0.8), 0 0 10px rgba(100,150,255,0.2)'
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
            <div className="pt-6 flex justify-center">
              <div className="inline-flex items-center">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mr-4"></div>
                <p className="text-white/70 text-sm font-medium tracking-wide"
                   style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                  — {author}
                </p>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent ml-4"></div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DarkDayTemplate;