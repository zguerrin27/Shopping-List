import React, { Component } from 'react';
import './App.css';
import AppNavbar from './components/AppNavBar';
import 'bootstrap/dist/css/bootstrap.min.css'
import ShoppingList from './components/ShoppingList';
import Register from './components/Register';



class App extends Component {


  render() {
    return (
      <div className="App" style={{textAlign: "center"}} >
        <AppNavbar />
        <ShoppingList />
        <Register />
      </div>
    );
  }
}

export default App;