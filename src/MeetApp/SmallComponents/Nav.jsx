import React from "react";
import { Link } from "react-router-dom";

import {
  Header,
  Box,
  Anchor,
  Menu,
  Heading
} from "grommet/components/..";
import Actions from "grommet/components/icons/base/Actions";

const Nav = props => {
  
  return (
    <div>
      <Header size="medium">
        <Link to="/">
          <Heading tag="h1">Meet App</Heading>
        </Link>
        {props.isAuth && (
          <div>
            <Link to="/dashboard">
              <Heading tag="h3">Dashboard</Heading>
            </Link>
          </div>
        )}

        <Box flex={true} justify="end" direction="row" responsive={false}>
          <Menu icon={<Actions />} dropAlign={{ right: "right" }}>
            <br />
            <br />
            {!props.isAuth && <Anchor onClick={props.login} className="active">
              Login
            </Anchor>}
            {props.isAuth && (
              <div>
                <Anchor onClick={props.delProfile} className="active">
                  Delete Account
                </Anchor>
                <Anchor onClick={props.logout} className="active">
                  Logout
                </Anchor>
              </div>
            )}
          </Menu>
        </Box>
      </Header>
    </div>
  );
};

export default Nav;
