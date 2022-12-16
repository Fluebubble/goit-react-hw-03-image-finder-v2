import React, { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    console.log('Modal mounted');
    // window.addEventListener('keydown', () => {
    //   this.props.onEscClose();
    // });
  }

  componentWillUnmount() {
    console.log('Modal UNmounted');
    // window.removeEventListener('keydown', () => {
    //   this.props.onEscClose();
    // });
  }
  render() {
    const { link, alt } = this.props.image;
    return (
      <div
        className="Overlay"
        onClick={e => {
          this.props.onMouseClose(e);
        }}
      >
        <div className="Modal">
          <img src={link} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
