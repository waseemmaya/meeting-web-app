import React, { Component } from "react";
import { Button } from "grommet";

class AddMeeting extends Component {
  render() {
    return (
      <div>
        <h1>No Meeting</h1>
        <Button 
        label="Add a Meeting"
        primary={true}
        plain={false}
        type="submit"
        onClick={this.handleMeeting}
        />
      </div>
    );
  }

  handleMeeting = () => {
    console.log('meeing');
    this.props.history.push('/Dashboard5');
  }
}

export default AddMeeting;
