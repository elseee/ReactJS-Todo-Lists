import React, { Component } from 'react';
import Header from '../Components/Header';
import ListItemContainer from './ListItemContainer';
import AddButtonContainer from './AddButtonContainer';
import AddOverlayContainer from './AddOverlayContainer'

export default class ListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: '',
      addClicked: false,
      edit: false
    };

    this.changeStateAdd = this.changeStateAdd.bind(this);
    this.changeStateEdit = this.changeStateEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDeleteAll = this.onDeleteAll.bind(this);
  }

  componentDidMount() {
    this.callApiGet()
      .then(res => {
        let items = [];
        let self = this;
        res.forEach(function(element) {
          const item = <ListItemContainer key={element.id} id={element.id} taak={element.taak} done={element.done.data[0]} edit={self.state.edit} onDelete={self.onDelete} onChange={self.onChange} />
          items.push(item);
        });
        this.setState({ response: items });
      })
      .catch(err => console.log('Error: '+ err));
  }
  
  //GET ALL LISTITEMS 
  callApiGet = async () => {
    const response = await fetch('/api/listitems');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  //ADD NEW LISTITEMS 
  callApiPost = async (newTask) => {
    let data = {taak: newTask, done: 0}

    await fetch('/api/addtask', 
      {method: "POST", 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data) 
    });  
  };
 
  //DELETE LISTITEM 
  callApiDelete = async (id) => {
    let idData = {id: id};

    await fetch('/api/deletelistitem', 
      {method: "DELETE", 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(idData) 
    });
  };

  //DELETE ALL 'DONE' LISTITEMS 
  callApiDeleteAll = async (id) => {
    await fetch('/api/deletealllistitem',
      {method: "DELETE", 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    });
  };

  //UPDATE ALL LISTITEMS AFTER EDIT STATE
  callApiUpdate = async (value, id) => {
    let changedData = {id: id, taak: value}
    await fetch('/api/updatelistitem', 
      {method: "POST", 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(changedData) 
    });

  }

  //DELETE LISTITEM
  onDelete(id) {
    this.callApiDelete(id).then(this.componentDidMount());
  }

  //DELTE ALL LISTITEM
  onDeleteAll() {
    this.callApiDeleteAll().then(this.componentDidMount());
    this.setState({edit: false});
  }

  //CHANGE TASK NAME
  onChange(value, id) {
    this.callApiUpdate(value, id);
  }

  //TOGGLE BETWEEN ADD OVERLAY STATE
  changeStateAdd(newTask) {
    if(this.state.addClicked)  {
      this.callApiPost(newTask).then(this.componentDidMount());
      this.setState({ addClicked: false });
    }
    else {
      this.setState({ addClicked: true });
    }
  }

  //TOGGLE EDIT STATE
  changeStateEdit() {
    const newState = this.state.edit === false ? true : false;
    this.setState({edit: newState});
    this.componentDidMount();
  }

  render() {
    const add = this.state.addClicked;
    return (
      <div> 
        <Header />
        <AddButtonContainer onClickAdd={this.changeStateAdd} onClickEdit={this.changeStateEdit} onClickDeleteAll={this.onDeleteAll} listItems={this.state.response} />
        {this.state.response}
        { add && <AddOverlayContainer onClick={this.changeStateAdd} /> }
      </div>
    );

  }
}