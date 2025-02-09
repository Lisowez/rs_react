import React from 'react';
import { Outlet } from 'react-router-dom';
import Search from '../Search/Search';
import Results, { Item } from '../Results/Results';

interface IProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  loading: boolean;
  results: Item[];
  error: string | null;
}

const Layout: React.FC<IProps> = ({
  searchTerm,
  onSearch,
  loading,
  results,
  error,
}) => {
  return (
    <>
      <Search searchTerm={searchTerm} onSearch={onSearch} loading={loading} />
      <div style={{ display: 'flex', backgroundColor: 'black' }}>
        <Results results={results} error={error} loading={loading} />
        <Outlet /> {/* Это место, где будут отображаться ваши детали */}
      </div>
    </>
  );
};

export default Layout;
