import React, { useEffect, useState } from 'react';

interface SearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  loading: boolean;
}

const Search: React.FC<SearchProps> = ({ searchTerm, onSearch, loading }) => {
  const [inputValue, setInputValue] = useState<string>(searchTerm);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  if (isError) {
    throw new Error('Test error');
  }

  return (
    <header
      style={{
        display: 'flex',
        width: '99vw',
        height: '10%',
        flexDirection: 'row',
        gap: '50px',
        alignItems: 'center',
        justifyContent: 'space-around',
        textAlign: 'center',
        margin: '0 auto',
        backgroundColor: 'yellow',
        padding: '20px',
      }}
    >
      <h1>Harry Potter app</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter search term"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      <button onClick={() => setIsError(true)}>Throw error</button>
    </header>
  );
};

export default Search;
