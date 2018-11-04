import React from "react";
import { Heading, Box } from "grommet";

const Error = () => {
  return (
    <Box
      justify="start"
      align="center"
      wrap={true}
      pad="medium"
      margin="small"
      colorIndex="light-1"
    >
      <Heading>Page Not Found</Heading>
      <h3>It may be Authentication Error, try Login or go to Home.</h3>
    </Box>
  );
};

export default Error;
