import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { Segment, Dimmer, Loader, Container } from "semantic-ui-react";

import { login, logout } from "./actions/auth";

import Home from "./components/home/Home";
import Login from "./components/form/Login";
import Register from "./components/form/Register";
import Header from "./components/header/Header";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import Categories from "./components/categories/Categories";
// import Classified from "./components/common/Classified";

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
    // const { isAuthenticated, user } = this.props;

    return !isLoading ? (
      <Container>
        <Header />

        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/register" component={ Register } />
          <Route path="/login" component={ Login } />
          <Route path="/about" component={() => <div>about</div>} />
          <PrivateRoute path="/dashboard" component={ Dashboard } />
          <PrivateRoute path="/categories" component={ Categories } />
        </Switch>
      </Container>
    ) : (
      <Segment>
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      </Segment>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  user: auth.user
});

export default withRouter(connect(mapStateToProps, { login, logout })(App));
