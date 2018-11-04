import React, { Component } from "react";
import { App } from "grommet";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Screens/Login";
import UserForm from "./Screens/UserForm";
import Dashboard from "./Screens/Dashboard";
import Nav from "./SmallComponents/Nav";
import fire from "./config/fire";
import Error from "./Screens/Error404/Erorr";
import swal from "sweetalert";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    };
  }
  render() {
    return (
      <App>
        <BrowserRouter>
          <div>
            <Nav
              delProfile={this.delProfile}
              logout={this.logout}
              isAuth={this.state.isAuth}
            />
            <Switch>
              <Route path="/" component={Login} exact />

              {this.state.isAuth && (
                <Switch>
                  <Route path="/form" component={UserForm} />
                  <Route
                    path="/dashboard"
                    render={props => <Dashboard {...props} />}
                  />
                </Switch>
              )}
              <Route component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </App>
    );
  }

  componentDidMount() {
    this.checkUser();
  }

  checkUser = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("logged in");

        this.setState({
          isAuth: true
        });
      } else {
        this.setState({
          isAuth: false
        });
      }
    });
  };

  logout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        console.log("sign out");
      })
      .catch(error => {});
  };

  delProfile = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        let userID = user.uid;

        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover Your Account!",
          icon: "warning",
          buttons: true,
          dangerMode: true
        }).then(willDelete => {
          if (willDelete) {
            let userRef = fire.database().ref(`Users/${userID}`);

            userRef.once("value", snap => {
              let allImages = snap.val().imageNames;
              console.log(allImages);

              for (let i = 0; i < allImages.length; i++) {
                var storageRef = fire.storage().ref();
                var imgRef = storageRef.child(`Pics/${userID}/${allImages[i]}`);
                imgRef
                  .delete()
                  .then(() => {
                    userRef.remove();
                  })
                  .catch(error => {});
              }
            });
            swal("Poof! Your file has been deleted!", {
              icon: "success"
            });
          } else {
            swal("Your file is safe!");
          }
        });
      } else {
      }
    });
  };
}

export default Main;
