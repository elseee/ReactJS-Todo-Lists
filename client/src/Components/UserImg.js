import React, { Component } from 'react';

const divStyle = {
	backgroundImage: "url('./images/user.jpg')",
	width: 20,
    height: 20,
    position: 'absolute',
    bottom: 15
}

const inListStyle = {
	backgroundImage: "url('./images/user.jpg')",
	width: 30,
    height: 30,
    position: 'relative',
    display: 'inline-block',
    margin: 9
}

export default class UserImg extends Component {
  render() {
  	let style;

  	if (this.props.styling === 'list') {
  		style = inListStyle;
  	}
  	else {
  		style = divStyle;
  	}

    return (
      <div className="user" style={style}></div>
    )
  }
}

// ReactDOM.render(<UserImg/>, document.getElementById('app'));
