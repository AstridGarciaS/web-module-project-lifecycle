import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id='todoForm' onSubmit={this.props.onTodoFormSubmit}>
          <input 
          value={this.props.todoInput} 
          onChange={this.props.onTodoInputChange} 
          type='text' 
          placeholder='type todo'>
          </input>
          <input type='submit'></input>
        </form>
        <button onClick={this.props.toggleDisplayCompleteds}
        >
          {this.props.displayCompleteds ? 'hide' : 'show'} Completed
        </button>
      
      </>
    )
  }
}
