import React, { Component } from "react";
import { App } from "grommet";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./LearnRouter/Nav";
import Home from "./LearnRouter/Home";
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
      userID: "",
      userPic: "",
      myData: []
    };
  }
  render() {
    const { isAuth, isSave, myData } = this.state;
    // console.log("***====****", myData);

    return (
      <BrowserRouter>
        <App>
          <Nav
            name={myData.nickName}
            isSave={isSave}
            login={this.login}
            logout={this.logout}
            isAuth={isAuth}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Home
                  isAuth={isAuth}
                  logout={this.logout}
                  {...props}
                  login={this.login}
                />
              )}
            />
            {isAuth && (
              <Switch>
                {!isSave && (
                  <Switch>
                    <Route
                      path="/UserForm"
                      exact
                      render={props => (
                        <UserForm
                          userID={this.state.userID}
                          userPic={this.state.userPic}
                          changeStatus={this.changeStatus}
                          {...props}
                        />
                      )}
                    />

                    <Route component={PageNotFound} />
                  </Switch>
                )}

                <Route
                  path="/Dashboard"
                  exact
                  render={props => (
                    <Dashboard userID={this.state.userID} {...props} />
                  )}
                />

                <Route
                  path="/UserCards"
                  exact
                  render={props => (
                    <UserCards
                      myData={myData}
                      userID={this.state.userID}
                      {...props}
                    />
                  )}
                />

                <Route
                  path="/NearByLocations"
                  exact
                  render={props => (
                    <NearByLocations
                      myData={myData}
                      userID={this.state.userID}
                      {...props}
                    />
                  )}
                />

                <Route
                  path="/DateDirection"
                  exact
                  render={props => (
                    <DateDirection
                      myData={myData}
                      userID={this.state.userID}
                      {...props}
                    />
                  )}
                />

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

  getMyData = () => {
    let myRef = fire.database().ref(`Users/${this.state.userID}`);
    myRef.once("value", snap => {
      this.setState({
        myData: snap.val()
      });
    });
  };

  logout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        // console.log("sign out");
        this.setState({
          isAuth: false,
          myData: []
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
          userPic: result.user.photoURL,
          userID,
          isAuth: true
        });
        var ref = fire.database().ref(`Users/${userID}`);
        ref.once("value").then(snapshot => {
          var alreadyExist = snapshot.exists();
          if (alreadyExist) {
            // console.log("***alreadyExist***", alreadyExist);

            this.setState({
              isSave: true
            });
            this.getMyData();
          } else {
            // console.log("***alreadyExist***", alreadyExist);
            this.setState({
              isSave: false
            });
          }
        });
      })
      .catch(error => {});
  };

  checkUserStatus = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          userPic: user.photoURL,
          userID: user.uid,
          isAuth: true
        });

        // console.log("Logged in ===> ***");
        var ref = fire.database().ref(`Users/${user.uid}`);
        ref.once("value").then(snapshot => {
          var alreadyExist = snapshot.exists();
          if (alreadyExist) {
            this.getMyData();
            // console.log("***gettingDATA***", alreadyExist);
            this.setState({
              isSave: true
            });
          } else {
            // console.log("***notExist***", alreadyExist);

            this.setState({
              isSave: false
            });
          }
        });
      } else {
        // console.log("Not Logged in ===> ***");
        this.setState({
          isAuth: false
        });
      }
    });
  };
}

export default Routes;
