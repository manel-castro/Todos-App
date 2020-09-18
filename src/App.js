import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/layout/Header";
import TodosLayout from "./components/todos-page/TodosLayout";
import LoginPage from "./components/login-page/LoginPage";
import About from "./components/about/About";
// import uuid from 'uuid';
import "./App.css";

/* 
++++++++++TODOS++++++++++++++
- User System (if you're logout it don't shows you the todo's page)
- Efficiency problem: change in single todo request to database all of them.
- Add 404 page
- Add username slugs (make public button?)
- About button to go to Todos page
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

  const userLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
        setLoggedUser({
          loggedUser: false,
        });
        window.location.href = "/login";
      });
  };

  const firebaseState = async () =>
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        console.log(user);
        console.log(user.getIdToken());
        await firebase
          .firestore()
          .collection("todos")
          .where("userId", "==", user.uid)
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

            setTodos([...todos]);
            setLoggedUser(true);
            console.log(todos);
          });
      } else {
        setTodos([]);
        setLoggedUser(false);
      }
    });

  useEffect(() => {
    firebaseState();
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

  const addTodo = (title) => {
    const note = {
      title: title,
      completed: false,
    };
    firebase
      .firestore()
      .collection("todos")
      .add({
        title: note.title,
        completed: note.completed,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: currentUser.uid,
      })
      .catch((err) => {
        setErrors({
          userMarkCompleteError: err.message,
        });
        alert("Error when adding: " + err.message);
      });
  };

  return (
    <>
      <div className="App">
        <div className="container">
          {loggedUser ? <Redirect to="/" /> : <Redirect to="/login" />}

          <Header userLogout={userLogout} loggedUser={loggedUser} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <TodosLayout
                  addTodo={addTodo}
                  todos={todos}
                  markComplete={markComplete}
                  delTodo={delTodo}
                />
              )}
            />

            <Route path="/about" render={About} />
            <Route path="/login" render={() => <LoginPage />} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default App;
