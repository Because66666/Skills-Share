import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { Eye, Image as ImageIcon } from 'lucide-react';
import { Modal } from '@/components/molecules/Modal';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  preview?: boolean;
  fallback?: string;
  className?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  preview = true,
  fallback,
  className,
  style,
  ...props
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div 
        className={cn("bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg", className)}
        style={{ width, height, ...style }}
      >
        <ImageIcon className="w-8 h-8" />
      </div>
    );
  }

  return (
    <>
      <div 
        className={cn("relative group inline-block overflow-hidden rounded-lg", className)}
        style={{ width, height }}
      >
        <img
          src={src}
          alt={alt}
          onError={handleError}
          className="w-full h-full object-cover"
          style={style}
          {...props}
        />
        {preview && (
          <div 
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
            onClick={() => setIsPreviewOpen(true)}
          >
            <Eye className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      {preview && (
        <Modal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          width="auto"
          className="bg-transparent shadow-none border-none p-0 max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
          />
        </Modal>
      )}
    </>
  );
};
