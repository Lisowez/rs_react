import React, { useEffect, useState } from 'react';
import s from './Results.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

export interface Item {
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
  const location = useLocation();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState(0);

  useEffect(() => {
    const numberPage = location.pathname.split('/')[2];
    if (numberPage) {
      setPagination(+numberPage);
    }
  }, [location]);

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
            results
              .slice(10 * (pagination - 1), 10 * pagination)
              .map((item) => (
                <div
                  key={item.id}
                  className={s.resultItem}
                  onClick={() => {
                    navigate(`details?id=${item.id}`);
                  }}
                >
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
            <button
              onClick={() => {
                const locationArr = location.pathname.split('/');
                locationArr[2] = (pagination - 1).toString();
                const newLocation = `${locationArr.join('/')}${location.search}`;
                navigate(newLocation);
              }}
              disabled={pagination === 1}
            >{`<<< Previous`}</button>
            <button
              onClick={() => {
                const nextPage = pagination + 1;
                const locationArr = location.pathname.split('/');
                locationArr[2] = nextPage.toString();
                const newLocation = `${locationArr.join('/')}${location.search}`;
                navigate(newLocation);
              }}
              disabled={results.length / 10 <= pagination}
            >{`Next >>>`}</button>
            <span
              style={{ color: 'yellow' }}
            >{`Page ${pagination} of ${Math.ceil(results.length / 10)}`}</span>
          </div>
        )}
      </div>
    </main>
  );
};

export default Results;
