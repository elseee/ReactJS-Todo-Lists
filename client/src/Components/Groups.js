import React, { Component } from 'react';
import Group from './Group'

export default class Groups extends Component {
  render() {
    return (
    	<div className="container">
        <h1>Mijn groepen</h1>
        <div className="row">
          <Group />
        </div>
      </div>
    )
  }
}

// ReactDOM.render(<UserImg/>, document.getElementById('app'));
