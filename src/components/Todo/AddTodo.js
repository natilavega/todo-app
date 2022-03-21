import React, { Component } from 'react';
import './TodoApp.css';
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
        <form className='add-todo' onSubmit={this.handleSubmit}>
          <div className='input-group'>
            <label>Nueva tarea:</label>
            <div className='add-todo_row'>
              <input
                type='text'
                onChange={this.handleChange}
                value={this.state.content}
              />
              <button type='submit'>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddTodo;
