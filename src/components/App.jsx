// import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import getImages from 'api/api';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';
import Button from './Button/Button';
// import { ToastContainer, toast } from 'react-toastify';

class App extends Component {
  state = {
    query: '',
    isLoading: false,
    images: [],
    page: 1,
    currentResponseLength: null,
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      return;
    }
    this.setState({
      images: [],
      page: 1,
      isLoading: false,
    });
    console.log(e.target.elements[1].value);
    console.log(e);
    e.target.reset();
  };

  componentDidUpdate(_, prevState) {
    console.log('App componentDidUpdate');
    if (this.state.query === prevState.query && this.state.page === 1) {
      console.log('this.state === ', this.state);
      console.log('prevState === ', prevState);
      getImages(this.state.query, this.state.page)
        .then(images => {
          console.log(images.length);
          this.setState(state => {
            return {
              images,
              page: state.page + 1,
              isLoading: false,
              currentResponseLength: images.length,
            };
          });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          'Vse norm';
        });
    }
  }

  componentDidMount() {
    // console.log('App componentDidMount');
  }

  componentWillUnmount() {
    // console.log('App componentWillUnmount');
  }

  handleChange = e => {
    this.setState({
      query: e.currentTarget.value,
    });
  };

  loadMore = () => {
    getImages(this.state.query, this.state.page)
      .then(result => {
        console.log(result);
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...result],
          };
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState(prevState => {
          return {
            page: prevState.page + 1,
          };
        });
      });
  };

  render() {
    console.log('App render()');
    console.log(
      'this.state.currentResponseLength === ',
      this.state.currentResponseLength
    );
    console.log(this.state.currentResponseLength === 15)
    // console.log(this.state.currentResponseLength);
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} onChange={this.handleChange} />
        {/* <Loader /> */}
        <ImageGallery>
          <ImageGalleryItem images={this.state.images} />
        </ImageGallery>
        {this.state.currentResponseLength === 15 && <Button onClick={this.loadMore} />}
      </div>
    );
  }
}

export { App };
