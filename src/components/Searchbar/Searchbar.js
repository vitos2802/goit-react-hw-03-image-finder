import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    value: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleValueChange = e => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { value } = this.state;

    if (value.trim() === '') {
      toast.error('Wow so easy !');
      return;
    }

    this.props.onSubmit(value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleFormSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={this.handleValueChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
