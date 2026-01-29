import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  disabled,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onChange?.(newDate);
    setIsOpen(false);
  };

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const blanks = Array(firstDay).fill(null);
    const dayList = Array.from({ length: days }, (_, i) => i + 1);

    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <span className="font-medium text-gray-900">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <div key={d} className="text-gray-400 font-medium">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {blanks.map((_, i) => <div key={`blank-${i}`} />)}
          {dayList.map(day => {
            const isSelected = value && 
              value.getDate() === day && 
              value.getMonth() === month && 
              value.getFullYear() === year;
            
            const isToday = new Date().getDate() === day &&
              new Date().getMonth() === month &&
              new Date().getFullYear() === year;

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={cn(
                  "w-8 h-8 rounded-full text-sm flex items-center justify-center transition-colors",
                  isSelected 
                    ? "bg-orange-500 text-white" 
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
                  !isSelected && isToday && "text-orange-500 font-bold"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-left text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-orange-500/10 transition-all",
          disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:border-gray-300",
          isOpen && "border-orange-500 ring-2 ring-orange-500/10"
        )}
      >
        <CalendarIcon className="w-4 h-4 text-gray-400" />
        <span className={cn("block truncate", value ? "text-gray-900" : "text-gray-400")}>
          {value ? value.toLocaleDateString() : placeholder}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg w-[280px]">
          {renderCalendar()}
        </div>
      )}
    </div>
  );
};
