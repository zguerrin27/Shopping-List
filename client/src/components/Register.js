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

handleUsername(e) {
  this.setState({ username: e.target.value })
}
handleEmail(e) {
  this.setState({ email: e.target.value })
}
handlePassword(e) {
  this.setState({ password: e.target.value })
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
    })
    .catch(function(err){
      console.log(err)
    })

  }




  render() {
    return (
      <div>
        <form onSubmit={ (e) => this.onSubmit(e) } >
        <input type="text" value={ this.state.username } placeholder={"Enter New Username"} onChange={ (e) => this.handleUsername(e) } />
        <input type="email" value={ this.state.email } placeholder={"Enter New Email"} onChange={ (e) => this.handleEmail(e) } />
        <input type="password" value={ this.state.password } placeholder={"Enter New Password"} onChange={ (e) => this.handlePassword(e) } />
        <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Register;
