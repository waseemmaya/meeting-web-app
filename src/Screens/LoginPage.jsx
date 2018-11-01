import React, { Component } from "react";
import { Button, Box } from "grommet/components/..";
import Login from "grommet/components/icons/base/Login";
import fire from "../config/fire";

class LoginPage extends Component {

  render() {
    return (
      <Box
        justify="start"
        align="center"
        wrap={true}
        pad="medium"
        margin="small"
        colorIndex="light-1"
      >
        <Button
          icon={<Login />}
          label="Login With Facebook"
          primary={true}
          plain={true}
          type="submit"
          onClick={() => this.props.login(this.go, this.goMore)}
        />
      </Box>
    );
  }

  componentDidMount() {
    this.checkuser();
  }

  checkuser = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.replace("/AddMeeting");
      } else {
        this.props.history.replace("/");
      }
    });
  };

  go = () => {
    this.props.history.push("/NickName1");
  };

  goMore = () => {
    this.props.history.push("/AddMeeting");
  };
}

export default LoginPage;
