import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import ListContainer from '../Containers/ListContainer'
import NotFound from './NotFound'
import RegisterSucces from './RegisterSucces'
import Groups from './Groups'
import RegisterContainer from '../Containers/RegisterContainer'
import LoginContainer from '../Containers/LoginContainer'

export default class Main extends Component {
  render() {
    let user = sessionStorage.getItem('user')

    return (
		    <div>
				{!user &&
					<Switch>
						<Route exact path='/register' component={RegisterContainer}/>
						<Route exact path='/registerSucces' component={RegisterSucces}/>
						<Route component={LoginContainer}/>
					</Switch>
				}
				{ user && 
					<Switch>
						<Route path='/mylist' component={ListContainer}/>
						<Route path='/mygroups' component={Groups}/>
						<Route component={NotFound} />
					</Switch>
		        }
				
		    </div>
    )
  }
}