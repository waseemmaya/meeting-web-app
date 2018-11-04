import React, { Component } from "react";
import Cards, { Card } from "react-swipe-deck";
import GCard from "grommet/components/Card";
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

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    const { userArr } = this.state;
    let dbRef = fire.database().ref("Users");
    dbRef.on("value", snap => {
      snap.forEach(val => {
        userArr.push({ id: val.key, ...val.val() });
        this.setState({
          userArr
        });
      });
    });
  };

  renderCards = () => {
    return (
      <Box justify="start" align="center" colorIndex="light-1">
        <Cards
          size={[600, 600]}
          cardSize={[500, 500]}
          className="master-root"
          onEnd={this.onEnd}
        >
          {this.state.userArr.map((val, i) => {
            return (
              <Card
                key={i + val.id}
                onSwipeLeft={() => this.swipeLeft()}
                onSwipeRight={() =>
                  this.swipeRight(val.nickName, val.id, val.lat, val.long)
                }
              >
                <Box
                  justify="start"
                  align="center"
                  wrap={true}
                  pad="medium"
                  margin="small"
                  colorIndex="light-1"
                >
                  <div style={{ backgroundColor: "white" }}>
                    <h1>
                      {i + 1} Out of {this.state.userArr.length}
                    </h1>
                    <Carousel>
                      <img alt="pic1" height="300" src={val.imgLinks[0]} />
                      <img alt="pic2" height="300" src={val.imgLinks[1]} />
                      <img alt="pic3" height="300" src={val.imgLinks[2]} />
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

  onEnd = () => {
    this.props.history.push("/Dashboard");
    console.log("ended");
  };

  swipeLeft = () => {
    console.log("left");
  };

  swipeRight = (name, id, lat, long) => {
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
