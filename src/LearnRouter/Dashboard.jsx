import React, { Component } from "react";
import { Button, Box, Heading } from "grommet";
import Add from "grommet/components/icons/base/Add";
import Pulse from "grommet/components/icons/Pulse";

class Dashboard extends Component {
  render() {
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
          <Heading>Meetings</Heading>
          <p>You have not set any meeting yet.</p>
          <h4>Add New Meeting</h4>
          <Pulse icon={<Add />} onClick={this.navUserCards} />
        </Box>
      </div>
    );
  }
  navUserCards = () => {
    this.props.history.replace("/UserCards");
  };
}

export default Dashboard;
