import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import fire from "../config/fire";
import Login from "../Screens/Login";
import UserForm from "../Screens/UserForm";
import Dashboard from "../Screens/Dashboard";
import Error from "../Screens/Error404/Erorr";
import LoginError from "../Screens/Error404/LoginError";
import Nav from "../SmallComponents/Nav";
import swal from "sweetalert";
import UserCards from "../Screens/DashboardChild/UserCards";
import NearByLocations from "../Screens/DashboardChild/NearByLocations";
import DateDirection from "../Screens/DashboardChild/DateDirection";
import { App } from "grommet";
import Main from "../Main";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    };
  }
  render() {
    console.log("RoutesProps****", this.props);

    return (
      <App>
        <BrowserRouter>
          <div>
            <Nav
              isAuth={this.state.isAuth}
              delProfile={this.delProfile}
              logout={this.logout}
            />
            <Switch>
              <Route path="/" component={Main} exact />
              <Route path="login" component={Login} />
              <Route path="/Form" component={UserForm} />
              <Route path="/Dashboard" component={Dashboard} />
              <Route path="/UserCards" component={UserCards} />
              <Route path="/NearByLocations" component={NearByLocations} />
              <Route path="/DateDirection" component={DateDirection} />
              <Route component={Error} />
              <Route component={LoginError} />
            </Switch>
          </div>
        </BrowserRouter>
      </App>
    );
  }

  componentDidMount() {
    this.isAUth();
  }

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

  logout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        console.log("sign out");
        this.props.history.replace("/");
      })
      .catch(error => {});
  };

  isAUth = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.replace("/dashboard");
        this.setState({
          isAuth: true,
          show: true
        });
      } else {
        this.props.history.replace("/login");
        this.setState({
          isAuth: false,
          show: true
        });
      }
    });
  };
}

export default Routes;
