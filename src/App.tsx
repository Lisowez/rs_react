import React, { useState, useEffect } from 'react';
import Search from './Search/Search';
import Results from './Results/Results';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

interface Item {
  id: number;
  name: string;
  actor: string;
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    setSearchTerm(savedSearchTerm);
    fetchData(savedSearchTerm);
  }, []);

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

  const handleSearch = (term: string) => {
    const trimmedSearchTerm = term.trim();
    setSearchTerm(trimmedSearchTerm);
    localStorage.setItem('searchTerm', trimmedSearchTerm);
    fetchData(trimmedSearchTerm);
  };

  return (
    <ErrorBoundary>
      <>
        <Search
          searchTerm={searchTerm}
          onSearch={handleSearch}
          loading={loading}
        />
        <Results results={results} error={error} loading={loading} />
      </>
    </ErrorBoundary>
  );
};

export default App;
