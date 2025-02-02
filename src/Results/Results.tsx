import React from 'react';

interface Item {
  id: number;
  name: string;
  actor: string;
}

interface ResultsProps {
  results: Item[];
}

const Results: React.FC<ResultsProps> = ({ results }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.length > 0 ? (
          results.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.actor}</p>
            </li>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </ul>
    </div>
  );
};

export default Results;
