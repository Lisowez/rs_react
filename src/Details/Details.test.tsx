import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, expect, test, beforeEach } from 'vitest';
import Details from './Details';
import { ThemeContext } from '../App';
import { useGetCharacterByIDQuery } from '../provider/api';
import '@testing-library/jest-dom'; // Импортируем jest-dom

// Мокируем API
vi.mock('../provider/api', () => ({
  useGetCharacterByIDQuery: vi.fn(),
}));

// Интерфейс для пропсов обертки контекста
interface MockThemeProviderProps {
  children: React.ReactNode;
  theme: 'dark' | 'light';
}

const MockThemeProvider: React.FC<MockThemeProviderProps> = ({
  children,
  theme,
}) => (
  <ThemeContext.Provider value={{ theme: theme, setTheme: vi.fn() }}>
    {children}
  </ThemeContext.Provider>
);

describe('Details Component', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Сброс мока перед каждым тестом
  });

  test('displays character details correctly when data is provided', () => {
    const mockData = {
      name: 'Harry Potter',
      actor: 'Daniel Radcliffe',
      yearOfBirth: 1980,
      house: 'Gryffindor',
      image: 'http://image.url/hp.jpg',
    };
    //@ts-ignore
    (useGetCharacterByIDQuery as vi.Mock).mockReturnValue({
      isLoading: false,
      data: [mockData],
    });

    render(
      <MemoryRouter initialEntries={['/details?id=1']}>
        <MockThemeProvider theme="light">
          <Details />
        </MockThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Name: Harry Potter')).toBeInTheDocument();
    expect(screen.getByText('Faculty: Gryffindor')).toBeInTheDocument();
    expect(screen.getByText('Actor: Daniel Radcliffe')).toBeInTheDocument();
    expect(screen.getByText('Year of birth: 1980')).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockData.image);
  });

  test('applies correct styles based on light theme', () => {
    const mockData = {
      name: 'Harry Potter',
      actor: 'Daniel Radcliffe',
      yearOfBirth: 1980,
      house: 'Gryffindor',
      image: 'http://image.url/hp.jpg',
    };
    //@ts-ignore
    (useGetCharacterByIDQuery as vi.Mock).mockReturnValue({
      isLoading: false,
      data: [mockData],
    });

    render(
      <MemoryRouter initialEntries={['/details?id=1']}>
        <MockThemeProvider theme="light">
          <Details />
        </MockThemeProvider>
      </MemoryRouter>
    );

    const infoUserDiv = screen.getByRole('img').parentElement;
    expect(infoUserDiv).toHaveStyle('background-color: rgb(255, 255, 255)'); // использовать rgb для белого цвета
    expect(infoUserDiv).toHaveStyle('color: rgb(0, 0, 0)'); // использовать rgb для черного цвета
  });

  test('applies correct styles based on dark theme', () => {
    const mockData = {
      name: 'Harry Potter',
      actor: 'Daniel Radcliffe',
      yearOfBirth: 1980,
      house: 'Gryffindor',
      image: 'http://image.url/hp.jpg',
    };
    //@ts-ignore
    (useGetCharacterByIDQuery as vi.Mock).mockReturnValue({
      isLoading: false,
      data: [mockData],
    });

    render(
      <MemoryRouter initialEntries={['/details?id=1']}>
        <MockThemeProvider theme="dark">
          <Details />
        </MockThemeProvider>
      </MemoryRouter>
    );

    const infoUserDiv = screen.getByRole('img').parentElement;
    expect(infoUserDiv).toHaveStyle('background-color: rgb(255, 255, 255)'); // использовать rgb для черного цвета
    expect(infoUserDiv).toHaveStyle('color: rgb(0, 0, 0)'); // использовать rgb для желтого цвета
  });
});
