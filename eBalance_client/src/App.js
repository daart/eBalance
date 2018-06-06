import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { Container, Grid, Responsive, Segment } from "semantic-ui-react";

import { login, logout } from "./actions/auth";
import { getAll } from './actions/accounts';

import './App.css';

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/Dashboard";
import Accounts from "./screens/Accounts";
import Account from "./screens/Account";

import Header from "./components/Header";
import SideBar from './components/SideBar';

import PrivateRoute from "./common/PrivateRoute";
import Spinner from './common/Spinner';

class App extends Component {
  state = {
    isLoading: true,
    isAppReady: false,
  };

  responceInterCeptor = axios.interceptors.response.use(
    res => {
      return res;
    },
    err => {
      if (err.response.status === 401) {
        console.log("ctx --> ", this);
        this.handle401();
      }
      return Promise.reject(err);
    }
  );

  handle401() {
    const { logout } = this.props;

    logout();
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    const { logout, getAll } = this.props;
    
    if (!token) {
      logout();
      this.setState({
        isLoading: false
      });

      return;
    }

    await this.validateToken(token);

    
    console.log('is App Ready ? ' , this.state.isAppReady);
    
    if (this.state.isAppReady) {
      console.log('are we at least getting here ? ');

      await getAll();
    }
  }

  async validateToken(token) {
    const { login, logout } = this.props;
    const res = await axios.post("http://localhost:2345/api/auth/validateToken", {
      token
    });

    const { valid } = res.data;

    if (!valid) {
      logout();
      this.setState({
        isLoading: false,
        isAppReady: false,
      });
    } else {
      login(token);
      this.setState({
        isLoading: false,
        isAppReady: true,
      });
    }
  }

  render() {
    const { isLoading } = this.state;
    const { isAuthenticated } = this.props;

    return (
      <div className="l_layout">
          {
            !isLoading ? (
              <Grid 
                container 
              >
                <Grid.Row>
                  <Grid.Column>
                    <Header />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns="equal">
                  
                  {
                    
                    isAuthenticated && <Grid.Column width="3"><SideBar /></Grid.Column>
                  }

                  <Grid.Column stretched>
                    <Switch>
                      <Route exact path="/" component={ Home } exact />
                      <Route path="/register" component={ Register } />
                      <Route path="/login" component={ Login } />
                      <Route path="/about" component={() => <div>about</div>} />
                      <PrivateRoute path="/dashboard" component={ Dashboard } />
                      <PrivateRoute path="/categories" component={ () => <div>@Categories</div> } />
                      <PrivateRoute path="/accounts/:id" component={ Account } />
                      <PrivateRoute path="/accounts" component={ Accounts } />
                      <PrivateRoute path="/income" component={ () => <div>@income</div> } />
                      <PrivateRoute path="/transfer" component={ () => <div>@transfer!</div> } />
                      <PrivateRoute path="/expense" component={ () => <div>@expense</div> } />
                    </Switch>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : (
              <Grid 
                  style={{ height: '100%' }}
                >
                <Grid.Row>
                  <Grid.Column stretched>
                    <Spinner />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            )
          }
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  user: auth.user
});

export default withRouter(connect(mapStateToProps, { login, logout, getAll })(App));
