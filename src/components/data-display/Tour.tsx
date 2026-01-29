import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/atoms/Button';
import { X } from 'lucide-react';

export interface TourStep {
  target: string | (() => HTMLElement | null); // Selector or function returning element
  title: string;
  description: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface TourProps {
  steps: TourStep[];
  open: boolean;
  onClose: () => void;
  onFinish?: () => void;
}

export const Tour: React.FC<TourProps> = ({ steps, open, onClose, onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!open) {
      setCurrentStep(0);
      setTargetRect(null);
      return;
    }

    const updatePosition = () => {
      const step = steps[currentStep];
      let element: HTMLElement | null = null;

      if (typeof step.target === 'string') {
        element = document.querySelector(step.target) as HTMLElement;
      } else {
        element = step.target();
      }

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTargetRect(element.getBoundingClientRect());
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [open, currentStep, steps]);

  if (!open || !targetRect) return null;

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      onFinish?.();
      onClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  // Calculate popover position
  let popoverStyle: React.CSSProperties = {};
  const gap = 12;

  // Simple positioning logic (can be improved with floating-ui)
  // Defaulting to bottom-start for simplicity
  popoverStyle = {
    top: targetRect.bottom + gap + window.scrollY,
    left: targetRect.left + window.scrollX,
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] overflow-hidden">
      {/* Mask */}
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{
          boxShadow: `0 0 0 9999px rgba(0, 0, 0, 0.5)`,
          // Using a massive shadow to create a cutout effect
          // Or better: SVG mask
        }}
      >
        {/* SVG Mask for better visual */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <mask id="tour-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect 
                x={targetRect.left} 
                y={targetRect.top} 
                width={targetRect.width} 
                height={targetRect.height} 
                rx="8" 
                fill="black" 
              />
            </mask>
          </defs>
          <rect 
            x="0" 
            y="0" 
            width="100%" 
            height="100%" 
            fill="rgba(0,0,0,0.5)" 
            mask="url(#tour-mask)" 
          />
        </svg>
      </div>
      
      {/* Highlight Border */}
      <div
        className="absolute border-2 border-orange-500 rounded-lg pointer-events-none transition-all duration-300"
        style={{
          top: targetRect.top - 4,
          left: targetRect.left - 4,
          width: targetRect.width + 8,
          height: targetRect.height + 8,
        }}
      />

      {/* Popover */}
      <div
        className="absolute bg-white rounded-xl shadow-xl p-4 w-[320px] animate-in fade-in zoom-in-95 duration-300"
        style={popoverStyle}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900">{step.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">{step.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">
            {currentStep + 1} / {steps.length}
          </div>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button size="sm" variant="outline" onClick={handlePrev}>
                上一步
              </Button>
            )}
            <Button size="sm" onClick={handleNext}>
              {isLast ? '完成' : '下一步'}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
