import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import Login from '../Components/Login'


export default class LoginContainer extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
    this.state = {user : '', password: '', invalidPassword: false, invalidUsername: false}
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.callApiPost = this.callApiPost.bind(this);

  }

  handleLogin(e) {
  	e.preventDefault();
  	this.setState({invalidPassword: false, invalidUsername: false});
  	if(this.state.user.length && this.state.password.length) {
  		this.callApiPost(this.state);
  	}
  }

  callApiPost = async (loginDetails) => {
    let data = loginDetails;
    await fetch('/api/login', 
      {method: "POST", 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data) 
    })
    .then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response => {
			if (response.result === "valid") {
				sessionStorage.setItem('user', response.user);
				this.context.router.history.push('/mygroups')
			}
			else if (response.result === "invalid username") {
				this.setState({invalidUsername: true});
			}
			else {
				this.setState({invalidPassword: true});
			}
		});  
  };

  handleChangeUser(e) {
  	this.setState({user: e.target.value});
  }

  handleChangePassword(e) {
  	this.setState({password: e.target.value});
  }

  render() {
    return (
      <Login invalidUsername={this.state.invalidUsername}
             invalidPassword={this.state.invalidPassword}
             register={this.props.register}
             onChangeUser={this.handleChangeUser}
             onChangePassword={this.handleChangePassword}
             onLogin={this.handleLogin} />
    )
  }
}
