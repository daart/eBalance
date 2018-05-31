import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { logout } from './../../actions/auth';

const Header = ({ isAuthenticated, user, logout, history }) => {
  return (
    <div className="l_header">
      <header className="ui olive inverted segment">
        <div className="ui olive inverted borderless menu">
          <div className="left menu">
              <h2 className="ui header">
                <Link to="/"><i aria-hidden="true" className="money bill alternate outline icon"></i></Link>
                <div className="content">Kuzman.io
                  <div className="sub header">Manage your finances wisely</div>
                </div>
              </h2>
              {isAuthenticated ? (<NavLink activeClassName="yellow" className="item" to="/login" onClick={() => {
                logout();
                history.push('/');

              }}>Logout</NavLink>) : ''}
          </div>
          {
            isAuthenticated ? (
              <div className="right menu">
                <NavLink activeClassName="yellow active" className="item" to="/income" exact>Income</NavLink>
                <NavLink activeClassName="yellow active" className="item" to="/transfer">Transfer</NavLink>
                <NavLink activeClassName="yellow active" className="item" to="/expense">Expense</NavLink>
              </div>

            ) : (
              <div className="right menu">
                <NavLink activeClassName="yellow active" className="item" to="/login">Login</NavLink>
                <NavLink activeClassName="yellow active" className="item" to="/register">Register</NavLink>
              </div>
            )
          }
        </div>
      </header>
    </div>
  );
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  user: auth.user,
});

export default withRouter(connect(mapStateToProps, { logout })(Header));

// (<NavLink activeClassName="yellow active" className="item" to="/login" >Login</NavLink>)
