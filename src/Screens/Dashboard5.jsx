import React, { Component } from "react";
import fire from "../config/fire";
import UserCards from "./UserCards";
import swal from "sweetalert";

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

  swipeRight = id => {
    console.log("Right");
    swal("").then(val => {});

    swal({
      title: "Are you sure?",
      text: "Do you want to meet with this Person.",
      icon: "success",
      buttons: true,
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        localStorage.setItem("key", id);
        this.props.history.push("/Location");
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
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
