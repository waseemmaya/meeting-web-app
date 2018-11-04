import React from "react";
import { Heading, Box } from "grommet";

const PageNotFound = () => {
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
      <h3>
        You can not access this page now, try log in or update your profile.
      </h3>
    </Box>
  );
};

export default PageNotFound;
