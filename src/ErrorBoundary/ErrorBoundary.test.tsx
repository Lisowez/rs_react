import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import '@testing-library/jest-dom'; // Импортируем jest-dom

// Компонент, который генерирует ошибку для тестирования
const ProblematicComponent = () => {
  throw new Error('Test error'); // Принудительно генерируем ошибку
  return null; // Этот код никогда не будет выполнен
};

describe('ErrorBoundary', () => {
  test('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Child component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child component')).toBeInTheDocument();
  });

  test('renders error message when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent /> {/* Это компонент, который вызывает ошибку */}
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });
});
