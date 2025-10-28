import React from 'react';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface CodeTemplateProps {
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

const CodeTemplate: React.FC<CodeTemplateProps> = ({
  date = "2025年10月12日",
  title = "代码人生",
  content = "// 人生就像写代码\n// 需要不断调试和优化\nconsole.log('Hello, World!');",
  author = "程序员",
  icon = "💻",
  showIcon = true,
  showDate = false,
  showTitle = true,
  showContent = true,
  showAuthor = true,
}) => {
  return (
    <div className="relative overflow-hidden w-full h-full flex items-center justify-center bg-gray-50">
      {/* macOS窗口阴影 */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="w-full h-full bg-black/10 rounded-2xl blur-2xl"></div>
      </div>

      {/* macOS窗口 */}
      <div className="relative w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
        {/* macOS标题栏 - 白色背景 */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
          {/* 左侧窗口控制按钮 - 红黄绿三色圆圈 */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full border border-red-600 hover:bg-red-600 transition-colors cursor-pointer shadow-sm"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full border border-yellow-600 hover:bg-yellow-600 transition-colors cursor-pointer shadow-sm"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full border border-green-600 hover:bg-green-600 transition-colors cursor-pointer shadow-sm"></div>
          </div>

          {/* 中间文件路径 */}
          <div className="flex-1 flex items-center justify-center mx-4">
            <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700 text-xs font-medium truncate max-w-xs">
                ~/Desktop/code.js
              </span>
            </div>
          </div>

          {/* 右侧图标 */}
          <div className="flex items-center space-x-3">
            {showIcon && icon && (
              <span className="text-blue-500 text-sm">{icon}</span>
            )}
          </div>
        </div>

        {/* 编辑器区域 - 白色背景 */}
        <div className="flex bg-white">
          {/* 行号区域 - 浅灰色 */}
          <div className="bg-gray-50 px-3 py-4 text-gray-400 text-xs font-mono leading-relaxed select-none border-r border-gray-200">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="h-5 text-right pr-2">{i + 1}</div>
            ))}
          </div>

          {/* 代码内容区域 - 白色背景 */}
          <div className="flex-1 p-4 font-mono text-sm leading-relaxed">
            {/* 注释区域 */}
            <div className="text-green-600">
              <div className="h-5">{'/**'}</div>
              <div className="h-5">{' * ' + (title || '代码片段')}</div>
              {showAuthor && (
                <div className="h-5">{' * @author ' + author}</div>
              )}
              {showDate && (
                <div className="h-5">{' * @date ' + date}</div>
              )}
              <div className="h-5">{' */'}</div>
              <div className="h-5"></div>
            </div>

            {/* 代码内容 - 支持Markdown */}
            {showContent && content && (
              <div className="text-gray-800">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    p: ({node, ...props}) => {
                      const text = props.children?.toString() || '';
                      if (text.startsWith('//')) {
                        return (
                          <div className="h-5 text-green-600">
                            {text}
                          </div>
                        );
                      }
                      return (
                        <div className="h-5 text-gray-800 break-words">
                          {text}
                        </div>
                      );
                    },
                    code: ({node, inline, className, children, ...props}) => {
                      const match = /language-(\w+)/.exec(className || '');
                      const code = String(children).replace(/\n$/, '');

                      if (!inline && match) {
                        return (
                          <div className="my-2">
                            {code.split('\n').map((line, index) => (
                              <div key={index} className="h-5 text-gray-800 font-mono">
                                {line || <span>&nbsp;</span>}
                              </div>
                            ))}
                          </div>
                        );
                      }

                      return (
                        <span className="text-blue-600 font-mono">
                          {children}
                        </span>
                      );
                    },
                    pre: ({node, ...props}) => {
                      const codeElement = props.children as React.ReactElement;
                      const code = codeElement?.props?.children || '';
                      const lines = code.split('\n');

                      return (
                        <div className="my-2">
                          {lines.map((line, index) => (
                            <div key={index} className="h-5 text-gray-800 font-mono">
                              {line || <span>&nbsp;</span>}
                            </div>
                          ))}
                        </div>
                      );
                    },
                    // 语法高亮 - 适配白色背景
                    'span.hljs-keyword': ({node, ...props}) => (
                      <span className="text-purple-600 font-semibold" {...props} />
                    ),
                    'span.hljs-string': ({node, ...props}) => (
                      <span className="text-green-600" {...props} />
                    ),
                    'span.hljs-number': ({node, ...props}) => (
                      <span className="text-orange-600" {...props} />
                    ),
                    'span.hljs-comment': ({node, ...props}) => (
                      <span className="text-gray-500 italic" {...props} />
                    ),
                    'span.hljs-function': ({node, ...props}) => (
                      <span className="text-blue-600 font-semibold" {...props} />
                    ),
                    'span.hljs-variable': ({node, ...props}) => (
                      <span className="text-blue-700" {...props} />
                    ),
                    'span.hljs-operator': ({node, ...props}) => (
                      <span className="text-red-600" {...props} />
                    ),
                    'span.hljs-built_in': ({node, ...props}) => (
                      <span className="text-blue-600" {...props} />
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}

            {/* 空行填充 */}
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-5">
                <span>&nbsp;</span>
              </div>
            ))}
          </div>
        </div>

        {/* 底部状态栏 - macOS风格，白色背景 */}
        <div className="bg-gray-100 px-4 py-2 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>JavaScript</span>
            </span>
            <span>UTF-8</span>
            <span>LF</span>
          </div>

          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <span>Spaces: 2</span>
            <div className="flex items-center space-x-2">
              <span>Ln 1, Col 1</span>
              <span className="text-gray-400">|</span>
            </div>
          </div>
        </div>

        {/* 窗口阴影效果 */}
        <div className="absolute inset-0 rounded-xl shadow-2xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default CodeTemplate;