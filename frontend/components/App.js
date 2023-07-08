import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoInput: '',
  };

  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoInput })
    .then(res => {
      this.fetchAllTodos()
      this.setState({...this.state, todoInput:''})
    })
    .catch(err => {
      this.setState({...this.state, error: err.response.data.message })
    })
  }

  onTodoFormSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()

  }

  onTodoInputChange = evt => {
    const { value } = evt.target
    this.setState({...this.state, todoInput: value})
  }

  fetchAllTodos = () => {
    axios
      .get(URL)
      .then(res => {
        this.setState({...this.state, todos: res.data.data });
      })
      .catch(err => {
        this.setState({...this.state, error: err.response.data.message })
      });
  };

  componentDidMount() {
    this.fetchAllTodos();
  }

  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>
        <div id='todos'>
          <h2>Todos:</h2>
        {
          this.state.todos.map(td => {
            return <div key={td.id}>{td.name}</div>
          })
        }
        </div>
        <form id='todoForm' onSubmit={this.onTodoFormSubmit}>
          <input value={this.state.todoInput} onChange={this.onTodoInputChange}type='text' placeholder='type todo'></input>
          <input type='submit'></input>
          <button>Clear Completed</button>
        </form>
      </div>
    );
  }
}
