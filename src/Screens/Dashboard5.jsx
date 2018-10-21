import React, { Component } from "react";
import fire from "../config/fire";
import UserCards from "./UserCards";
import Heading from "grommet/components/Heading";

class Dashboard5 extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      loaded: false
    };
  }

  render() {
    const { data, loaded } = this.state;
    return (
      <div>
        <Heading>Dashboard</Heading>
        {loaded && (
          <UserCards
            data={data}
            swipeRight={this.swipeRight}
            swipeLeft={this.swipeLeft}
            onEnd={this.onEnd}
          />
        )}
      </div>
    );
  }

  swipeRight = () => {
    console.log("Right");
  };
  swipeLeft = () => {
    console.log("Left");
  };

  onEnd = () => {
    console.log("ended");
  };

  componentDidMount() {
    const { data } = this.state;
    let dbRef = fire.database().ref("UsersProfile");
    dbRef.on("child_added", snap => {
      let a = snap.val();
      data.push(a);
      // console.log("a", data);
      this.setState({
        data,
        loaded: true
      });
    });
  }
}

export default Dashboard5;
