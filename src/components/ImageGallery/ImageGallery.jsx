import React, { Component } from 'react';

class ImageGallery extends Component {
  state = {};

  render() {
    return <ul className="ImageGallery">{this.props.children}</ul>;
  }
}

export default ImageGallery;




const TestComponent1 = () => {
  const [username, setUsername] = useState("");
  const [todos, setTodos] = useState([{ text: "Learn hooks" }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
};

class TestComponent2 extends Component {
  state= {
    username: '',
    todos: [{ text: "Learn hooks" }],
    isModalOpen: false,
  }

}
