import React from 'react';
import './App.css';

import Logo from "./components/Logo/Logo"
import ToDoList from "./components/ToDoList/ToDoList"


//App.js is just a container for a Logo and ToDoList components
//ToDoList is the main component of the app containing state with totos
const App = () => (
  <React.Fragment>
    <Logo />
    <ToDoList/>
  </React.Fragment>
)

export default App;
