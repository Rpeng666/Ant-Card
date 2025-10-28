import React from 'react';

interface NeumorphismCardProps {
  children: React.ReactNode;
  className?: string;
}

const NeumorphismCard: React.FC<NeumorphismCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* 伪终端窗口顶部 */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 rounded-t-2xl flex items-center justify-between">
        {/* macOS 风格的三色圆点 */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        
        {/* 窗口标题 */}
        <div className="text-sm font-medium text-gray-600 font-mono">
          Streamer Card
        </div>
        
        {/* 占位符保持平衡 */}
        <div className="w-16"></div>
      </div>
      
      {/* 新拟态卡片主体 */}
      <div 
        className="bg-gray-50 rounded-b-2xl p-8 space-y-6"
        style={{
          boxShadow: `
            inset 8px 8px 16px rgba(0, 0, 0, 0.1),
            inset -8px -8px 16px rgba(255, 255, 255, 0.8),
            0 4px 16px rgba(0, 0, 0, 0.05)
          `,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default NeumorphismCard;