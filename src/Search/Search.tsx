import React, { Component } from 'react';

interface SearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  loading: boolean;
}

interface SearchState {
  inputValue: string;
  isError: boolean;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      inputValue: props.searchTerm,
      isError: false,
    };
  }

  componentDidUpdate(prevProps: SearchProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.setState({ inputValue: this.props.searchTerm });
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSearch = () => {
    const { inputValue } = this.state;
    this.props.onSearch(inputValue);
  };

  render() {
    if (this.state.isError) {
      throw new Error('Test error');
    }
    return (
      <header
        style={{
          display: 'flex',
          width: '100%',
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
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="Enter search term"
        />
        <button onClick={this.handleSearch} disabled={this.props.loading}>
          {this.props.loading ? 'Searching...' : 'Search'}
        </button>
        <button
          onClick={() => {
            this.setState({ isError: true });
          }}
        >
          Throw error
        </button>
      </header>
    );
  }
}

export default Search;
