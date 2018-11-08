import React from "react";
import { Link } from "react-router-dom";
import { Heading, Box, Tiles, Tile } from "grommet";
import { Header, Title, Menu, Anchor } from "grommet/components/..";
import Actions from "grommet/components/icons/base/Actions";
import Status from "grommet/components/icons/Status";
import Dashboard from "grommet/components/icons/base/Dashboard";
import UserSettings from "grommet/components/icons/base/UserSettings";
import Home from "grommet/components/icons/base/Home";

const Nav = props => {
  return (
    <div>
      <Header fixed={false} size="medium" splash={false}>
        <Title>
          <Heading
            tag="h3"
            strong={true}
            uppercase={true}
            truncate={false}
            align="start"
            margin="small"
          >
            <Link to="/">Meet App</Link>
          </Heading>
        </Title>
        <Box flex={true} justify="end" direction="row" responsive={true}>
          <Heading
            tag="h5"
            strong={true}
            uppercase={true}
            truncate={true}
            align="end"
            margin="small"
          >
            {props.name} {props.isAuth && <Status value="ok" />}
            {props.isAuth && (
              <Menu icon={<Actions />} dropAlign={{ right: "right" }}>
                <br />
                <br />
                <br />

                <Anchor onClick={props.logout} href="#">
                  Logout
                </Anchor>
              </Menu>
            )}
          </Heading>
        </Box>
      </Header>
      {!props.isAuth && (
        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="none"
          margin="none"
        >
          <Heading
            tag="h5"
            strong={true}
            uppercase={true}
            truncate={true}
            align="end"
            margin="small"
          >
            <Anchor
              icon={
                <img
                  src="https://image.flaticon.com/icons/svg/124/124010.svg"
                  alt="facebook"
                  style={{ width: 48, height: 48, marginRight: 10 }}
                />
              }
              label="Login with Facebook"
              onClick={props.login}
              href="#"
              primary={true}
            />
          </Heading>
        </Box>
      )}

      <Box justify="start" align="center" wrap={true} pad="small" margin="none">
        <Tiles fill={true} flush={true}>
          {props.isAuth &&
            !props.isSave && (
              <Tile align="center" basis="1/4">
                <Link to="/UserForm">
                  <Anchor
                    icon={<UserSettings />}
                    label="Profile"
                    href="#"
                    primary={true}
                  />
                </Link>
              </Tile>
            )}
          {props.isAuth && (
            <React.Fragment>
              <Tile align="center" basis="1/4">
                <Link to="/">
                  <Heading tag="h2">
                    {" "}
                    <Home /> Home
                  </Heading>
                </Link>
              </Tile>
              <Tile align="center" basis="1/4">
                <Link to="/Dashboard">
                  <Heading tag="h2">
                    <Dashboard /> Dashboard
                  </Heading>
                </Link>
              </Tile>
            </React.Fragment>
          )}
        </Tiles>
      </Box>
    </div>
  );
};

export default Nav;
