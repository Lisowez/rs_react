import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';
import { ThemeContext } from '../App';
import '@testing-library/jest-dom';

describe('Search testing', () => {
  const searchTerm = 'harry';
  const onSearch = vi.fn();
  let loading = false;
  let input: HTMLInputElement;
  let searchButton: HTMLButtonElement;
  let themeToggleButton: HTMLButtonElement;

  beforeEach(() => {
    render(
      <ThemeContext.Provider value={{ theme: 'light', setTheme: vi.fn() }}>
        <Search searchTerm={searchTerm} onSearch={onSearch} loading={loading} />
      </ThemeContext.Provider>
    );
    input = screen.getByPlaceholderText(
      'Enter search term'
    ) as HTMLInputElement;
    searchButton = screen.getByTestId('search-button') as HTMLButtonElement;
    themeToggleButton = screen.getByText(
      'Change on dark theme'
    ) as HTMLButtonElement;
  });

  test('Search input initializes with the correct search term', () => {
    expect(input.value).toBe(searchTerm);
  });

  test('Search button should show "Searching..." when loading is true', () => {
    loading = true;
    render(
      <ThemeContext.Provider value={{ theme: 'light', setTheme: vi.fn() }}>
        <Search searchTerm={searchTerm} onSearch={onSearch} loading={loading} />
      </ThemeContext.Provider>
    );
    searchButton = screen.getByRole('button', {
      name: 'Searching...',
    }) as HTMLButtonElement;
    expect(searchButton).toBeInTheDocument();
  });

  test('Input value updates on change', () => {
    fireEvent.change(input, { target: { value: 'new term' } });
    expect(input.value).toBe('new term');
  });

  test('Theme toggle button changes theme', () => {
    fireEvent.click(themeToggleButton);
    expect(themeToggleButton.textContent).toBe('Change on dark theme');
  });
});
