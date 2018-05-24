import React, {Component} from 'react';
import LoginContainer from '../Containers/LoginContainer';

export default class RegisterSucces extends Component {


  render() {
    return (
    	<div>
        <p className="succes">Het registreren is gelukt, u kunt hieronder inloggen</p>
        <LoginContainer register />
      </div>
    )
  }
}

// ReactDOM.render(<UserImg/>, document.getElementById('app'));
