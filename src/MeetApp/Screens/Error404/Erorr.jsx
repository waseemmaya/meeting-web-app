import React from "react";
import { Heading, Box } from "grommet";
import { Link } from "react-router-dom";

const Error = () => {
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
        <h3 style={{ color: "red" }}>Error 404</h3>
        <h3 style={{ color: "red" }}>URL does not exist or Login</h3>
        <Link to="/">
          <Heading tag="h1">Go to Home</Heading>
        </Link>
      </Box>
    </div>
  );
};

export default Error;
