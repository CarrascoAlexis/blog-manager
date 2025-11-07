import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Clear all mocks
    vi.clearAllMocks();
  });

  it('should return initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should return stored value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('stored-value');
  });

  it('should update localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('should handle objects and arrays', () => {
    const testObject = { name: 'Test', count: 42 };
    const { result } = renderHook(() => useLocalStorage('test-key', testObject));
    
    expect(result.current[0]).toEqual(testObject);

    const newObject = { name: 'Updated', count: 100 };
    act(() => {
      result.current[1](newObject);
    });

    expect(result.current[0]).toEqual(newObject);
    expect(JSON.parse(localStorage.getItem('test-key') || '{}')).toEqual(newObject);
  });

  it('should update value correctly', () => {
    const { result } = renderHook(() => useLocalStorage('counter', 0));
    
    act(() => {
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1](6);
    });

    expect(result.current[0]).toBe(6);
  });

  it('should handle invalid JSON gracefully', () => {
    localStorage.setItem('test-key', 'invalid-json{');
    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'));
    expect(result.current[0]).toBe('fallback');
  });
});
