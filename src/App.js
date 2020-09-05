import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import TodosLayout from "./components/TodosLayout";
import LoginPage from "./components/LoginPage";
import About from "./components/pages/About";
// import uuid from 'uuid';
import "./App.css";

/* 
++++++++++TODOS++++++++++++++
- User System (if you're logout it don't shows you the todo's page)
- Efficiency problem: change in single todo request to database all of them.
*/

const firebase = require("firebase");

class App extends React.Component {
  state = {
    todos: [],
    errors: [],
    loggedUser: false,
  };

  /*
  -----------TODO----------------
  */

  signup = (newUser) => {
    // firebase.auth().createUserWithEmailAndPassword()
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((cred) => {
        console.log(cred);
        window.location.href = "/";
      })
      .catch((error) => {
        // TODO: Send errors to show in login page
        this.setState({
          errors: [...this.state.errors, error],
        });
        console.log(this.state.errors);
      });
  };

  login = (userData) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((cred) => {
        console.log(cred);
        window.location.href = "/app";
      })
      .catch((err) => console.log(err));
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
        this.setState({
          loggedUser: false,
        });
        window.location.href = "/login";
      });
  };

  //Requesting data from an Firebase once page is rendered
  componentDidMount = async () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        await firebase
          .firestore()
          .collection("todos")
          .orderBy("timestamp", "desc")
          .onSnapshot((serverUpdate) => {
            const todos = serverUpdate.docs.map(
              (todo) => {
                const data = todo.data();
                data["id"] = todo.id;
                return data;
              },
              (err) => {
                console.log(err.message);
              }
            );

            // todos.sort((x, y) => {
            //   return x.timestamp - y.timestamp;
            // })
            this.setState({
              todos: todos,
              loggedUser: true,
            });
            console.log(this.state.todos);
          });
      } else {
        this.setState({
          todos: [],
        });
      }
    });
  };

  /*
  ------------------------------
  */

  // Toggle completee
  markComplete = (id) => {
    let state;
    this.state.todos.map((todo) => {
      if (todo.id === id) {
        state = !todo.completed;
      }
      return state;
    });

    firebase.firestore().collection("todos").doc(id).update({
      completed: state,
    });
  };

  // Delete Todo
  delTodo = (id) => {
    if (window.confirm("Are you sure to delete this note")) {
      firebase.firestore().collection("todos").doc(id).delete();
    }
  };

  // Add Todo
  AddTodo = (title) => {
    const note = {
      title: title,
      completed: false,
    };
    firebase.firestore().collection("todos").add({
      title: note.title,
      completed: note.completed,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header logout={this.logout} loggedUser={this.state.loggedUser} />
            <Route
              exact
              path="/"
              render={(props) => (
                <TodosLayout
                  AddTodo={this.AddTodo}
                  todos={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                />
              )}
            />
            <Route path="/about" render={About} />
            <div>
              <Route
                path="/login"
                render={(props) => (
                  <LoginPage login={this.login} signup={this.signup} />
                )}
              />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
