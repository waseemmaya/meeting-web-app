import React, { Component } from "react";
import Cards, { Card } from "react-swipe-deck";
import GCard from "grommet/components/Card";
import Image from "grommet/components/Image";
import Carousel from "grommet/components/Carousel";
import Box from "grommet/components/Box";

class UserCards extends Component {
  render() {
    return (
      <Box
      justify="start"
      align="center"
      wrap={true}
      pad="medium"
      margin="small"
      colorIndex="light-1"
    >
      <Cards
        size={[500, 500]}
        cardSize={[400, 400]}
        className="master-root"
        onEnd={this.props.onEnd}
      >
        {this.props.data.map((val, i) => {
          console.log('val',val);
          
          return (
            <Card
              key={i}
              onSwipeLeft={() => this.props.swipeLeft()}
              onSwipeRight={() => this.props.swipeRight(val.userID)}
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
                  <Carousel>
                    <Image src={val.imglink1} />
                    <Image src={val.imglink2} />
                    <Image src={val.imglink3} />
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
  }
}

export default UserCards;
