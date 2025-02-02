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
  if (error) {
    return (
      <p
        style={{
          width: '100%',
          height: '90vh',
          backgroundColor: 'black',
          color: 'yellow',
          marginTop: '0px',
          fontSize: '30px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Error: {error}
      </p>
    );
  }
  if (loading) {
    return <p className={s.loading}>Loading...</p>;
  }
  return (
    <main
      style={{
        width: '100%',
        height: '90vh',
        backgroundColor: 'black',
        color: 'yellow',
        paddingTop: '20px',
      }}
    >
      <h2 style={{ marginTop: '0px' }}>Search Results</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            width: 'calc(100% - 20px)',
            justifyContent: 'space-between',
            padding: '0 10%',
          }}
        >
          <div style={{ borderBottom: '1px solid yellow' }}>NAME:</div>
          <div style={{ borderBottom: '1px solid yellow' }}>ACTOR:</div>
        </div>
        <div
          style={{
            padding: '0 10%',
            overflowY: 'scroll',
            height: '100%',
            width: '100%',
          }}
        >
          {results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  justifyContent: 'space-between',
                }}
              >
                <h3>{item.name}</h3>
                <p style={{ color: item.actor ? 'yellow' : 'red' }}>
                  {item.actor || 'Name not found'}
                </p>
              </div>
            ))
          ) : (
            <h2 style={{ marginTop: '40%' }}>No results found.</h2>
          )}
        </div>
      </div>
    </main>
  );
};

export default Results;
