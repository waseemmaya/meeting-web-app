import React from "react";
import { Link } from "react-router-dom";
import { Heading, List, ListItem, Box, Button } from "grommet";

const Nav = props => {
  return (
    <div>
      <Box
        justify="start"
        align="center"
        wrap={true}
        pad="none"
        margin="none"
        colorIndex=""
      >
        <Heading>Meet App</Heading>
      </Box>
      <Box
        justify="start"
        align="center"
        wrap={true}
        pad="small"
        margin="none"
        colorIndex={props.isAuth ? "ok" : "critical"}
      >
        <Heading tag="h2">
          {props.isAuth ? "User is Online" : "User is Offline"}
        </Heading>
      </Box>
      <List>
        <ListItem>
          <Link to="/">Home</Link>
        </ListItem>
        {props.isAuth && !props.isSave && <ListItem>
          <Link to="/UserForm">Profile</Link>
        </ListItem>}
        <ListItem>
          <Link to="/Dashboard">Dashboard</Link>
        </ListItem>
      </List>
    </div>
  );
};

export default Nav;
