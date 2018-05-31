import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { Container, Grid, Responsive, Segment } from "semantic-ui-react";

import { login, logout } from "./actions/auth";

import './App.css';
import Home from "./components/home/Home";
import Login from "./components/form/Login";
import Register from "./components/form/Register";
// import CreateAccount from './components/form/CreateAccount';
import Header from "./components/header/Header";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import SideBar from './components/common/SideBar';
import Categories from "./components/categories/Categories";
import Spinner from './components/spinner/Spinner';
import Classified from "./components/common/Classified";

class App extends Component {
  state = {
    isLoading: true
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
    this.props.history.push("/login");
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const { logout } = this.props;

    if (!token) {
      logout();
      this.setState({
        isLoading: false
      });

      return;
    }

    this.validateToken(token);
  }

  async validateToken(token) {
    const { login, logout } = this.props;
    const res = await axios.post("http://localhost:2345/api/auth/validateToken", {
      token
    });

    const { valid } = res.data;

    console.log("validation res from Back <<< ", res.data);

    if (!valid) {
      logout();
      this.setState({
        isLoading: false
      });
    } else {
      login(token);
      this.setState({
        isLoading: false
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
              <div>
                <Grid container stackable>
                  <Grid.Row>
                    <Grid.Column>
                      <Header />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row >
                    <Grid.Column width={ isAuthenticated ? 3 : 0 }>
                    {
                      isAuthenticated ? <SideBar /> : ''
                    } 
                    </Grid.Column>
                    <Grid.Column width={ isAuthenticated ? 13 : 16 }>
                      <Switch>
                        <Route path="/" component={ Home } exact />
                        <Route path="/register" component={ Register } />
                        <Route path="/login" component={ Login } />
                        <Route path="/about" component={() => <div>about</div>} />
                        <PrivateRoute path="/dashboard" component={ Dashboard } />
                        <PrivateRoute path="/categories" component={ Categories } />
                        <PrivateRoute path="/private" component={ Classified } />
                      </Switch>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            ) : (
              <Spinner />
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

export default withRouter(connect(mapStateToProps, { login, logout })(App));
