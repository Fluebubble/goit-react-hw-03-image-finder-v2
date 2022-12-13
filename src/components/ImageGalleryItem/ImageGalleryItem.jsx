import React, { Component } from 'react';

class ImageGalleryItem extends Component {
  render() {
    return this.props.images.map(image => (
      <li className="ImageGalleryItem" key={image.id}>
        <img
          className="ImageGalleryItem-image"
          src={image.webformatURL}
          alt={image.tags}
        />
      </li>
    ));
  }
}

export default ImageGalleryItem;
