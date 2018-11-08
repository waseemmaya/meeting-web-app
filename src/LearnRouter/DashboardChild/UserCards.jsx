import React, { Component } from "react";
import Carousel from "grommet/components/Carousel";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Button from "grommet/components/Button";

import fire from "../../MeetApp/config/fire";
import SwipeableViews from "react-swipeable-views";
import swal from "sweetalert";

class UserCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArr: [],
      myOBJ: []
    };
  }
  render() {
    return (
      <div>
        <Box justify="start" align="center" colorIndex="light-1">
          <h1>UserCards</h1>
        </Box>
        {this.state.userArr.length > 0 && this.renderCards()}
        <div />
      </div>
    );
  }

  renderCards = () => {
    const { userArr } = this.state;
    return (
      <SwipeableViews enableMouseEvents>
        {userArr.map((val, i) => {
          return (
            <div key={i + val.userID}>
              <Box
                justify="start"
                margin="large"
                align="center"
                wrap={false}
                colorIndex="light-1"
              >
                <Box
                  justify="start"
                  align="center"
                  wrap={false}
                  colorIndex="light-1"
                >
                  <Carousel autoplaySpeed={3000}>
                    <img
                      alt={val.userID + i}
                      style={{ width: 600, height: 400 }}
                      src={val.imgLinks[0]}
                    />
                    <img
                      alt={val.userID + i}
                      style={{ width: 600, height: 400 }}
                      src={val.imgLinks[1]}
                    />
                    <img
                      alt={val.userID + i}
                      style={{ width: 600, height: 400 }}
                      src={val.imgLinks[2]}
                    />
                  </Carousel>
                  <br />
                  <Heading>{val.nickName}</Heading>
                  <Button
                    label="Select"
                    onClick={() => this.swipeRight(val.nickName, val)}
                    primary={true}
                    plain={false}
                    type="submit"
                  />
                </Box>
              </Box>
            </div>
          );
        })}
      </SwipeableViews>
    );
  };

  getUsers = () => {
    var { userArr, myOBJ } = this.state;

    let dbRef = fire.database().ref("Users");
    dbRef.on("value", snap => {
      snap.forEach(val => {
        if (val.val().userID !== this.props.userID) {
          // let hisBeverages = val.val().beverages;
          // let hisDuration = val.val().duration;

          // let userLocation = [user.location.latitude, user.location.longitude];
          // let distance = geofire.distance(myLocation, userLocation).toFixed(3);

          // let isBeveragesMatch = this.props.myData.beverages.some(val =>
          //   hisBeverages.includes(val)
          // );

          // let isDurationMatch = this.props.myData.duration.some(val =>
          //   hisDuration.includes(val)
          // );

          userArr.push({ ...val.val() });
          this.setState({
            userArr
          });
          // if (isBeveragesMatch && isDurationMatch) {
          // }
        } else {
          myOBJ = { ...val.val() };
          this.setState({
            myOBJ
          });
        }
      });
    });
  };

  componentDidMount() {
    this.getUsers();
  }

  onEnd = () => {
    this.props.history.push("/Dashboard");
    console.log("ended");
  };

  swipeLeft = () => {
    console.log("left");
  };

  swipeRight = (name, val) => {
    console.log("val", val);

    swal({
      title: "Are you sure?",
      text: `Do you want to meet with ${name}.`,
      icon: "success",
      buttons: true,
      dangerMode: false
    }).then(agree => {
      if (agree) {
        this.props.history.push({
          pathname: "/NearByLocations",
          state: {
            hisOBJ: val,
            myOBJ: this.state.myOBJ
          }
        });
      } else {
        return false;
      }
    });
  };
}

export default UserCards;
