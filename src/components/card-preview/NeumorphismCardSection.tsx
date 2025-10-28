import React from 'react';

interface NeumorphismCardSectionProps {
  children: React.ReactNode;
  className?: string;
}

const NeumorphismCardSection: React.FC<NeumorphismCardSectionProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div 
      className={`
        bg-white 
        rounded-xl 
        p-4
        border border-gray-200/50
        ${className}
      `}
      style={{
        boxShadow: `
          2px 2px 6px rgba(0, 0, 0, 0.08),
          -2px -2px 6px rgba(255, 255, 255, 0.9),
          inset 1px 1px 2px rgba(255, 255, 255, 0.5)
        `,
      }}
    >
      {children}
    </div>
  );
};

export default NeumorphismCardSection;