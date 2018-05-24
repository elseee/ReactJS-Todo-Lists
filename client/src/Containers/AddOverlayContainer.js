import React, { Component } from 'react';
import AddOverlay from '../Components/AddOverlay'

export default class AddOverlayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {taak : ''}
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
  	this.setState({taak: e.target.value});
  }

  handleClick() {
    const name = this.state.taak;
    if (name.length) {
      this.props.onClick(name);
    }
  }

  render() {
    return (
      <AddOverlay onChangeTaak={this.handleChange}
                  onAdd={this.handleClick} />
    )
  }
}