import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

const TEST_KEY = 'test_key';
const INITIAL_VALUE = 'initial';

describe('useLocalStorage Hook', () => {
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    localStorage.clear();
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should return initialValue if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, INITIAL_VALUE));

    expect(result.current[0]).toBe(INITIAL_VALUE);
    expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(INITIAL_VALUE));
  });

  it('should read and parse existing value from localStorage upon initialization', () => {
    const existingValue = 'stored_data';
    localStorage.setItem(TEST_KEY, JSON.stringify(existingValue));

    const { result } = renderHook(() => useLocalStorage(TEST_KEY, INITIAL_VALUE));

    expect(result.current[0]).toBe(existingValue);
  });

  it('should update localStorage when setStoredValue is called', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, INITIAL_VALUE));
    const [, setValue] = result.current;

    act(() => {
      setValue('new_value');
    });

    expect(result.current[0]).toBe('new_value');
    expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify('new_value'));
  });

  it('should return initialValue and log error if localStorage contains invalid JSON string', () => {
    localStorage.setItem(TEST_KEY, '{invalid_json');

    const { result } = renderHook(() => useLocalStorage(TEST_KEY, INITIAL_VALUE));

    expect(result.current[0]).toBe(INITIAL_VALUE);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle and catch error if localStorage.setItem throws an exception', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Mocked localStorage error');
    });

    const { result } = renderHook(() => useLocalStorage(TEST_KEY, INITIAL_VALUE));
    const [, setValue] = result.current;

    act(() => {
      setValue('trigger_error');
    });

    expect(consoleErrorSpy).toHaveBeenCalled();

    setItemSpy.mockRestore();
  });
});
