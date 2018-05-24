import React, { Component } from 'react';
import ListItem from '../Components/ListItem';

export default class ListItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {done: this.props.done, delete: false};
    this.changeState = this.changeState.bind(this);
    this.callApi = this.callApi.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //SET TASK TO DONE
  changeState() {
  	const newState = !!this.state.done === false ? true : false;
    this.setState({done: newState});

    this.callApi(newState);
  }
  
  callApi = async (newState) => {
    let data = {done: newState, id: this.props.id}

    await fetch('/api/savedone', 
      {method: "POST", 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data) 
    });
  };

  //DELETE TASK
  handleDelete() {
    this.setState({delete: true});
    const id = this.props.id;
    let self = this;
    setTimeout(function(){ self.props.onDelete(id); }, 500);
  }

  //EDIT TASK
  handleChange(e) {
    let value = e.target.value;
    const id = this.props.id;
    this.props.onChange(value, id);
  }

  render() {
    return (
      <ListItem done={this.state.done}
                delete={this.state.delete}
                edit={this.props.edit}
                taak={this.props.taak}
                onChangeTaak={this.handleChange}
                onChangeState={this.changeState}
                onDelete={this.handleDelete} />
    );
  }
}

