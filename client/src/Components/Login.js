import React, { Component } from 'react';
import { Link } from 'react-router-dom'


export default class Login extends Component {
  render() {
    const invalidUsername= this.props.invalidUsername;
    const invalidPassword= this.props.invalidPassword;
    return (
    	<div className="container login">
    	<div className="row">
    	<div className="col-md-4 offset-md-4">
	    	<form>
				<h1>Log in</h1>
				<div className="form-group">
					<label htmlFor="user">Gebruikersnaam</label>
					<input onChange={this.props.onChangeUser} type="text" name="user" placeholder="Voer uw gebruikersnaam in..." required autoFocus />
				</div>
				<div className="form-group">
					<label htmlFor="password">Wachtwoord</label>
					<input onChange={this.props.onChangePassword} type="password" name="password" placeholder="Voer uw wachtwoord in..." required />
				</div>
				{invalidUsername && <p className="error">Deze gebruikersnaam is niet bekend in ons systeem.</p>}
				{invalidPassword && <p className="error">Uw wachtwoord klopt niet in combinatie met deze gebruikersnaam.</p>}

				{!this.props.register && <Link to='/register' className="link">Of maak hier een account aan</Link>}
				<button onClick={this.props.onLogin}>Log in</button>
			</form>
    	</div>
		</div>
		</div>
    )
  }
}
