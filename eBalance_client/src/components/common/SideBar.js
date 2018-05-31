import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const SideBar = () => {
  return (
    <Menu pointing secondary vertical compact>
      
      <Menu.Item>
        <NavLink activeClassName="yellow active" className="item" to="/dashboard">Dashboard</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink activeClassName="yellow active" className="item" to="/categories">Categories</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink activeClassName="yellow active" className="item" to="/private">Private</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(SideBar);
