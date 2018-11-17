import React from "react";
import { Card, Box, ListItem } from "grommet";
import moment from "moment";

const PendingCards = props => {
  let end = moment(props.val.date);
  let now = moment();
  let final = end.from(now);

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
            <img alt="asd" src={props.val.myOBJ.imgLinks[0]} />
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
            <img alt="asd" src={props.val.hisOBJ.imgLinks[0]} />
          </div>
        </span>
      </Box>
      <Card
        label={<p style={{ fontSize: 18 }}>Meeting {final}</p>}
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
