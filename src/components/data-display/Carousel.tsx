import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
  height?: string | number;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  autoplay = false,
  interval = 3000,
  className,
  height = '300px',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<any>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (autoplay) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === children.length - 1 ? 0 : prevIndex + 1
        );
      }, interval);
    }
    return () => resetTimeout();
  }, [currentIndex, children.length, autoplay, interval]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? children.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === children.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  if (!children || children.length === 0) return null;

  return (
    <div className={cn("relative group w-full overflow-hidden rounded-xl", className)} style={{ height }}>
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0 h-full">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {children.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={cn(
              "w-2 h-2 rounded-full cursor-pointer transition-all duration-300",
              currentIndex === slideIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </div>
  );
};
