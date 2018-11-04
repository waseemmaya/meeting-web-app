import React from "react";
import { Heading, Box } from "grommet";

const LoggedInButNotRegister = () => {
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
      <h3>You can not access this page now, you have already updated your profile</h3>

    </Box>
  );
};

export default LoggedInButNotRegister;
