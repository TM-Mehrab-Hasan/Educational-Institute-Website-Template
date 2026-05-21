import { renderHook, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import React from 'react';
import { describe, it, expect } from 'vitest';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('LanguageContext', () => {
  it('should default to English', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.language).toBe('en');
  });

  it('should switch language', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => {
      result.current.setLanguage('bn');
    });
    expect(result.current.language).toBe('bn');
  });

  it('should translate keys correctly', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.t('nav.home')).toBe('Home');
    
    act(() => {
      result.current.setLanguage('bn');
    });
    expect(result.current.t('nav.home')).toBe('হোম');
  });

  it('should return the key if translation is missing', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.t('non.existent.key')).toBe('non.existent.key');
  });
});
