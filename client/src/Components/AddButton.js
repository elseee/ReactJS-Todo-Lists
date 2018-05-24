import React, { Component } from 'react';

export default class AddButton extends Component {
  render() {
    return (
      <div>
        <button className="add"><i className="fas fa-plus" onClick={this.props.onClickAdd}></i></button>
        {
        	this.props.listItems && 
        		(
			        <button className={"edit add " + (this.props.edit && " editTrue") } onClick={this.props.enterEditState}>
			        	{
			        		this.props.edit ? 
			        		(<span>save changes</span>)
			        		:
			        		(<i className="far fa-edit"></i>)
			        	}
			        </button>
			    )
		    }
        {
          this.props.edit && <a className="deleteAll" onClick={this.props.onDeleteAll}><i className="far fa-trash-alt"></i>Verwijder alle voltooide taken </a>
        }
      </div>
    )
  }
}