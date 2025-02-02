import React, { Component } from 'react';
import Search from './Search/Search';
import Results from './Results/Results';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

interface Item {
  id: number;
  name: string;
  actor: string;
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
    const apiUrl = `https://hp-api.onrender.com/api/characters`;
    this.setState({ loading: true });

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Item[]) => {
        const filteredResults = data.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTimeout(() => {
          this.setState({ results: filteredResults, loading: false });
        }, 1000);
      })
      .catch((error) =>
        this.setState({ error: error.message, loading: false })
      );
  };

  handleSearch = (term: string) => {
    const trimmedSearchTerm = term.trim();
    this.setState({ searchTerm: trimmedSearchTerm }, () => {
      localStorage.setItem('searchTerm', trimmedSearchTerm);
      this.fetchData();
    });
  };

  render() {
    const { searchTerm, results, loading, error } = this.state;

    return (
      <ErrorBoundary>
        <>
          <Search
            searchTerm={searchTerm}
            onSearch={this.handleSearch}
            loading={loading}
          />
          <Results results={results} error={error} loading={loading} />
        </>
      </ErrorBoundary>
    );
  }
}

export default App;
