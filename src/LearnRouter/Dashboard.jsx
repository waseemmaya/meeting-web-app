import React, { Component } from "react";
import { Button, Box, Heading } from "grommet";
import Add from "grommet/components/icons/base/Add";

class Dashboard extends Component {
  render() {
    console.log("dash", this.props);

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
          <Heading>Dashboard</Heading>
          <p>You have not set any meeting yet.</p>
          <Button
            icon={<Add />}
            label="Add New Meeting"
            primary={true}
            secondary={false}
            onClick={this.navUserCards}
            accent={false}
            critical={false}
            href="#"
            plain={false}
          />
        </Box>
      </div>
    );
  }
  navUserCards = () => {
    this.props.history.replace("/UserCards");
  };
}

export default Dashboard;
