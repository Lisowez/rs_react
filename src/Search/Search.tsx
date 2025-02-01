import React, { Component } from 'react';

interface SearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  loading: boolean;
}

interface SearchState {
  inputValue: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      inputValue: this.props.searchTerm,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSearch = () => {
    const { inputValue } = this.state;
    this.props.onSearch(inputValue);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="Enter search term"
        />
        <button onClick={this.handleSearch} disabled={this.props.loading}>
          {this.props.loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    );
  }
}

export default Search;
