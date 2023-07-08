import React from 'react';
import axios from 'axios';
import Form from './Form';
import TodoList from './TodoList';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoInput: '',
    displayCompleteds: true,
  };

  resetForm = () => this.setState({...this.state, todoInput:''})

  SetAxiosResponseError = err => this.setState({...this.state, error: err.response.data.message })


  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoInput })
    .then(res => {
      this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
      this.resetForm()

    })
    .catch(this.SetAxiosResponseError)
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
      .catch(this.SetAxiosResponseError)
  };

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
    .then(res => {
      this.setState({
        ...this.state, todos: this.state.todos.map(td => {
        if (td.id !== id) return td
        return res.data.data
      })
    })
    })
    .catch(this.SetAxiosResponseError)
  }
  toggleDisplayCompleteds = () => {
    this.setState({...this.state, displayCompleteds: !this.state.displayCompleteds })

  }

  componentDidMount() {
    this.fetchAllTodos();
  }

  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>
        <TodoList
        todos={this.state.todos}
        displayCompleteds={this.state.displayCompleteds}
        toggleCompleted={this.toggleCompleted}
        />

        <Form
          onTodoFormSubmit={this.onTodoFormSubmit}
          toggleDisplayCompleteds={this.toggleDisplayCompleteds}
          onTodoInputChange={this.onTodoInputChange} 
          todoInput={this.state.todoInput} 
          displayCompleteds={this.state.displayCompleteds}
        />

      </div>
    );
  }
}
