import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';


class Todos extends React.Component{

  render() {
    //   console.log(this.props.todos)
    return (
      <div>
        {this.props.todos.filter(todo => {
          return todo.completed === false;
        }).map((todo)=>(
          <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} delTodo={this.props.delTodo}/>
        ))}
        <div style={completedStyle}>
          <p>Completed Todos</p>
          {this.props.todos.filter(todo => {
          return todo.completed === true;
        }).map((todo)=>(
          <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} delTodo={this.props.delTodo}/>
        ))}
        </div>
      </div>

    );
  }
}

const completedStyle = {
  padding: '10px',
  margin: '10px',
  background: '#d9d9d9'  

}


  //PropTypes (Good Practice)
Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired

}

export default Todos;
