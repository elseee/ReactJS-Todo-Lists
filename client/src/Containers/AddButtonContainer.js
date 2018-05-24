import React, { Component } from 'react';
import AddButton from '../Components/AddButton';

export default class AddButtonContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {edit: false};
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDeleteAll = this.handleDeleteAll.bind(this);
  }

  handleEdit() {
  	const newState = this.state.edit === false ? true : false;
    this.setState({edit: newState});
    this.props.onClickEdit();
  }

  handleDeleteAll() {
    this.setState({edit: false});
    this.props.onClickDeleteAll();
  }

  render() {
    return (
      <AddButton listItems={!!this.props.listItems.length}
                 onClickAdd={this.props.onClickAdd} 
                 edit={this.state.edit}
                 enterEditState={this.handleEdit}
                 onDeleteAll={this.handleDeleteAll} />
    )
  }
}