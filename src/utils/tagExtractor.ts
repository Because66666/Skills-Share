
// Simple keyword extraction utility
export const extractKeywords = (text: string, count: number = 5): string[] => {
  if (!text) return [];

  // Common stopwords (English + Chinese)
  const stopwords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'this', 'that', 'these', 'those', 'it', 'he', 'she', 'they', 'we', 'you', 'i',
    'from', 'as', 'can', 'will', 'would', 'should', 'could', 'may', 'might', 'must',
    '的', '了', '和', '是', '就', '都', '而', '及', '与', '着', '或', '一个', '没有', '我们', '你们', '他们',
    '在', '之', '用', '把', '被', '让', '向', '往', '到', '为', '对', '对于', '关于', '按照',
    'markdown', 'editor', 'content', 'skill', // Context specific common words that might not be useful tags
    'start', 'end', 'create', 'update', 'delete'
  ]);

  // Normalize text: remove markdown symbols, punctuation, etc.
  const cleanText = text
    .toLowerCase()
    .replace(/[#*`~_\[\]()!@$%^&={};:'",.<>/?\\|]/g, ' ') // Remove special chars
    .replace(/\s+/g, ' '); // Collapse whitespace

  // Split into words (simple space split for English, maybe char split for Chinese? 
  // For mixed content, this is tricky. Let's assume space-separated or significant terms.
  // A better approach for Chinese is using a segmenter, but in browser environment without huge libs,
  // we can just split by non-word characters.
  
  const words = cleanText.split(' ').filter(w => w.length > 1 && !stopwords.has(w));

  // Count frequency
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Sort by frequency
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => word);
};
