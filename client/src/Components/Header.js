import React, { Component } from 'react';
import UserImg from './UserImg'
import PropTypes from "prop-types";
import '../App.css';

const divStyle = {
  backgroundImage: "url('./images/roommates.jpg')"
}

export default class Header extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    return (
      <div className="header-group" style={divStyle}>
        <a className="back" onClick={this.context.router.history.goBack}><i className="fas fa-arrow-left"></i> </a>
        <div className="content">
          <h1>Huisgenoten</h1>
          <UserImg styling="header" />
        </div>
      </div>
      );
  }
}

// export default App;
