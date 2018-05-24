import React, { Component } from 'react';
import Register from '../Components/Register.js'

export default class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {user : '', password: '', invalidUsername: false, invalid: false};
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  checkUserExists = async(user) => {
    let data = {user: user};
    await fetch('/api/checkUserExists', 
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
        this.setState({invalidUsername: false});
      }
      else {
        this.setState({invalidUsername: true});
      }
    });  
  }

  callApiPost = async (registerDetails) => {
    let data = registerDetails;
    await fetch('/api/register', 
      {method: "POST", 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data) 
    })
      .then(
         this.props.history.push('/registerSucces')
      );
  };


  handleChangeUser(e) {
    this.setState({user: e.target.value});
    this.checkUserExists(e.target.value);
  }

  handleChangePassword(e) {
    this.setState({password: e.target.value});
  }

  handleRegister(e) {
    e.preventDefault();
    let registerDetails = {user: this.state.user, password: this.state.password};
    if(this.state.user.length && this.state.password.length && !this.state.invalidUsername) {
      this.setState({invalid: false})
      this.callApiPost(registerDetails);
    }
    else {
      this.setState({invalid: true})
    }

  }

  render() {
    return (
    	<Register invalidUsername={this.state.invalidUsername} 
                invalid={this.state.invalid} 
                onChangeUser={this.handleChangeUser} 
                onChangePassword={this.handleChangePassword} 
                onRegister={this.handleRegister} />
    )
  }
}

// ReactDOM.render(<UserImg/>, document.getElementById('app'));
