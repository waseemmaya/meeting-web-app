import React, { Component } from "react";
import Cards, { Card } from "react-swipe-deck";
import GCard from "grommet/components/Card";
import Image from "grommet/components/Image";
import Carousel from "grommet/components/Carousel";
import Box from "grommet/components/Box";
import fire from "../../MeetApp/config/fire";
import swal from "sweetalert";

class UserCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArr: []
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
      <Box justify="start" align="center" colorIndex="light-1">
        <Cards
          size={[600, 600]}
          cardSize={[550, 550]}
          className="master-root"
          onEnd={this.onEnd}
        >
          {userArr.map((val, i) => {
            return (
              <Card
                key={i + val.userID}
                onSwipeLeft={() => this.swipeLeft()}
                onSwipeRight={() =>
                  this.swipeRight(
                    val.nickName,
                    val.userID,
                    val.lat,
                    val.long,
                    val
                  )
                }
              >
                <Box
                  justify="start"
                  align="center"
                  pad="medium"
                  margin="medium"
                  colorIndex="light-1"
                >
                  <div style={{ backgroundColor: "white" }}>
                    <h1>
                      {i + 1} Out of {this.state.userArr.length}
                    </h1>
                    <Carousel>
                      <img
                        alt="pic1"
                        style={{
                          width: 400,
                          height: 300
                        }}
                        src={val.imgLinks[0]}
                      />
                      <img
                        alt="pic2"
                        style={{
                          width: 400,
                          height: 300
                        }}
                        src={val.imgLinks[1]}
                      />
                      <img
                        alt="pic3"
                        style={{
                          width: 400,
                          height: 300
                        }}
                        src={val.imgLinks[2]}
                      />
                    </Carousel>
                    <GCard label={val.nickName} heading={val.phone} />
                  </div>
                </Box>
              </Card>
            );
          })}
        </Cards>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Box>
    );
  };

  getUsers = () => {
    const { userArr } = this.state;

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

  swipeRight = (name, id, lat, long, val) => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem("myUID", user.uid);
        console.log("myUID", user.uid);
        console.log("targetUID", id);
      }
    });
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
            name: name,
            id: id,
            lat: lat,
            long: long
          }
        });
      } else {
        return false;
      }
    });
  };
}

export default UserCards;
