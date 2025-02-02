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
    // Инициализация состояния inputValue из props
    this.state = {
      inputValue: props.searchTerm,
      isError: false,
    };
  }

  // Обновляем состояние inputValue при каждом изменении searchTerm в props
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
      throw new Error('123');
    }
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
        <button
          onClick={() => {
            this.setState({ isError: true });
          }}
        >
          throw error
        </button>
      </div>
    );
  }
}

export default Search;
