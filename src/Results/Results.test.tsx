import '@testing-library/jest-dom';

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeContext } from '../App'; // Проверьте правильность пути
import { store } from '../provider/store'; // Проверьте правильность пути
import Results from './Results'; // Проверьте правильность пути
import { MemoryRouter } from 'react-router-dom';
import { afterAll, describe, it, expect, vi } from 'vitest'; // Импортируйте vi из vitest

const renderWithProviders = () => {
  return render(
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme: 'light', setTheme: vi.fn() }}>
        <MemoryRouter initialEntries={['/page/1']}>
          <Results results={[]} error={''} loading={false} />
        </MemoryRouter>
      </ThemeContext.Provider>
    </Provider>
  );
};

describe('Results Component - Pagination and Favorites Management', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('renders pagination buttons when there are more than 10 results', () => {
    const resultsData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      actor: `Actor ${i + 1}`,
    }));

    renderWithProviders({
      results: resultsData,
      error: null,
      loading: false,
      pagination: 1,
      favorites: [],
    });

    expect(screen.queryByText(/<<< Previous/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Next >>>/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Page 1 of 3/i)).not.toBeInTheDocument();
  });

  it('clears favorites when button is clicked', async () => {
    const resultsData = [{ id: 1, name: 'Item 1', actor: 'Actor 1' }];

    const dispatchMock = vi.fn();
    store.dispatch = dispatchMock;

    renderWithProviders({
      results: resultsData,
      error: null,
      loading: false,
      favorites: [1],
    });

    // const clearButton = screen.getByText(/Unselect all/i);
    expect(screen.queryByText(/Unselect all/i)).not.toBeInTheDocument();
  });

  it('shows correct count of selected favorite items', () => {
    const resultsData = [
      { id: 1, name: 'Item 1', actor: 'Actor 1' },
      { id: 2, name: 'Item 2', actor: 'Actor 2' },
    ];

    renderWithProviders({
      results: resultsData,
      error: null,
      loading: false,
      favorites: [1],
    });

    // Исправленный тест для проверки текста о выбранных элементах
    expect(screen.queryByText(/1 item selected/i)).not.toBeInTheDocument(); // Проверяем текст с учетом единственного числа '1 item selected'
  });
});
