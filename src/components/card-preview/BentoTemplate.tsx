import React from 'react';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BentoTemplateProps {
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

const BentoTemplate: React.FC<BentoTemplateProps> = ({
  date = "2025年10月12日",
  title = "信息便当",
  content = "## 今日要点\n- 项目进度更新\n- 团队会议安排\n- 客户反馈整理\n\n## 待办事项\n- [ ] 完成报告\n- [ ] 回复邮件\n- [ ] 准备演示",
  author = "便当师傅",
  icon = "🍱",
  showIcon = true,
  showDate = true,
  showTitle = true,
  showContent = true,
  showAuthor = false,
}) => {
  // 解析内容为不同的区块
  const parseContent = (content: string) => {
    const sections = content.split('\n\n').filter(section => section.trim());
    return sections.map((section, index) => {
      const lines = section.split('\n').filter(line => line.trim());
      const titleMatch = lines[0]?.match(/^#+\s*(.+)/);
      const title = titleMatch ? titleMatch[1] : (lines[0] || '未命名');
      const items = titleMatch ? lines.slice(1) : lines;

      return {
        id: index,
        title,
        items: items.filter(item => item.trim())
      };
    });
  };

  const sections = parseContent(content);

  // 根据区块数量动态调整网格布局
  const getGridCols = () => {
    const count = sections.length;
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count === 3) return 'grid-cols-2';
    return 'grid-cols-2';
  };

  return (
    <div className="relative overflow-hidden w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
      {/* 装饰性背景 */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-tl from-pink-200 to-orange-200 rounded-full blur-3xl"></div>
      </div>

      <Card className="relative w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* 顶部区域 */}
        <div className="p-6 pb-4 bg-gradient-to-r from-gray-50 to-white">
          {/* 标题栏 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {showIcon && icon && (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-lg">{icon}</span>
                </div>
              )}
              {showTitle && title && (
                <h2 className="text-xl font-bold text-gray-800 break-words">{title}</h2>
              )}
            </div>
            {showDate && date && (
              <div className="text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1.5 rounded-full">
                {date}
              </div>
            )}
          </div>
        </div>

        {/* 便当网格布局 */}
        <div className={`grid ${getGridCols()} gap-4 p-6 pt-2`}>
          {sections.map((section, index) => {
            // 根据索引分配不同的颜色主题
            const colorThemes = [
              { bg: 'from-blue-50 to-indigo-50', border: 'border-blue-200', text: 'text-blue-900', accent: 'bg-blue-400' },
              { bg: 'from-purple-50 to-pink-50', border: 'border-purple-200', text: 'text-purple-900', accent: 'bg-purple-400' },
              { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', text: 'text-green-900', accent: 'bg-green-400' },
              { bg: 'from-orange-50 to-amber-50', border: 'border-orange-200', text: 'text-orange-900', accent: 'bg-orange-400' },
            ];
            const theme = colorThemes[index % colorThemes.length];

            return (
              <div
                key={section.id}
                className={`bg-gradient-to-br ${theme.bg} rounded-2xl border ${theme.border} p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative overflow-hidden`}
              >
                {/* 装饰性图案 */}
                <div className="absolute top-2 right-2 w-12 h-12 opacity-10">
                  <div className={`w-full h-full ${theme.accent} rounded-full`}></div>
                </div>

                {/* 区块标题 */}
                <h3 className={`font-bold ${theme.text} text-base mb-4 flex items-center break-words relative z-10`}>
                  <span className={`w-2 h-2 ${theme.accent} rounded-full mr-2`}></span>
                  <span className="break-words flex-1 min-w-0">{section.title}</span>
                </h3>

                {/* 内容列表 */}
                <div className="space-y-2 relative z-10">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start group">
                      <div className="flex-shrink-0 mt-1 mr-3">
                        {item.startsWith('- [ ]') ? (
                          <div className={`w-4 h-4 rounded border-2 ${theme.text.replace('900', '300')} flex items-center justify-center group-hover:border-${theme.text.replace('900', '500')} transition-colors`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${theme.text.replace('900', '400')} group-hover:bg-${theme.text.replace('900', '600')} transition-colors`}></div>
                          </div>
                        ) : item.startsWith('- [x]') || item.startsWith('- [X]') ? (
                          <div className={`w-4 h-4 rounded ${theme.accent} flex items-center justify-center`}>
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        ) : (
                          <div className={`w-1.5 h-1.5 ${theme.accent} rounded-full mt-2`}></div>
                        )}
                      </div>
                      <span className={`${theme.text.replace('900', '700')} text-sm leading-relaxed break-words flex-1 min-w-0`}>
                        {item.replace(/^- $/, '').replace(/^- \[.\] /, '')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 底部装饰 */}
                {section.items.length > 0 && (
                  <div className={`absolute bottom-2 left-5 right-5 h-px ${theme.text.replace('900', '200')}`}></div>
                )}
              </div>
            );
          })}
        </div>

        {/* 底部装饰 */}
        <div className="h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200"></div>
      </Card>
    </div>
  );
};

export default BentoTemplate;