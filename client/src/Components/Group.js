import React, { Component } from 'react';
import { Link } from 'react-router-dom'


const style = {
  backgroundImage: "url('./images/roommates.jpg')"
}


export default class Group extends Component {
  render() {
    return (
      <Link to='/mylist' className="col-6">
        <button style={style} className="groupButton">
          <div className="content">
            <h3>Huisgenoten</h3>
          </div> 
        </button> 
      </Link>

    )
  }
}

// ReactDOM.render(<UserImg/>, document.getElementById('app'));
