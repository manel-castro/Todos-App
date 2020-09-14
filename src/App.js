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
    errors: {},
    loggedUser: false,
  };

  currentUser;

  /*
    USERS SYSTEM
  */

  userAccess = (userData) => {
    if (userData.action === "login") {
      firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then((cred) => {
          console.log(cred);
          window.location.href = "/";
          this.currentUser = cred;
        })
        .catch((err) => {
          this.setState({
            errors: { ...this.state.errors, userErrors: err.message },
          });
        });
    } else if (userData.action === "login") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userData.email, userData.password)
        .then((cred) => {
          console.log(cred);
          this.currentUser = cred;
          window.location.href = "/";
        })
        .catch((err) => {
          this.setState({
            errors: { ...this.state.errors, userErrors: err.message },
          });
          console.log(this.state.errors);
        });
    } else return;
  };

  userLogout = () => {
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

  componentDidMount = async () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.currentUser = user;
        console.log(user);
        console.log(user.getIdToken());
        await firebase
          .firestore()
          .collection("todos")
          .where("userId", "==", this.currentUser.uid)
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

            this.setState({
              todos: todos,
              loggedUser: true,
            });
            console.log(this.state.todos);
          });
      } else {
        this.setState({
          todos: [],
          loggedUser: false,
        });
      }
    });
  };

  /*
    USER ACTIONS
  */
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

  delTodo = (id) => {
    if (window.confirm("Are you sure to delete this note")) {
      firebase.firestore().collection("todos").doc(id).delete();
    }
  };

  AddTodo = (title) => {
    const note = {
      title: title,
      completed: false,
    };
    firebase.firestore().collection("todos").add({
      title: note.title,
      completed: note.completed,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userId: this.currentUser.uid,
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header
              userLogout={this.userLogout}
              loggedUser={this.state.loggedUser}
            />

            {this.state.loggedUser ? (
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
            ) : (
              <h2 style={{ textAlign: "center" }}>You need to login</h2>
            )}

            <Route path="/about" render={About} />
            <div>
              <Route
                path="/login"
                render={(props) => (
                  <LoginPage
                    userAccess={this.userAccess}
                    errors={this.state.errors}
                  />
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
