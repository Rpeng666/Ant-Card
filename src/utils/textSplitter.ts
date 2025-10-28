// 文本拆分工具函数

export interface SplitOptions {
  maxCharsPerCard: number;
  splitMode: "paragraph" | "sentence" | "character";
}

export interface SplitResult {
  chunks: string[];
  totalChunks: number;
  originalLength: number;
}

/**
 * 按段落拆分文本
 */
function splitByParagraph(text: string, maxChars: number): string[] {
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim());
  const chunks: string[] = [];
  let currentChunk = '';

  for (const paragraph of paragraphs) {
    const trimmedParagraph = paragraph.trim();
    
    // 如果当前段落本身就超过限制，需要进一步拆分
    if (trimmedParagraph.length > maxChars) {
      // 先保存当前块（如果有内容）
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
      }
      
      // 将长段落按句子拆分
      const sentences = splitBySentence(trimmedParagraph, maxChars);
      chunks.push(...sentences);
    } else {
      // 检查添加这个段落是否会超过限制
      const testChunk = currentChunk ? `${currentChunk}\n\n${trimmedParagraph}` : trimmedParagraph;
      
      if (testChunk.length <= maxChars) {
        currentChunk = testChunk;
      } else {
        // 保存当前块，开始新块
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
        }
        currentChunk = trimmedParagraph;
      }
    }
  }

  // 添加最后一个块
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks.filter(chunk => chunk.length > 0);
}

/**
 * 按句子拆分文本
 */
function splitBySentence(text: string, maxChars: number): string[] {
  // 中文和英文句子结束符
  const sentenceEnders = /[。！？；.!?;]/;
  const sentences: string[] = [];
  let currentSentence = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    currentSentence += char;
    
    // 检查是否是句子结束符
    if (sentenceEnders.test(char)) {
      // 检查下一个字符是否是引号或括号
      const nextChar = text[i + 1];
      if (!nextChar || !/["""''）】]/.test(nextChar)) {
        sentences.push(currentSentence.trim());
        currentSentence = '';
      }
    }
  }
  
  // 添加剩余内容
  if (currentSentence.trim()) {
    sentences.push(currentSentence.trim());
  }

  // 将句子组合成块
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if (sentence.length > maxChars) {
      // 句子本身太长，按字符拆分
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
      }
      const charChunks = splitByCharacter(sentence, maxChars);
      chunks.push(...charChunks);
    } else {
      const testChunk = currentChunk ? `${currentChunk} ${sentence}` : sentence;
      
      if (testChunk.length <= maxChars) {
        currentChunk = testChunk;
      } else {
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
        }
        currentChunk = sentence;
      }
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks.filter(chunk => chunk.length > 0);
}

/**
 * 按字符数拆分文本
 */
function splitByCharacter(text: string, maxChars: number): string[] {
  const chunks: string[] = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    let endIndex = currentIndex + maxChars;
    
    // 如果不是最后一块，尝试在合适的位置断开
    if (endIndex < text.length) {
      // 向前查找最近的空格、标点或换行符
      let breakPoint = endIndex;
      for (let i = endIndex; i > currentIndex + maxChars * 0.8; i--) {
        const char = text[i];
        if (/[\s，。！？；,.\!?;]/.test(char)) {
          breakPoint = i + 1;
          break;
        }
      }
      endIndex = breakPoint;
    }

    const chunk = text.slice(currentIndex, endIndex).trim();
    if (chunk) {
      chunks.push(chunk);
    }
    
    currentIndex = endIndex;
  }

  return chunks.filter(chunk => chunk.length > 0);
}

/**
 * 主要的文本拆分函数
 */
export function splitText(text: string, options: SplitOptions): SplitResult {
  if (!text || text.trim().length === 0) {
    return {
      chunks: [],
      totalChunks: 0,
      originalLength: 0
    };
  }

  const trimmedText = text.trim();
  const { maxCharsPerCard, splitMode } = options;

  // 如果文本长度不超过限制，直接返回
  if (trimmedText.length <= maxCharsPerCard) {
    return {
      chunks: [trimmedText],
      totalChunks: 1,
      originalLength: trimmedText.length
    };
  }

  let chunks: string[] = [];

  switch (splitMode) {
    case 'paragraph':
      chunks = splitByParagraph(trimmedText, maxCharsPerCard);
      break;
    case 'sentence':
      chunks = splitBySentence(trimmedText, maxCharsPerCard);
      break;
    case 'character':
      chunks = splitByCharacter(trimmedText, maxCharsPerCard);
      break;
    default:
      chunks = splitByParagraph(trimmedText, maxCharsPerCard);
  }

  return {
    chunks: chunks.filter(chunk => chunk.trim().length > 0),
    totalChunks: chunks.length,
    originalLength: trimmedText.length
  };
}

/**
 * 预览拆分结果（不实际拆分，只返回统计信息）
 */
export function previewSplit(text: string, options: SplitOptions): {
  willSplit: boolean;
  estimatedChunks: number;
  averageChunkLength: number;
} {
  if (!text || text.trim().length <= options.maxCharsPerCard) {
    return {
      willSplit: false,
      estimatedChunks: 1,
      averageChunkLength: text.trim().length
    };
  }

  const result = splitText(text, options);
  
  return {
    willSplit: true,
    estimatedChunks: result.totalChunks,
    averageChunkLength: Math.round(result.originalLength / result.totalChunks)
  };
}