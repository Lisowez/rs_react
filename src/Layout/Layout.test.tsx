import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, expect, test } from 'vitest';
import Layout from './Layout';
import type { Item } from '../Results/Results';
import '@testing-library/jest-dom'; // Импортируем jest-dom

// Мокаем дочерние компоненты
vi.mock('../Search/Search', () => {
  return {
    default: ({
      searchTerm,
      onSearch,
      loading,
    }: {
      searchTerm: string;
      onSearch: (term: string) => void;
      loading: boolean;
    }) => (
      <div data-testid="search">
        <input value={searchTerm} onChange={(e) => onSearch(e.target.value)} />
        {loading && <span>Loading...</span>}
      </div>
    ),
  };
});

vi.mock('../Results/Results', () => {
  return {
    default: ({
      results,
      error,
      loading,
    }: {
      results: Item[];
      error: string | null;
      loading: boolean;
    }) => (
      <div data-testid="results">
        {loading && <span>Loading Results...</span>}
        {error && <span>{error}</span>}
        {results.length > 0 ? (
          results.map((item) => <div key={item.id}>{item.name}</div>)
        ) : (
          <span>No results found</span>
        )}
      </div>
    ),
  };
});

// Проверяем компонент Layout
describe('Layout Component', () => {
  const mockOnSearch = vi.fn();

  test('renders Search and Results components', () => {
    const mockResults = [{ id: 1, name: 'Item 1', actor: 'Actor 1' }];

    render(
      <MemoryRouter>
        <Layout
          searchTerm="test"
          onSearch={mockOnSearch}
          loading={false}
          results={mockResults}
          error={null}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('search')).toBeInTheDocument();
    expect(screen.getByTestId('results')).toBeInTheDocument();
  });

  test('renders loading state in Search component', () => {
    render(
      <MemoryRouter>
        <Layout
          searchTerm="test"
          onSearch={mockOnSearch}
          loading={true}
          results={[]}
          error={null}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders loading state in Results component', () => {
    render(
      <MemoryRouter>
        <Layout
          searchTerm="test"
          onSearch={mockOnSearch}
          loading={true}
          results={[]}
          error={null}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading Results...')).toBeInTheDocument();
  });

  test('renders error state in Results component', () => {
    const errorMessage = 'An error occurred';

    render(
      <MemoryRouter>
        <Layout
          searchTerm="test"
          onSearch={mockOnSearch}
          loading={false}
          results={[]}
          error={errorMessage}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders no results state in Results component', () => {
    render(
      <MemoryRouter>
        <Layout
          searchTerm="test"
          onSearch={mockOnSearch}
          loading={false}
          results={[]}
          error={null}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
