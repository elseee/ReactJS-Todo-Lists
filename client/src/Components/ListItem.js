import React, { Component } from 'react';
import UserImg from './UserImg';

export default class ListItem extends Component {
  render() {
    return (
      <button className={"list-item " + (this.props.done && 'done ') + (this.props.edit && ' edit ') + (this.props.delete && ' delete')}>
        <UserImg styling="list" />
        {
          this.props.edit ? (
            <input type="text" placeholder={this.props.taak} defaultValue={this.props.taak} onChange={this.props.onChangeTaak} />
          ) : (
            <span>{this.props.taak}</span>
          )
        }
        <i className="fas fa-check" onClick={this.props.onChangeState}></i>
        { this.props.edit &&  <div className="trash" onClick={this.props.onDelete} ><i className="far fa-trash-alt"></i> </div>}
      </button>
    );
  }
}