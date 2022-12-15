import React, { Component } from 'react';

class ImageGalleryItem extends Component {
  render() {
    return this.props.images.map((image, idx) => (
      <li className="ImageGalleryItem" key={image.id}>
        <img
          className="ImageGalleryItem-image"
          src={image.webformatURL}
          alt={image.tags}
          id={idx}
          onClick={e => {
            this.props.onClick(e);
          }}
        />
      </li>
    ));
  }
}

export default ImageGalleryItem;
