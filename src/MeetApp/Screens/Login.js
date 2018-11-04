import React, { Component } from "react";
import { Button, Box } from "grommet";
import Mail from "grommet/components/icons/base/Mail";
import fire from "../config/fire";

class Login extends Component {
  render() {
    return (
      <div>
        <Box
          justify="center"
          align="center"
          wrap={true}
          pad="medium"
          margin="small"
          colorIndex="light-1"
        >
          <Button
            icon={<Mail />}
            label="Login with Facebook"
            onClick={this.login}
            href="#"
            primary={true}
          />
        </Box>
      </div>
    );
  }

  componentDidMount() {
    this.checkUser();
  }

  checkUser = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("logged in login 2");
        this.props.history.replace("/dashboard");
      } else {
        this.props.history.replace("/");
      }
    });
  };

  login = () => {
    let provider = new fire.auth.FacebookAuthProvider();
    fire
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        let userID = result.user.uid;
        let userRef = fire.database().ref(`Users`);
        userRef.once("value", snap => {
          if (snap.val() === null) {
            this.props.history.replace("/form");
          }

          for (const myKey in snap.val()) {
            if (myKey === userID) {
              this.props.history.replace("/dashboard");
            } else {
              this.props.history.replace("/form");
            }
          }
        });
      })
      .catch(error => {});
  };
}

export default Login;
