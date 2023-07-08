import React from 'react';
import axios from 'axios';

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
        <div id='todos'>
          <h2>Todos:</h2>
        {
          this.state.todos.reduce((acc, td) => {
            if (this.state.displayCompleteds || !td.completed) return acc.concat(
              <div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name}{td.completed ? '🗸' : '' }</div>
            )
            return acc

            //return <div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name}{td.completed ? '🗸' : '' }</div>
          }, [])
        }
        </div>
        <form id='todoForm' onSubmit={this.onTodoFormSubmit}>
          <input value={this.state.todoInput} onChange={this.onTodoInputChange}type='text' placeholder='type todo'></input>
          <input type='submit'></input>
        </form>
        <button onClick={this.toggleDisplayCompleteds}>{this.state.displayCompleteds ? 'hide' : 'show'} Completed</button>
      </div>
    );
  }
}
