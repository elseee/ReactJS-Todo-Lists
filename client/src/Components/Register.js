import React, { Component } from 'react';

export default class Register extends Component {

  render() {
    const invalidUsername = this.props.invalidUsername;
    const invalid = this.props.invalid; 

    return (
    	<div className="container login">
    	<div className="row">
    	<div className="col-md-4 offset-md-4">
	    	<form>
				<h1>Registreer hier</h1>
				<div className="form-group">
					<label htmlFor="user">Gebruikersnaam</label>
					<input onChange={this.props.onChangeUser} type="text" name="user" placeholder="Kies een gebruikersnaam..." required autoFocus />
          {invalidUsername && <p className="error">Deze gebruikersnaam bestaat al.</p>}
				</div>
				<div className="form-group">
					<label htmlFor="password">Wachtwoord</label>
					<input onChange={this.props.onChangePassword} type="password" name="password" placeholder="Kies een wachtwoord..." required />
				</div>
        {invalid && <p className="error">Voer alstublieft alle velden correct in.</p>}
			
				<button onClick={this.props.onRegister}>Registreer</button>
			</form>
    	</div>
		</div>
		</div>
    )
  }
}