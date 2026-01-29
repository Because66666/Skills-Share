import { useTheme } from '@/contexts/ThemeContext';

interface ChartTheme {
  gridColor: string;
  textColor: string;
  tooltipBg: string;
  tooltipBorder: string;
}

export const useChartTheme = (): ChartTheme => {
  const { theme } = useTheme();

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    return {
      gridColor: '#374151', // gray-700
      textColor: '#9ca3af', // gray-400
      tooltipBg: '#1f2937', // gray-800
      tooltipBorder: '#374151', // gray-700
    };
  }

  return {
    gridColor: '#f3f4f6', // gray-100
    textColor: '#9ca3af', // gray-400
    tooltipBg: '#ffffff', // white
    tooltipBorder: '#e5e7eb', // gray-200
  };
};