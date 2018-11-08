import React from "react";
import { Card, Box, ListItem } from "grommet";

const PendingCards = props => {
  console.log("pendindPropsOBJ", props.val);

  return (
    <ListItem>
      <Box
        justify="start"
        align="center"
        wrap={true}
        pad="small"
        margin="small"
        colorIndex="light-1"
      >
        <span>
          <div
            style={{
              overflow: "hidden",
              marginRight: 8,
              height: 70,
              width: 70,
              borderRadius: 100,
              backgroundColor: "white",
              float: "left"
            }}
          >
            <img src={props.val.myOBJ.imgLinks[0]} />
          </div>
          <div
            style={{
              overflow: "hidden",
              marginRight: 8,
              height: 70,
              width: 70,
              borderRadius: 100,
              backgroundColor: "white",
              float: "right"
            }}
          >
            <img src={props.val.hisOBJ.imgLinks[0]} />
          </div>
        </span>
      </Box>
      <Card
        label={<p style={{ fontSize: 18 }}>Meeting Date {props.val.date}</p>}
        description={
          <p style={{ fontSize: 24 }}>
            You have requested <b>{props.val.hisOBJ.nickName}</b> to meet you at{" "}
            <b>{props.val.venueOBJ.venue}</b>.
          </p>
        }
      />
    </ListItem>
  );
};

export default PendingCards;
