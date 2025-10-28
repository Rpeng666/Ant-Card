import React from 'react';
import { Card } from '@/components/ui/card';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface DocumentTemplateProps {
  date?: string;
  title?: string;
  content?: string;
  author?: string;
  qrCode?: string;
  qrCodeTitle?: string;
  qrCodeText?: string;
  showIcon?: boolean;
  showDate?: boolean;
  showTitle?: boolean;
  showContent?: boolean;
  showAuthor?: boolean;
  showQRCode?: boolean;
  showPageNum?: boolean;
  pagination?: string;
  icon?: string;
}

const DocumentTemplate: React.FC<DocumentTemplateProps> = ({
  date = "2025年10月12日",
  title = "文档标题",
  content = "## 二级标题\n\n这是文档内容区域，您可以在这里编写详细的内容。段落之间有充足的留白，让阅读体验更加舒适。\n\n### 三级标题\n\n- 列表项一\n- 列表项二\n- 列表项三\n\n```javascript\n// 示例代码\nconsole.log('Hello, World!');\n```\n\n> 这是一个引用区块，用于突出显示重要内容。",
  author = "作者",
  qrCode = "https://example.com",
  qrCodeTitle = "Ant Card",
  qrCodeText = "扫描二维码",
  showIcon = true,
  showDate = true,
  showTitle = true,
  showContent = true,
  showAuthor = true,
  showQRCode = true,
  showPageNum = true,
  pagination = "01",
  icon = "📄"
}) => {
  return (
    <div className="relative overflow-hidden w-full h-full flex items-center justify-center bg-gray-50">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-full h-full bg-white rounded-lg shadow-lg" style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
        }}></div>
      </div>

      <Card className="relative z-10 w-[360px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* 卡片内容 */}
        <div className="p-10 space-y-6">
          {/* 顶部信息 */}
          <div className="space-y-4">
            {/* 图标和日期 */}
            {(showIcon || showDate) && (
              <div className="flex items-center justify-between text-sm text-gray-500">
                {showIcon && icon && (
                  <span className="text-lg">{icon}</span>
                )}
                {showDate && date && (
                  <span>{date}</span>
                )}
              </div>
            )}

            {/* 标题 */}
            {showTitle && title && (
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                {title}
              </h1>
            )}
          </div>

          {/* 内容区域 */}
          {showContent && content && (
            <div className="prose prose-sm max-w-none text-gray-700">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h2: ({node, ...props}) => (
                    <h2
                      className="text-lg font-bold text-gray-900 mt-6 mb-3 flex items-center"
                      {...props}
                    >
                      <span className="mr-2">🔒</span>
                      {props.children}
                    </h2>
                  ),
                  h3: ({node, ...props}) => (
                    <h3
                      className="text-base font-semibold text-gray-800 mt-4 mb-2"
                      {...props}
                    />
                  ),
                  p: ({node, ...props}) => (
                    <p
                      className="mb-4 leading-relaxed"
                      {...props}
                    />
                  ),
                  ul: ({node, ...props}) => (
                    <ul
                      className="mb-4 pl-5 space-y-1"
                      {...props}
                    />
                  ),
                  ol: ({node, ...props}) => (
                    <ol
                      className="mb-4 pl-5 space-y-1"
                      {...props}
                    />
                  ),
                  li: ({node, ...props}) => (
                    <li
                      className="pl-1"
                      {...props}
                    />
                  ),
                  code: ({node, inline, className, children, ...props}) => {
                    if (inline) {
                      return (
                        <code
                          className="px-1.5 py-0.5 bg-gray-100 rounded text-sm font-mono"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code
                        className={`hljs ${className || ''} block p-3 bg-gray-50 rounded text-sm overflow-x-auto`}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  blockquote: ({node, ...props}) => (
                    <blockquote
                      className="border-l-4 border-orange-400 pl-4 py-1 my-4 text-gray-600 italic"
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
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">— {author}</p>
            </div>
          )}

          {/* 二维码区域 */}
          {showQRCode && qrCode && (
            <div className="flex flex-col items-center pt-6">
              <div className="bg-gray-900 p-3 rounded-lg">
                <QRCodeSVG
                  value={qrCode}
                  size={80}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-gray-900">{qrCodeTitle}</p>
                <p className="text-xs text-gray-500">{qrCodeText}</p>
              </div>
            </div>
          )}
        </div>

        {/* 页码和装饰 */}
        {showPageNum && pagination && (
          <div className="absolute bottom-4 right-4 flex items-center">
            <span className="text-xs text-gray-400 font-mono">{pagination}</span>
          </div>
        )}

        {/* 底部装饰线 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
      </Card>
    </div>
  );
};

export default DocumentTemplate;