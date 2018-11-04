import React, { Component } from "react";
import Cards, { Card } from "react-swipe-deck";
import GCard from "grommet/components/Card";
import Carousel from "grommet/components/Carousel";
import Box from "grommet/components/Box";
import fire from "../../config/fire";
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
          size={[500, 500]}
          cardSize={[400, 400]}
          className="master-root"
          onEnd={this.onEnd}
        >
          {this.state.userArr.map((val, i) => {
            return (
              <Card
                key={i + val.id}
                onSwipeLeft={() => this.swipeLeft()}
                onSwipeRight={() => this.swipeRight(val.nickName, val.id)}
              >
                <Box
                  justify="start"
                  align="center"
                  wrap={true}
                  pad="medium"
                  margin="small"
                  colorIndex="light-1"
                >
                  <div style={{ backgroundColor: "white", height: 500 }}>
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
      </Box>
    );
  };

  onEnd = () => {
    this.props.history.push("/Dashboard");
    console.log('ended');
    
  };

  swipeLeft = () => {
    console.log("left");
  };

  swipeRight = (name, id) => {
    swal({
      title: "Are you sure?",
      text: `Do you want to meet with ${name}.`,
      icon: "success",
      buttons: true,
      dangerMode: false
    }).then(agree => {
      if (agree) {
        // localStorage.setItem("key", id);
        // this.props.history.push("/Location");
        this.props.history.push({
          pathname: "/NearByLocations",
          state: {
            name: name,
            id: id
          }
        });
      } else {
        return false;
      }
    });
  };
}

export default UserCards;
