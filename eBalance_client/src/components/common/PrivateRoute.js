import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  // console.log('props location >>> ', isAuthenticated, ' rest >> ', rest);

  return <Route 
    {...rest}
    render={props => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      ) 
    )}
  /> 
};

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
});

export default connect(mapStateToProps, null)(PrivateRoute);
