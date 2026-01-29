import React, { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

interface WatermarkProps {
  content?: string;
  width?: number;
  height?: number;
  rotate?: number;
  zIndex?: number;
  fontColor?: string;
  fontSize?: number;
  opacity?: number;
  children?: React.ReactNode;
  className?: string;
}

export const Watermark: React.FC<WatermarkProps> = ({
  content = 'Watermark',
  width = 200,
  height = 200,
  rotate = -20,
  zIndex = 9,
  fontColor = 'rgba(0,0,0,0.15)',
  fontSize = 16,
  opacity = 1,
  children,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!watermarkRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${width}px`);
    canvas.setAttribute('height', `${height}px`);
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = fontColor;
      ctx.translate(width / 2, height / 2);
      ctx.rotate((Math.PI / 180) * rotate);
      ctx.fillText(content, 0, 0);
      
      const base64Url = canvas.toDataURL();
      watermarkRef.current.style.backgroundImage = `url(${base64Url})`;
      watermarkRef.current.style.backgroundSize = `${width}px ${height}px`;
    }
  }, [content, width, height, rotate, fontColor, fontSize]);

  return (
    <div className={cn("relative overflow-hidden", className)} ref={containerRef}>
      {children}
      <div
        ref={watermarkRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex,
          opacity,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
};
