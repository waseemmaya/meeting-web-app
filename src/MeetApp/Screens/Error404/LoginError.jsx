import React from "react";
import { Heading, Box } from "grommet";
import { Link } from "react-router-dom";

const LoginError = () => {
  return (
    <div>
      <Box
        justify="start"
        align="center"
        wrap={true}
        pad="medium"
        margin="small"
        colorIndex="light-1"
      >
        <h3 style={{ color: "red" }}>Authentication Error</h3>
        <Link to="/">
          <Heading tag="h2">Login Here</Heading>
        </Link>
      </Box>
    </div>
  );
};

export default LoginError;
