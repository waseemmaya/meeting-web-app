import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "../Screens/Login";
import Dashboard from "../Screens/Dashboard";
import UserForm from "../Screens/UserForm";
import Main from "../Main";

class Routes2 extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Main} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/form" component={UserForm} exact />
      </div>
    );
  }
}

export default Routes2;
