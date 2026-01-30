import { Skill } from '@/services/skillsService';

interface MessageApi {
  success: (content: string) => void;
  error: (content: string) => void;
  info: (content: string) => void;
}

/**
 * 统一的 Skill 下载函数
 * 默认下载 /zip/{id}.zip 路径下的压缩包
 */
export const downloadSkill = (skill: Skill, message: MessageApi, attachmentUrl?: string, fileName?: string) => {
  try {
    // 优先使用传入的 attachmentUrl，否则构造默认的 zip 路径
    const targetUrl = attachmentUrl || `/zip/${skill.id}.zip`;
    const downloadFileName = fileName || `${skill.id}.zip`;

    const link = document.createElement('a');
    link.href = targetUrl;
    link.download = downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    message.success(`开始下载: ${skill.title}`);
  } catch (error) {
    console.error('Download failed', error);
    message.error(`下载失败: ${skill.title}`);
  }
};
