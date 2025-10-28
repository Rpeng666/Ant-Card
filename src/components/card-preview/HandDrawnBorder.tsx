import React from 'react';

interface HandDrawnBorderProps {
  width: number;
  height: number;
  strokeColor?: string;
}

const HandDrawnBorder: React.FC<HandDrawnBorderProps> = ({
  width,
  height,
  strokeColor = '#000000',
}) => {
  const generateHandDrawnLine = (x1: number, y1: number, x2: number, y2: number, roughness: number) => {
    const points: [number, number][] = [];
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const step = 8;
    const steps = Math.ceil(distance / step);
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * roughness;
      const y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * roughness;
      points.push([x, y]);
    }
    
    let path = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      const [x, y] = points[i];
      const [prevX, prevY] = points[i - 1];
      const cpX = (prevX + x) / 2 + (Math.random() - 0.5) * roughness * 0.5;
      const cpY = (prevY + y) / 2 + (Math.random() - 0.5) * roughness * 0.5;
      path += ` Q ${cpX} ${cpY} ${x} ${y}`;
    }
    
    return path;
  };

  // 细线条：上边和左边
  const topLine = generateHandDrawnLine(0, 0, width, 0, 1.5);
  const leftLine = generateHandDrawnLine(0, 0, 0, height, 1.5);
  
  // 粗线条：右边和下边
  const rightLine = generateHandDrawnLine(width, 0, width, height, 2);
  const bottomLine = generateHandDrawnLine(width, height, 0, height, 2);

  return (
    <svg
      width={width}
      height={height}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <defs>
        <filter id="roughPaper" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            baseFrequency="0.015"
            numOctaves="2"
            result="noise"
            seed="2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0.5"
          />
        </filter>
      </defs>
      
      {/* 细线条 - 上边 */}
      <path
        d={topLine}
        fill="none"
        stroke={strokeColor}
        strokeWidth={1.5}
        opacity={0.8}
        filter="url(#roughPaper)"
      />
      
      {/* 细线条 - 左边 */}
      <path
        d={leftLine}
        fill="none"
        stroke={strokeColor}
        strokeWidth={1.5}
        opacity={0.8}
        filter="url(#roughPaper)"
      />
      
      {/* 粗线条 - 右边 */}
      <path
        d={rightLine}
        fill="none"
        stroke={strokeColor}
        strokeWidth={3}
        opacity={0.9}
        filter="url(#roughPaper)"
      />
      
      {/* 粗线条 - 下边 */}
      <path
        d={bottomLine}
        fill="none"
        stroke={strokeColor}
        strokeWidth={3}
        opacity={0.9}
        filter="url(#roughPaper)"
      />
    </svg>
  );
};

export default HandDrawnBorder;