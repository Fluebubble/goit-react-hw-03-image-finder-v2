import React, { Component } from 'react';
import ggwp from 'api/api';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    console.log('kekw');
    this.setState({
      query: e.currentTarget.value,
    });
  };

  render() {
    // ggwp('bucket', 1).then(result => {
    //   console.log(result);
    // });

    return (
      <header className="Searchbar">
        <form
          className="SearchForm"
          onSubmit={e => {
            this.props.onSubmit(e);
          }}
        >
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchFormInput"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={e => {
              this.props.onChange(e);
            }}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
