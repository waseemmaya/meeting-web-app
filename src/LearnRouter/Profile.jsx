import React from "react";
import { Heading,Box } from "grommet";

const Profile = () => {
  console.log("Profile");

  return (
    <Box
      justify="start"
      align="center"
      wrap={true}
      pad="medium"
      margin="small"
      colorIndex="light-1"
    >
      <Heading>Profile</Heading>
    </Box>
  );
};

export default Profile;
