import React, { Component } from 'react';
import Axios from 'axios';

class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
  };
}

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }


  onSubmit(e){
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }

    Axios.post('/api/users', newUser).then(res => {
      console.log("CREATED USER")
      console.log(res)
      localStorage.setItem('token', res.data.token)  
      window.location.reload()
    })
    .catch(function(err){
      console.log(err)
    })

  }


  render() {
    return (
      <div>
        <h3>Register as first time user</h3>
        <form onSubmit={ (e) => this.onSubmit(e) } >
          <input type="text"  name="username" value={ this.state.username } placeholder={"Enter New Username"} onChange={ (e) => this.handleChange(e) } />
          <input type="email" name="email"  value={ this.state.email } placeholder={"Enter New Email"} onChange={ (e) => this.handleChange(e) } />
          <input type="password" name="password"  value={ this.state.password } placeholder={"Enter New Password"} onChange={ (e) => this.handleChange(e) } />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Register;
