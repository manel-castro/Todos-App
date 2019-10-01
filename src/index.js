import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase')
require('firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyDXflgFL_84HmpBInsFwxdq61oQXmbclks",
  authDomain: "react-crash-course-tm.firebaseapp.com",
  databaseURL: "https://react-crash-course-tm.firebaseio.com",
  projectId: "react-crash-course-tm",
  storageBucket: "",
  messagingSenderId: "315070944604",
  appId: "1:315070944604:web:6bf675eeaaa80006cf9d99",
  measurementId: "G-9CRLJPRFPM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
