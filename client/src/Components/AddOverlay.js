import React, { Component } from 'react';

export default class AddOverlay extends Component {
  render() {
    return (
      <div className="overlay">
      	<div className="content">
      		<form>
      			<h2>Voeg een taak toe</h2>
        		<div className="form-group">
  				    <label htmlFor="taak">Taak</label>
  				    <input type="text" name="taak" onChange={this.props.onChangeTaak} placeholder="Voer een taak in..." required autoFocus />
  				  </div>
  				  <button onClick={this.props.onAdd}>Taak toevoegen</button>
      		</form>
      	</div>
      </div>
    )
  }
}