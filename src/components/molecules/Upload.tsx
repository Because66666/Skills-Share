import React, { useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { UploadCloud, X, FileText } from 'lucide-react';

interface UploadProps {
  accept?: string;
  multiple?: boolean;
  onUpload?: (files: File[]) => void;
  className?: string;
}

export const Upload: React.FC<UploadProps> = ({
  accept,
  multiple = false,
  onUpload,
  className,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => multiple ? [...prev, ...newFiles] : newFiles);
      onUpload?.(newFiles);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => multiple ? [...prev, ...newFiles] : newFiles);
      onUpload?.(newFiles);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors",
          isDragging 
            ? "border-orange-500 bg-orange-50" 
            : "border-gray-200 hover:border-orange-400 hover:bg-gray-50"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />
        <div className="bg-orange-100 p-3 rounded-full mb-3">
          <UploadCloud className="w-6 h-6 text-orange-600" />
        </div>
        <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
        <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button 
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-red-500 transition-colors"
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
