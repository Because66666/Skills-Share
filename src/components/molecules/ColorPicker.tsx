import React from 'react';
import { cn } from '@/utils/cn';
import { Check } from 'lucide-react';

export const COLORS = [
  { label: 'Blue', value: 'bg-blue-100 text-blue-600', bg: 'bg-blue-100', text: 'text-blue-600' },
  { label: 'Green', value: 'bg-green-100 text-green-600', bg: 'bg-green-100', text: 'text-green-600' },
  { label: 'Purple', value: 'bg-purple-100 text-purple-600', bg: 'bg-purple-100', text: 'text-purple-600' },
  { label: 'Red', value: 'bg-red-100 text-red-600', bg: 'bg-red-100', text: 'text-red-600' },
  { label: 'Orange', value: 'bg-orange-100 text-orange-600', bg: 'bg-orange-100', text: 'text-orange-600' },
  { label: 'Gray', value: 'bg-gray-100 text-gray-600', bg: 'bg-gray-100', text: 'text-gray-600' },
  { label: 'Pink', value: 'bg-pink-100 text-pink-600', bg: 'bg-pink-100', text: 'text-pink-600' },
  { label: 'Yellow', value: 'bg-yellow-100 text-yellow-600', bg: 'bg-yellow-100', text: 'text-yellow-600' },
];

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {COLORS.map((color) => (
        <button
          key={color.value}
          type="button"
          onClick={() => onChange(color.value)}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-all ring-offset-2",
            color.bg,
            color.text,
            value === color.value ? "ring-2 ring-gray-400 scale-110" : "hover:scale-105"
          )}
          title={color.label}
        >
          {value === color.value && <Check className="w-4 h-4" />}
        </button>
      ))}
    </div>
  );
};
