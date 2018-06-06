import React, { Component } from 'react';
import axios from 'axios';

import UserItem from './UserItem';

class UserList extends Component {
  state = {
    users: []
  }

  removeItem = async id => {
    const deletedUser = await axios.delete('http://localhost:2345/api/users/' + id);
    let filteredUsers = this.state.users.filter(user => user.id !== id);
    
    this.setState({
      users: filteredUsers
    });
  } 

  async componentDidMount() {
    const apiResponse = await axios.get('http://localhost:2345/api/users/all');
    const { users } = apiResponse.data;
    
    if (users) {
      this.setState({
        users
      })
    }
  }

  render() {
    let { users } = this.state;
    
    return (
      <div className="l_dashboard_users">
        <h3>UserList@</h3>
        <ul>
          {
            users.map(user => (
              <UserItem user={user} key={user.id} removeItem={this.removeItem}/>
            ))
          }
        </ul>
      </div>
    );
  };

};

export default UserList;
