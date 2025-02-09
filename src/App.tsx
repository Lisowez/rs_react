import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Layout from './Layout/Layout';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Details from './Details/Details';
import useLocalStorage from './utils/useLocalStorage';
import NotFoundPage from './NotFoundPage/NotFoundPage';

interface Item {
  id: number;
  name: string;
  actor: string;
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [results, setResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = (term: string) => {
    const apiUrl = `https://hp-api.onrender.com/api/characters`;
    setLoading(true);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Item[]) => {
        const filteredResults = data.filter((item) =>
          item.name.toLowerCase().includes(term.toLowerCase())
        );
        setTimeout(() => {
          setResults(filteredResults);
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, []);

  const handleSearch = (term: string) => {
    const trimmedSearchTerm = term.trim();
    setSearchTerm(trimmedSearchTerm);
    fetchData(trimmedSearchTerm);
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/search/1" />} />
          <Route
            path="/search/:page"
            element={
              <Layout
                searchTerm={searchTerm}
                onSearch={handleSearch}
                loading={loading}
                results={results}
                error={error}
              />
            }
          >
            <Route path="/search/:page/details" element={<Details />} />
            {/* Добавили этот маршрут */}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
