import React, { Component } from 'react';
import './App.css';

import Logo from "./components/Logo/Logo"
import ToDoList from "./components/ToDoList/ToDoList"

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Logo />
        <ToDoList />
      </React.Fragment>

    );
  }
}

export default App;
