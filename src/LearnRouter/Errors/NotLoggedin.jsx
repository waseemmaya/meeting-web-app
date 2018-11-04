import React from "react";
import { Heading, Box } from "grommet";

const NotLoggedin = () => {
  return (
    <Box
      justify="start"
      align="center"
      wrap={true}
      pad="medium"
      margin="small"
      colorIndex="light-1"
    >
      <Heading>Something went wrong</Heading>
      <h4>
        The requested URL doesn't exist or to access this page you need to login
        first.
      </h4>
    </Box>
  );
};

export default NotLoggedin;
