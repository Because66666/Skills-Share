import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface DateRangePickerProps {
  value?: [Date | undefined, Date | undefined];
  onChange?: (value: [Date | undefined, Date | undefined]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value = [undefined, undefined],
  onChange,
  placeholder = 'Select date range',
  disabled,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Internal state for current view month (independent of selected dates)
  // This tracks the month displayed in the LEFT calendar
  const [currentDate, setCurrentDate] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [startDate, endDate] = value;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const isSameDay = (d1?: Date, d2?: Date) => {
    if (!d1 || !d2) return false;
    return d1.getDate() === d2.getDate() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getFullYear() === d2.getFullYear();
  };

  const isDateInRange = (date: Date, start?: Date, end?: Date) => {
    if (!start || !end) return false;
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    return d > Math.min(s, e) && d < Math.max(s, e);
  };

  const handleDateClick = (year: number, month: number, day: number) => {
    const clickedDate = new Date(year, month, day);
    
    let newStart = startDate;
    let newEnd = endDate;

    if (!startDate || (startDate && endDate)) {
      // Start new selection
      newStart = clickedDate;
      newEnd = undefined;
    } else {
      // Complete selection
      if (clickedDate < startDate) {
        newEnd = startDate;
        newStart = clickedDate;
      } else {
        newEnd = clickedDate;
      }
      setIsOpen(false); // Close on selection complete
    }

    onChange?.([newStart, newEnd]);
  };

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.([undefined, undefined]);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const renderMonthGrid = (year: number, month: number) => {
    const days = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const blanks = Array(firstDay).fill(null);
    const dayList = Array.from({ length: days }, (_, i) => i + 1);

    return (
      <div className="w-[280px] p-4">
         <div className="flex items-center justify-center mb-4 relative">
          <span className="font-medium text-gray-900">
            {new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <div key={d} className="text-gray-400 font-medium">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {blanks.map((_, i) => <div key={`blank-${i}`} />)}
          {dayList.map(day => {
            const currentDayDate = new Date(year, month, day);
            
            const isStart = isSameDay(currentDayDate, startDate);
            const isEnd = isSameDay(currentDayDate, endDate);
            const inRange = isDateInRange(currentDayDate, startDate, endDate);
            const isToday = isSameDay(currentDayDate, new Date());

            let buttonClass = "w-8 h-8 rounded-full text-sm flex items-center justify-center transition-colors relative z-10";
            let wrapperClass = "relative";

            if (isStart || isEnd) {
              buttonClass += " bg-orange-500 text-white hover:bg-orange-600";
            } else if (inRange) {
              buttonClass += " bg-orange-50 text-orange-700 hover:bg-orange-100";
            } else {
              buttonClass += " text-gray-700 hover:bg-gray-100";
              if (isToday) buttonClass += " text-orange-500 font-bold";
            }

            return (
              <div key={day} className={wrapperClass}>
                {inRange && (
                   <div className="absolute inset-0 bg-orange-50 my-1 -mx-0.5" />
                )}
                {isStart && endDate && (
                   <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-orange-50 my-1" />
                )}
                {isEnd && startDate && (
                   <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-orange-50 my-1" />
                )}
                
                <button
                  onClick={() => handleDateClick(year, month, day)}
                  className={buttonClass}
                >
                  {day}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDualCalendar = () => {
    const leftDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const rightDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    return (
      <div className="flex bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden">
        <div className="relative">
           {/* Left navigation button */}
           <button 
             onClick={() => changeMonth(-1)} 
             className="absolute left-2 top-4 z-10 p-1 hover:bg-gray-100 rounded-full"
           >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          {renderMonthGrid(leftDate.getFullYear(), leftDate.getMonth())}
        </div>
        
        <div className="w-px bg-gray-100 my-4" />
        
        <div className="relative">
           {/* Right navigation button */}
           <button 
             onClick={() => changeMonth(1)} 
             className="absolute right-2 top-4 z-10 p-1 hover:bg-gray-100 rounded-full"
           >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
          {renderMonthGrid(rightDate.getFullYear(), rightDate.getMonth())}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-left text-sm flex items-center gap-2 cursor-pointer transition-all",
          disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:border-gray-300",
          isOpen && "border-orange-500 ring-2 ring-orange-500/10"
        )}
      >
        <CalendarIcon className="w-4 h-4 text-gray-400 shrink-0" />
        <span className={cn("block truncate flex-1", (startDate || endDate) ? "text-gray-900" : "text-gray-400")}>
          {startDate ? (
            <>
              {formatDate(startDate)}
              <span className="mx-1 text-gray-400">-</span>
              {endDate ? formatDate(endDate) : 'End Date'}
            </>
          ) : (
            placeholder
          )}
        </span>
        {(startDate || endDate) && !disabled && (
          <div 
            role="button"
            onClick={clearSelection}
            className="p-0.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600"
          >
            <X className="w-3 h-3" />
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 right-0 sm:left-auto sm:right-0 md:left-0 md:right-auto">
          {renderDualCalendar()}
        </div>
      )}
    </div>
  );
};
