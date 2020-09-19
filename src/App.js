import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as todosActions from "./redux/actions/todosActions";
import * as userActions from "./redux/actions/userActions";
import PropTypes from "prop-types";

import Header from "./components/layout/Header";
import TodosLayout from "./components/todos-page/TodosLayout";
import LoginPage from "./components/login-page/LoginPage";
import About from "./components/about/About";
import PrivateRoute from "./components/common/PrivateRoute";
// import uuid from 'uuid';
import "./App.css";

/* 
++++++++++TODOS++++++++++++++
- User System (if you're logout it don't shows you the todo's page)
- Efficiency problem: change in single todo request to database all of them.
- Add 404 page
- Add username slugs (make public button?)
- About button to go to Todos page

Near todos.
- Connect to redux all todos
- Use private and public routes to manage redirects. 
- Solve the branch (we're in tmp now)
- Manage errors
- Apply bootstrap

*/

const firebase = require("firebase");

const App = (props) => {
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState({});
  const [loggedUser, setLoggedUser] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  /*
    USERS SYSTEM
  */
  const { getTodos, userLoginSuccess, userLogoutSuccess, loggedIn } = props;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //I keep action creators separated
        // for easy understanding in case to add new features.
        userLoginSuccess(user.uid);
        getTodos();
      } else {
        userLogoutSuccess();
      }
    });
  }, []);

  /*
    USER ACTIONS
  */
  const markComplete = (id) => {
    let isCompleted; //test with prevstate
    //Optimistic markComplete
    todos.map((todo) => {
      if (todo.id === id) {
        isCompleted = !todo.completed;
      }
      return isCompleted;
    });

    firebase
      .firestore()
      .collection("todos")
      .doc(id)
      .update({
        completed: isCompleted,
      })
      .catch((err) => {
        setErrors({
          userMarkCompleteError: err.message,
        });
        alert("This action haven't been done: " + err.message);
      });
  };

  const delTodo = (id) => {
    if (window.confirm("Are you sure to delete this note")) {
      firebase
        .firestore()
        .collection("todos")
        .doc(id)
        .delete()
        .catch((err) => {
          setErrors({
            userDelTodoError: err.message,
          });
          alert("Error when deleting: " + err.message);
        });
    }
  };

  // const addTodo = (title) => {
  //   const note = {
  //     title: title,
  //     completed: false,
  //   };
  //   firebase
  //     .firestore()
  //     .collection("todos")
  //     .add({
  //       title: note.title,
  //       completed: note.completed,
  //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //       userId: currentUser.uid,
  //     })
  //     .catch((err) => {
  //       setErrors({
  //         userMarkCompleteError: err.message,
  //       });
  //       alert("Error when adding: " + err.message);
  //     });
  // };

  return (
    <>
      <div className="App">
        <div className="container">
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <TodosLayout markComplete={markComplete} delTodo={delTodo} />
              )}
            />

            <PrivateRoute
              path="/about"
              component={About}
              authenticated={false}
            />
            <Route path="/login" render={() => <LoginPage />} />
          </Switch>
        </div>
      </div>
    </>
  );
};

App.propTypes = {
  getTodos: PropTypes.func.isRequired,
  userLoginSuccess: PropTypes.func.isRequired,
  userLogoutSuccess: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    loggedIn: state.loggedIn,
  };
}

const mapDispatchToProps = {
  getTodos: todosActions.getTodos,
  userLoginSuccess: userActions.userLoginSuccess,
  userLogoutSuccess: userActions.userLogoutSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
