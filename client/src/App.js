import React, { Component } from 'react';
import './App.css';
import AppNavbar from './components/AppNavBar';
import 'bootstrap/dist/css/bootstrap.min.css'
import ShoppingList from './components/ShoppingList';


class App extends Component {


  render() {
    return (
      <div className="App">
        <AppNavbar />
        <ShoppingList />
      </div>
    );
  }
}

export default App;