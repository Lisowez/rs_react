import React, { Component } from 'react';
import Search from './Search/Search';
import Results from './Results/Results';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

interface Item {
  id: number;
  name: string;
  description: string;
}

interface AppState {
  searchTerm: string;
  results: Item[];
  loading: boolean;
  error: string | null;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);

    this.state = {
      searchTerm: '',
      results: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ searchTerm: savedSearchTerm }, this.fetchData);
  }

  fetchData = () => {
    const { searchTerm } = this.state;
    const trimmedSearchTerm = searchTerm.trim();
    const apiUrl = `https://api.example.com/search?q=${trimmedSearchTerm || ''}`;

    this.setState({ loading: true });

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: { items: Item[] }) =>
        this.setState({ results: data.items, loading: false })
      )
      .catch((error) =>
        this.setState({ error: error.message, loading: false })
      );
  };

  handleSearch = (term: string) => {
    this.setState({ searchTerm: term }, () => {
      localStorage.setItem('searchTerm', term);
      this.fetchData();
    });
  };

  render() {
    const { searchTerm, results, loading, error } = this.state;

    return (
      <ErrorBoundary>
        <>
          <header>
            <h1>Search Application</h1>
            <Search
              searchTerm={searchTerm}
              onSearch={this.handleSearch}
              loading={loading}
            />
          </header>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}

          <Results results={results} />
        </>
      </ErrorBoundary>
    );
  }
}

export default App;
