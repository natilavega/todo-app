import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class AddTodo extends Component {
  state = {
    content: '',
  };

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const content = this.state.content.trim();
    if (content) {
      this.props.addTodo(this.state);
    }
    this.setState({
      content: '',
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Nueva tarea:</label>
          <input
            type='text'
            onChange={this.handleChange}
            value={this.state.content}
          />
          <button type='submit'>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </form>
      </div>
    );
  }
}

export default AddTodo;
