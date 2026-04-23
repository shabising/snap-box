import { createContext, useContext } from 'react';

export const ImageContext = createContext(null);

export function useImageContext() {
  const ctx = useContext(ImageContext);
  if (!ctx) throw new Error('useImageContext must be used within ImageProvider');
  return ctx;
}