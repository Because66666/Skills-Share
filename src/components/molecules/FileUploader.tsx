import React, { useRef, useState } from 'react';
import { Upload, X, File as FileIcon, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { skillsService, Attachment } from '@/services/skillsService';
import { useMessage } from '@/components/feedback/Message';

interface FileUploaderProps {
  value?: Attachment[];
  onChange: (attachments: Attachment[]) => void;
  className?: string;
  maxSize?: number; // in bytes, default 10MB
  accept?: string;
  maxCount?: number; // Maximum number of files allowed
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  value = [],
  onChange,
  className,
  maxSize = 10 * 1024 * 1024,
  accept = '.pdf,.doc,.docx,.zip,.md,.txt',
  maxCount
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const message = useMessage();

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate max count
    if (maxCount && value.length >= maxCount) {
       // If maxCount is 1, we might want to replace the existing one
       if (maxCount === 1) {
         // Proceed to replace
       } else {
         message.error(`最多只能上传 ${maxCount} 个附件`);
         return;
       }
    }

    // Validate size
    if (file.size > maxSize) {
      message.error(`文件大小不能超过 ${maxSize / 1024 / 1024}MB`);
      return;
    }

    setUploading(true);
    try {
      const attachment = await skillsService.uploadFile(file);
      
      if (maxCount === 1) {
         onChange([attachment]); // Replace
      } else {
         onChange([...value, attachment]);
      }
      
      message.success('上传成功');
    } catch (error) {
      console.error('Upload failed:', error);
      message.error('上传失败，请重试');
    } finally {
      setUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleRemove = (id: string) => {
    onChange(value.filter(item => item.id !== id));
  };
  
  const canUpload = !maxCount || value.length < maxCount || maxCount === 1; // If maxCount is 1, we always allow upload (replace)

  return (
    <div className={cn("space-y-3", className)}>
      {canUpload && (
        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-6 transition-all duration-200 text-center cursor-pointer",
            isDragging 
              ? "border-blue-500 bg-blue-50" 
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
            uploading && "opacity-50 pointer-events-none"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
            accept={accept}
          />
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              {uploading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
            </div>
            <div className="text-sm">
              <span className="font-semibold text-blue-600 hover:text-blue-700">点击上传</span>
              <span className="text-gray-500"> 或拖拽文件到此处</span>
            </div>
            <p className="text-xs text-gray-400">
              支持 {accept.replace(/\./g, '').toUpperCase()} (最大 {maxSize / 1024 / 1024}MB)
              {maxCount && maxCount === 1 && "，仅限 1 个文件 (新上传将覆盖旧文件)"}
            </p>
          </div>
        </div>
      )}

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((file) => (
            <div 
              key={file.id} 
              className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm group hover:border-blue-100 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
                  <FileIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]" title={file.originalName}>
                    {file.originalName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => handleRemove(file.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
