import React, { Component } from 'react';
import './App.css';
import AppNavbar from './components/AppNavBar';
import 'bootstrap/dist/css/bootstrap.min.css'
import ShoppingList from './components/ShoppingList';
import Register from './components/Register';
import Login from './components/Login';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      visable: true,
      token: localStorage.getItem('token')
    };
  }

  componentDidMount(){
    // console.log(this.state.token)
  }


  render() {
    return (
      // <BrowserRouter>
      //   <Switch>
      //     <Route path="/" component={ShoppingList} />
      //     <Route path="/Login" component={Login} />
      //     <Route path="/Register" component={Register} />
      //   </Switch>
      // </BrowserRouter>
      
      <div className="App" style={{textAlign: "center"}} >

        <AppNavbar />
        {this.state.token ? <ShoppingList /> : null}
        <br></br>
        {this.state.token ? null : <Login /> }
        <br></br>
        {this.state.token ? null : <Register /> }
        
      </div>
    );
  }
}

export default App;