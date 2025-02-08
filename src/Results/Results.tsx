import React from 'react';
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
  // Если есть ошибка, отображаем компонент с ошибкой
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
            results.map((item) => (
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
      </div>
    </main>
  );
};

export default Results;
