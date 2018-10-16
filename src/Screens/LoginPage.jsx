import React, { Component } from "react";
import { App, Heading, Button, Box } from "grommet/components/..";
import Login from "grommet/components/icons/base/Login";

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
          onClick={this.props.login}
        />
      </Box>
    );
  }
}

export default LoginPage;
