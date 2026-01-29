import React from 'react';
import { useAnnotationContext } from '@/contexts/AnnotationContext';
import { Popover } from '@/components/data-display/Popover';
import { cn } from '@/utils/cn';
import { Button } from '@/components/atoms/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface BusinessRuleAnnotationProps {
  /** 序号，如 "01", "02" */
  step: string | number;
  /** 规则标题 */
  title: string;
  /** 详细规则内容，支持富文本或组件 */
  content: React.ReactNode;
  /** 标注相对于子元素的位置，默认 top-right */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** 是否内嵌显示（避免溢出容器），默认 false */
  inset?: boolean;
  /** 手动指定弹出方向，覆盖自动推导逻辑 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** 是否强制显示（忽略全局开关），用于特定调试 */
  forceVisible?: boolean;
  /** 包裹的目标业务组件 */
  children?: React.ReactNode;
}

export const BusinessRuleAnnotation: React.FC<BusinessRuleAnnotationProps> = ({
  step,
  title,
  content,
  children,
  position = 'top-right',
  inset = false,
  placement,
  forceVisible = false,
}) => {
  const { isAnnotationMode, activeAnnotationId, setActiveAnnotationId } = useAnnotationContext();

  // If not in annotation mode and not forced, just render children
  if (!isAnnotationMode && !forceVisible) {
    return <>{children}</>;
  }

  // Format step to always be at least 2 digits if it's a number
  const formattedStep = typeof step === 'number' ? step.toString().padStart(2, '0') : step;

  // Determine if this annotation should be open
  const isOpen = activeAnnotationId === formattedStep;

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setActiveAnnotationId(formattedStep);
    } else {
      // Only close if we are the active one
      if (activeAnnotationId === formattedStep) {
        setActiveAnnotationId(null);
      }
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const current = parseInt(formattedStep, 10);
    if (!isNaN(current)) {
      const prev = current - 1;
      if (prev >= 1) {
        setActiveAnnotationId(prev.toString().padStart(2, '0'));
      }
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const current = parseInt(formattedStep, 10);
    if (!isNaN(current)) {
      const next = current + 1;
      setActiveAnnotationId(next.toString().padStart(2, '0'));
    }
  };

  // Calculate badge position
  const positionClasses = inset ? {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  } : {
    'top-left': '-top-3 -left-3',
    'top-right': '-top-3 -right-3',
    'bottom-left': '-bottom-3 -left-3',
    'bottom-right': '-bottom-3 -right-3',
  };

  // Determine popover position strategy:
  // 1. If manual 'placement' is provided, use it.
  // 2. Otherwise, use 'Auto-Inverse' strategy based on badge position:
  //    - Right-side badges (top-right, bottom-right) -> expand LEFT
  //    - Left-side badges (top-left, bottom-left) -> expand RIGHT
  const getAutoPlacement = () => {
    if (position === 'top-right' || position === 'bottom-right') return 'left';
    return 'right';
  };

  const finalPlacement = placement || getAutoPlacement();

  // Adjust border styling based on placement to maintain visual connection
  const borderClass = finalPlacement === 'left' 
    ? 'border-r-4 border-r-gray-900' 
    : 'border-l-4 border-l-gray-900';

  const badge = (
    <div className="bg-gray-900 text-white w-7 h-7 flex items-center justify-center text-xs font-bold shadow-lg rounded-sm cursor-pointer hover:scale-110 transition-transform border border-white z-10">
      {formattedStep}
    </div>
  );

  const popoverContent = (
    <div className="flex flex-col gap-2 min-w-[300px]">
      <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
        <div className="bg-gray-900 text-white px-2 py-1 font-mono text-sm rounded-sm">
          {formattedStep}
        </div>
        <h4 className="font-bold text-gray-900 flex-1">{title}</h4>
      </div>
      <div className="text-gray-600 text-sm leading-relaxed mt-1 space-y-1">
        {content}
      </div>
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handlePrev}
          disabled={!isNaN(parseInt(formattedStep, 10)) && parseInt(formattedStep, 10) <= 1}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          上一个
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleNext}
          rightIcon={<ChevronRight className="w-4 h-4" />}
        >
          下一个
        </Button>
      </div>
    </div>
  );

  return (
    <div className="relative group block w-full">
      {children}
      <div className={cn("absolute z-[100]", positionClasses[position])}>
        <Popover
          trigger={badge}
          content={popoverContent}
          position={finalPlacement}
          className={cn("w-96 p-4", borderClass)}
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
        />
      </div>
    </div>
  );
};
