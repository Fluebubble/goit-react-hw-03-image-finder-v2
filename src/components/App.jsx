import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import getImages from 'api/api';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';
import Button from './Button/Button';
import Modal from './Modal/Modal';
// import { ToastContainer, toast } from 'react-toastify';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    currentResponseLength: null,
    currentStatus: 'idle',
    statuses: {
      idle: 'idle',
      submitting: 'submitting',
      submitted: 'submitted',
      loading: 'loading',
    },
    openedImage: {},
    isModalOpen: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      return;
    }
    this.setState({
      images: [],
      page: 1,
      currentStatus: this.state.statuses.submitting,
    });
    e.target.reset();
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({
      openedImage: {
        link: this.state.images[e.currentTarget.id].largeImageURL,
        alt: this.state.images[e.currentTarget.id].tags,
      },
      isModalOpen: true,
    });
  };

  componentDidUpdate(_, prevState) {
    if (this.state.currentStatus === this.state.statuses.submitting) {
      getImages(this.state.query, this.state.page)
        .then(images => {
          this.setState(state => {
            return {
              images,
              currentResponseLength: images.length,
              page: state.page + 1,
            };
          });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.setState({
            currentStatus: this.state.statuses.idle,
          });
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
    this.setState({
      currentStatus: this.state.statuses.loading,
    });
    getImages(this.state.query, this.state.page)
      .then(result => {
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...result],
            currentResponseLength: result.length,
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
            currentStatus: this.state.statuses.idle,
          };
        });
      });
  };

  closeModalByMouse = e => {
    if (e.target.className === 'Overlay') {
      this.setState({
        isModalOpen: false,
      });
    }
  };

  closeModalByEsc = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.isModalOpen && (
          <Modal
            image={this.state.openedImage}
            onMouseClose={this.closeModalByMouse}
            onEscClose={this.closeModalByEsc}
          />
        )}
        <Searchbar onSubmit={this.handleSubmit} onChange={this.handleChange} />
        {/* <Loader /> */}
        <ImageGallery>
          <ImageGalleryItem
            images={this.state.images}
            onClick={this.handleClick}
          />
        </ImageGallery>
        {this.state.currentStatus ===
          (this.state.statuses.submitting || this.state.statuses.loading) && (
          <Loader />
        )}
        {this.state.currentResponseLength === 15 && (
          <Button onClick={this.loadMore} />
        )}
      </div>
    );
  }
}

export { App };
