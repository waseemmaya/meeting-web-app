import React, { Component } from "react";
import { App } from "grommet";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./LearnRouter/Nav";
import Login from "./LearnRouter/Login";
import UserForm from "./LearnRouter/UserForm";
import Dashboard from "./LearnRouter/Dashboard";
import fire from "./MeetApp/config/fire";
import LoggedInButNotRegister from "./LearnRouter/Errors/LoggedInButNotRegister";
import NotLoggedin from "./LearnRouter/Errors/NotLoggedin";
import PageNotFound from "./LearnRouter/Errors/PageNotFound";
import UserCards from "./LearnRouter/DashboardChild/UserCards";
import NearByLocations from "./LearnRouter/DashboardChild/NearByLocations";
import DateDirection from "./LearnRouter/DashboardChild/DateDirection";

class Routes extends Component {
  constructor() {
    super();
    this.state = {
      isSave: true,
      isAuth: false,
      userID: ""
    };
  }
  render() {
    const { isAuth, isSave } = this.state;
    return (
      <BrowserRouter>
        <App>
          <Nav isSave={isSave} logout={this.logout} isAuth={isAuth} />
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Login
                  isAuth={isAuth}
                  logout={this.logout}
                  {...props}
                  login={this.login}
                />
              )}
            />
            {isAuth && (
              <Switch>
                {/* User agar save nhi hai to ye chalega  */}
                {!isSave && (
                  <Switch>
                    <Route
                      path="/UserForm"
                      exact
                      render={props => (
                        <UserForm changeStatus={this.changeStatus} {...props} />
                      )}
                    />

                    <Route component={PageNotFound} />
                  </Switch>
                )}
                {/* User agar save nhi hai to ye chalega  */}

                <Route path="/Dashboard" component={Dashboard} exact />
                <Route path="/UserCards" component={UserCards} exact />
                <Route
                  path="/NearByLocations"
                  component={NearByLocations}
                  exact
                />
                <Route path="/DateDirection" component={DateDirection} exact />

                <Route component={LoggedInButNotRegister} />
              </Switch>
            )}
            <Route component={NotLoggedin} />
          </Switch>
        </App>
      </BrowserRouter>
    );
  }

  changeStatus = () => {
    this.setState({
      isSave: true
    });
  };

  componentDidMount() {
    this.checkUserStatus();
  }

  logout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        console.log("sign out");
        this.setState({
          isAuth: false
        });
      })
      .catch(error => {});
  };

  login = () => {
    let provider = new fire.auth.FacebookAuthProvider();
    fire
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        let userID = result.user.uid;
        this.setState({
          userID,
          isAuth: true
        });
        let userRef = fire.database().ref(`Users`);
        userRef.once("value", snap => {
          if (snap.val() === null) {
            this.setState({
              isSave: false
            });
          }

          for (const myKey in snap.val()) {
            if (myKey === userID) {
              this.setState({
                isSave: true
              });
            } else {
              this.setState({
                isSave: false
              });
            }
          }
        });
      })
      .catch(error => {});
  };

  checkUserStatus = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          userID: user.uid,
          isAuth: true
        });
        console.log("Already Logged in ===> ***");

        let userRef = fire.database().ref(`Users`);
        userRef.once("value", snap => {
          if (snap.val() === null) {
            console.log("Null ===> ***");

            this.setState({
              isSave: false
            });
          } else {
            for (const myKey in snap.val()) {
              if (myKey === user.uid) {
                console.log("User Matched ===> ***");

                this.setState({
                  isSave: true
                });
              } else {
                console.log("User Not Matched ===> ***");

                this.setState({
                  isSave: false
                });
              }
            }
          }
        });
      } else {
        console.log("Not Logged in ===> ***");

        this.setState({
          isAuth: false
        });
      }
    });
  };
}

export default Routes;
