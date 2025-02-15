import React, { useContext, useEffect, useState } from 'react';
import s from './Results.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavorite,
  clearFavorites,
  getFavorites,
  removeFavorite,
} from '../provider/reduxProvider';

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
  const { theme } = useContext(ThemeContext);
  const favorites = useSelector(getFavorites);
  const dispatch = useDispatch();

  useEffect(() => {
    const numberPage = location.pathname.split('/')[2];
    if (numberPage) {
      setPagination(+numberPage);
    }
  }, [location]);

  if (error) {
    return (
      <p
        style={{
          color: theme === 'light' ? 'black' : 'yellow',
          backgroundColor: theme === 'light' ? 'white' : 'black',
        }}
        className={s.error}
      >
        Error: {error}
      </p>
    );
  }

  // Если загрузка, отображаем компонент загрузки
  if (loading) {
    return (
      <p
        style={{
          color: theme === 'light' ? 'black' : 'yellow',
          backgroundColor: theme === 'light' ? 'white' : 'black',
        }}
        className={s.loading}
      >
        Loading...
      </p>
    );
  }

  const convertToCSV = (data: Item[]) => {
    const headers = [
      'name',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      'actor',
    ];
    const rows = data.map((item) => [
      item.name,
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      item.actor,
    ]);
    return [headers, ...rows].map((e) => e.join(' ')).join('\n');
  };

  const downloadCSV = () => {
    const selectedItems = results.filter((item) => favorites.includes(item.id));
    const csvData = convertToCSV(selectedItems);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    const fileName = `${selectedItems.length}_characters.csv`;
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <main
      className={s.resultsContainer}
      style={{
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'yellow',
      }}
    >
      <h2>Search Results</h2>
      <div
        className={s.resultsList}
        style={{
          backgroundColor: theme === 'light' ? 'white' : 'black',
          color: theme === 'light' ? 'black' : 'yellow',
        }}
      >
        <div className={s.headers}>
          <div className={s.headerCell}>NAME:</div>
          <div className={s.headerCell}>ACTOR:</div>
        </div>

        <div
          className={s.resultsScrollable}
          style={{
            borderTop: `1px solid ${theme === 'light' ? 'black' : 'yellow'}`,
            paddingTop: '10px',
          }}
        >
          {results.length > 0 ? (
            results
              .slice(10 * (pagination - 1), 10 * pagination)
              .map((item) => (
                <div key={item.id} className={s.resultItem}>
                  <h3
                    onClick={() => {
                      navigate(`details?id=${item.id}`);
                    }}
                    style={{
                      width: '30%',
                      display: 'flex',
                      alignContent: 'start',
                      cursor: 'pointer',
                    }}
                  >
                    {item.name}
                  </h3>
                  <p
                    style={{
                      color: item.actor
                        ? `${theme === 'light' ? 'black' : 'yellow'}`
                        : 'red',
                      width: '20%',
                      display: 'flex',
                      alignContent: 'start',
                    }}
                  >
                    {item.actor || 'Name not found'}
                  </p>
                  <p
                    style={{ cursor: 'pointer', width: '30%' }}
                    onClick={() => {
                      if (favorites.includes(item.id)) {
                        dispatch(removeFavorite(item.id));
                      } else {
                        dispatch(addFavorite(item.id));
                      }
                    }}
                  >
                    {favorites.includes(item.id)
                      ? 'Remove from favorites'
                      : 'Add to favorites'}
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
              style={{
                color: `${theme === 'light' ? 'yellow' : 'black'}`,
                backgroundColor: `${theme === 'light' ? 'black' : 'white'}`,
              }}
              onClick={() => {
                const locationArr = location.pathname.split('/');
                locationArr[2] = (pagination - 1).toString();
                const newLocation = `${locationArr.join('/')}${location.search}`;
                navigate(newLocation);
              }}
              disabled={pagination === 1}
            >{`<<< Previous`}</button>
            <button
              style={{
                color: `${theme === 'light' ? 'yellow' : 'black'}`,
                backgroundColor: `${theme === 'light' ? 'black' : 'white'}`,
              }}
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
              style={{ color: `${theme === 'light' ? 'black' : 'yellow'}` }}
            >{`Page ${pagination} of ${Math.ceil(results.length / 10)}`}</span>
          </div>
        )}
      </div>
      {favorites.length > 0 && (
        <div
          style={{
            width: '15%',
            position: 'absolute',
            bottom: '5px',
            right: '5px',
            border: `1px solid ${theme === 'light' ? 'black' : 'yellow'}`,
          }}
        >
          <div>
            {favorites.length > 1
              ? `${favorites.length} items selected`
              : `${favorites.length} item selected`}
          </div>
          <div>
            <button
              onClick={() => dispatch(clearFavorites())}
              style={{
                color: `${theme === 'light' ? 'yellow' : 'black'}`,
                backgroundColor: `${theme === 'light' ? 'black' : 'white'}`,
              }}
            >
              Unselect all
            </button>
            <button
              onClick={() => downloadCSV()}
              style={{
                color: `${theme === 'light' ? 'yellow' : 'black'}`,
                backgroundColor: `${theme === 'light' ? 'black' : 'white'}`,
              }}
            >
              Download
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Results;
