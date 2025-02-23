import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';
import { vi, describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'; // Импортируем jest-dom

// Мокируем react-router-dom
vi.mock('react-router-dom', () => {
  return {
    MemoryRouter: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useNavigate: vi.fn(), // Мокаем useNavigate
  };
});

describe('NotFoundPage', () => {
  test('renders NotFoundPage with the correct message', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    // Проверяем наличие заголовка
    const titleElement = screen.getByText(/404/i);
    expect(titleElement).toBeInTheDocument();

    // Проверяем наличие текста
    const messageElement = screen.getByText(/Page not found/i);
    expect(messageElement).toBeInTheDocument();

    // Проверяем наличие кнопки
    const buttonElement = screen.getByRole('button', { name: /go back/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('navigates back when Go Back button is clicked', () => {
    const navigateMock = vi.fn(); // Создаем мок для navigate

    // Замена функции useNavigate на наш мок
    (useNavigate as unknown) = () => navigateMock;

    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    // Кликаем на кнопку
    const buttonElement = screen.getByRole('button', { name: /go back/i });
    fireEvent.click(buttonElement);

    // Проверяем, что navigate был вызван
    expect(navigateMock).toHaveBeenCalledWith(-1);
  });
});
