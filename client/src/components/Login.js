import React, { Component } from 'react';
import Axios from 'axios';
// import AppNavbar from './AppNavBar';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      user: undefined
  };

}

handleChange(e) {
  this.setState({ [e.target.name]: e.target.value })
}

onSubmit(e){
  e.preventDefault();
  const User = {
    email: this.state.email,
    password: this.state.password,
  }
  Axios.post('/api/users/auth', User).then(res => {
    console.log("USER SIGNED IN ")
    console.log(res)
    localStorage.setItem('token', res.data.token)   // save token to local storage for auth 
    window.location.reload()
  })
  .catch(function(err){
    console.log(err)
  })
}


  render() {
    return (
      <div>
        {/* <AppNavbar /> */}
        <h3>Login to use ShoppingList</h3> 
        <form onSubmit={ (e) => this.onSubmit(e) } >
          <input type="email"  name="email" value={ this.state.email } placeholder={"Enter User Email"} onChange={ (e) => this.handleChange(e) } />
          <input type="password" name="password"  value={ this.state.password } placeholder={"Enter User Password"} onChange={ (e) => this.handleChange(e) } />
          <input type="submit" />
        </form>
      </div>
    );
  }

}

export default Login;
