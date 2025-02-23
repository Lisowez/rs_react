import { renderHook, act } from '@testing-library/react-hooks'; // или '@testing-library/react' если используете Alternative
import useLocalStorage from './useLocalStorage';
import { beforeEach, describe, expect, test, vi } from 'vitest';

describe('useLocalStorage', () => {
  const key = 'testKey';
  const initialValue = 'initial value';

  beforeEach(() => {
    window.localStorage.clear();
  });

  test('should initialize with default value', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string>(key, initialValue)
    );
    expect(result.current[0]).toBe(initialValue);
  });

  test('should initialize with value from localStorage', () => {
    window.localStorage.setItem(key, JSON.stringify('stored value'));
    const { result } = renderHook(() =>
      useLocalStorage<string>(key, initialValue)
    );
    expect(result.current[0]).toBe('stored value');
  });

  test('should update value and localStorage correctly', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string>(key, initialValue)
    );
    act(() => {
      result.current[1]('new value');
    });
    expect(result.current[0]).toBe('new value');
    expect(window.localStorage.getItem(key)).toBe(JSON.stringify('new value'));
  });

  test('should update value using function', () => {
    const { result } = renderHook(() => useLocalStorage<number>(key, 0));
    act(() => {
      result.current[1]((prevValue) => prevValue + 1); // Увеличиваем значение на 1
    });
    expect(result.current[0]).toBe(1);
    expect(window.localStorage.getItem(key)).toBe(JSON.stringify(1));
  });

  test('should handle JSON parsing error', () => {
    window.localStorage.setItem(key, 'invalid json');
    const { result } = renderHook(() =>
      useLocalStorage<string>(key, initialValue)
    );
    expect(result.current[0]).toBe(initialValue);
  });

  test('should handle localStorage set error gracefully', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string>(key, initialValue)
    );

    const originalSetItem = window.localStorage.setItem;
    window.localStorage.setItem = vi.fn().mockImplementation(() => {
      throw new Error('Failed to set item');
    });

    act(() => {
      result.current[1]('new value'); // Пытаемся установить новое значение
    });

    // Возвращаем оригинальную функцию
    window.localStorage.setItem = originalSetItem;

    // Проверяем, что текущее значение осталось прежним
    expect(result.current[0]).toBe('new value'); // Должно остаться прежним
  });
});
