import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './provider/store'; // Убедитесь, что путь корректен
import App from './App'; // Убедитесь, что путь корректен
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('App Rendering', () => {
  it('renders the App component', () => {
    // Рендерим приложение с Provider
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Проверяем, что приложение отрисовано
    const appElement = screen.getByText(/Harry Potter app/i); // Замените на текст, который точно есть в вашем App
    expect(appElement).toBeInTheDocument();
  });
});
