import React, { useEffect, useState } from 'react';
import s from './Results.module.css';

interface Item {
  id: number;
  name: string;
  actor: string;
}

interface ResultsProps {
  results: Item[];
  error: string | null;
  loading: boolean;
}

const Results: React.FC<ResultsProps> = ({ results, error, loading }) => {
  const [pagination, setPagination] = useState(0);
  const [searchResult, setSearchResult] = useState(results);

  useEffect(()=>{},[])

  if (error) {
    return <p className={s.error}>Error: {error}</p>;
  }

  // Если загрузка, отображаем компонент загрузки
  if (loading) {
    return <p className={s.loading}>Loading...</p>;
  }

  return (
    <main className={s.resultsContainer}>
      <h2>Search Results</h2>
      <div className={s.resultsList}>
        <div className={s.headers}>
          <div className={s.headerCell}>NAME:</div>
          <div className={s.headerCell}>ACTOR:</div>
        </div>

        <div className={s.resultsScrollable}>
          {results.length > 0 ? (
            results.slice(0 + pagination, 10 + pagination).map((item) => (
              <div key={item.id} className={s.resultItem}>
                <h3>{item.name}</h3>
                <p style={{ color: item.actor ? 'yellow' : 'red' }}>
                  {item.actor || 'Name not found'}
                </p>
              </div>
            ))
          ) : (
            <h2>No results found.</h2>
          )}
        </div>
        {results.length > 10 && (
          <div className={s.pagination}>
            <button onClick={() => setPagination(pagination - 10)} disabled={pagination === 0}>{`<<< Previous`}</button>
            <button onClick={() => setPagination(pagination + 10)} disabled={results.length < 10 + pagination}>{`Next >>>`}</button>
            <span style={{ color: 'black' }}>{`Page ${Math.ceil((pagination + 10) / 10)} of ${Math.ceil(results.length / 10)}`}</span>
          </div>
        )}
      </div>
    </main>
  );
};

export default Results;
