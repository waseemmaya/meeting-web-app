import React, { Component } from "react";
import Cards, { Card } from "react-swipe-deck";
import GCard from "grommet/components/Card";
import Image from "grommet/components/Image";
import Carousel from "grommet/components/Carousel";

class UserCards extends Component {
  render() {
    return (
      <Cards className="master-root" onEnd={this.props.onEnd}>
        {this.props.data.map((val, i) => {
          return (
            <Card
              key={i}
              onSwipeLeft={this.props.swipeLeft}
              onSwipeRight={this.props.swipeRight}
            >
              <div style={{ backgroundColor: "white" }}>
                <Carousel>
                  <Image src={val.imglink1} />
                  <Image src={val.imglink2} />
                  <Image src={val.imglink3} />
                </Carousel>
                <GCard label={val.nickName} heading={val.phone} />
              </div>
            </Card>
          );
        })}
      </Cards>
    );
  }
}

export default UserCards;
