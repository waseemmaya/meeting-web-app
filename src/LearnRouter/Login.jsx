import React from "react";
import { Button, Box } from "grommet";

const Login = props => {
  return (
    <Box
      justify="start"
      align="center"
      wrap={true}
      pad="medium"
      margin="small"
      colorIndex="light-1"
    >
      <br />
      {!props.isAuth && (
        <Button
          label="Sign in with Facebook"
          onClick={props.login}
          href="#"
          primary={true}
        />
      )}
      {props.isAuth && (
        <Button
          label="Sign Out"
          onClick={props.logout}
          href="#"
          primary={true}
        />
      )}
    </Box>
  );
};

export default Login;
