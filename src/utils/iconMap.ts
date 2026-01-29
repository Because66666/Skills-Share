import { Zap, Database, Image, Code, FileText, Search, BarChart2, Shield, Globe, Cpu } from 'lucide-react';

export const IconMap: Record<string, any> = {
  Zap,
  Database,
  Image,
  Code,
  FileText,
  Search,
  BarChart2,
  Shield,
  Globe,
  Cpu,
};

export const getIconComponent = (iconName: string) => {
  return IconMap[iconName] || Zap; // Default to Zap if not found
};
