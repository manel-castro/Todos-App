import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Header from './components/layout/Header'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import About from './components/pages/About'
// import uuid from 'uuid';
import './App.css';


const firebase = require('firebase');


class App extends React.Component{
  state = {
    todos: []
  }

  //Requesting data from an Firebase once page is rendered
  componentDidMount = () => {
    firebase
    .firestore()
    .collection('todos')
    .orderBy('timestamp', 'desc')
    .onSnapshot(serverUpdate => {
        const todos = serverUpdate.docs.map(todo => {
          const data = todo.data();
          data['id'] = todo.id;
          return data;
        })
        
        // todos.sort((x, y) => {
        //   return x.timestamp - y.timestamp;
        // })
        this.setState({ todos: todos })
        console.log(this.state.todos)
        
      })
  }

  // Toggle completee
  markComplete = (id) => {
    let state
    this.state.todos.map(todo => {
      if(todo.id === id){
      state = !todo.completed
      }
      return state
    })

    firebase
    .firestore()
    .collection('todos')
    .doc(id)
    .update({
      completed: state
    })


    
  }

  // Delete Todo
  delTodo = (id) => {
    if(window.confirm('Are you sure to delete this note')){
      firebase
      .firestore()
      .collection('todos')
      .doc(id)
      .delete()
      
    }
  }

  // Add Todo
  AddTodo = (title) => {
    const note = {
      title: title,
      completed: false
    }
    firebase
      .firestore()
      .collection('todos')
      .add({
        title: note.title,
        completed: note.completed,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <div className='container'>
            <Header />
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddTodo AddTodo={this.AddTodo} />
                <div style={{ overflowY: 'scroll', height: '84vh' }}>
                  <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
                </div>
              </React.Fragment>
            )} />
            <Route path='/about' render={About} />
          </div>
        </div>
      </Router>
    );
    }
  }

export default App;
