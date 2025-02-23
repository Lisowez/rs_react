import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Layout from './Layout/Layout';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Details from './Details/Details';
import useLocalStorage from './utils/useLocalStorage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import { createContext } from 'react';
import { Item, useGetCharactersQuery } from './provider/api';

export const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}>({
  theme: 'light',
  setTheme: () => {},
});

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [results, setResults] = useState<Item[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { data, isLoading, isError } = useGetCharactersQuery();

  const fetchData = (term: string) => {
    if (data) {
      const filteredResults = data.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setResults(filteredResults);
    }
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [data]);

  const handleSearch = (term: string) => {
    const trimmedSearchTerm = term.trim();
    setSearchTerm(trimmedSearchTerm);
    fetchData(trimmedSearchTerm);
  };

  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/search/1" />} />
            <Route
              path="/search/:page"
              element={
                <Layout
                  searchTerm={searchTerm}
                  onSearch={handleSearch}
                  loading={isLoading}
                  results={results || []}
                  error={isError ? 'Error' : null}
                />
              }
            >
              <Route path="/search/:page/details" element={<Details />} />
              {/* Добавили этот маршрут */}
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
