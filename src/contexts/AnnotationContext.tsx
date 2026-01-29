import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AnnotationContextType {
  isAnnotationMode: boolean;
  toggleAnnotationMode: () => void;
  setAnnotationMode: (isActive: boolean) => void;
  activeAnnotationId: string | null;
  setActiveAnnotationId: (id: string | null) => void;
}

const AnnotationContext = createContext<AnnotationContextType | undefined>(undefined);

export const AnnotationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from localStorage or default to false
  const [isAnnotationMode, setIsAnnotationMode] = useState(() => {
    const savedMode = localStorage.getItem('isAnnotationMode');
    return savedMode === 'true';
  });
  
  const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(null);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('isAnnotationMode', String(isAnnotationMode));
  }, [isAnnotationMode]);
  
  // Clear active annotation when mode is turned off
  useEffect(() => {
    if (!isAnnotationMode) {
      setActiveAnnotationId(null);
    }
  }, [isAnnotationMode]);

  const toggleAnnotationMode = () => {
    setIsAnnotationMode(prev => !prev);
  };

  const setAnnotationMode = (isActive: boolean) => {
    setIsAnnotationMode(isActive);
  };

  return (
    <AnnotationContext.Provider value={{ 
      isAnnotationMode, 
      toggleAnnotationMode, 
      setAnnotationMode,
      activeAnnotationId,
      setActiveAnnotationId
    }}>
      {children}
    </AnnotationContext.Provider>
  );
};

export const useAnnotationContext = () => {
  const context = useContext(AnnotationContext);
  if (context === undefined) {
    throw new Error('useAnnotationContext must be used within an AnnotationProvider');
  }
  return context;
};
