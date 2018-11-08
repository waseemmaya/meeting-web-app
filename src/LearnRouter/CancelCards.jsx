import React from "react";
import { Card, Box, ListItem } from "grommet";
import Avatar from "react-avatar";

const PendingCards = props => {
  console.log("props", props.val);

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
          <Avatar
            round={true}
            size="70"
            color="#FF0000"
            src={props.val.hisOBJ.imgLinks[props.b]}
          />
          <Avatar
            round={true}
            size="70"
            color="#FF0000"
            src={props.val.myOBJ.imgLinks[props.b]}
          />
        </span>
      </Box>
      <Card
        label={<p style={{ fontSize: 18 }}>Meeting Date {props.val.date}</p>}
        description={
          <p style={{ fontSize: 24 }}>
            <b>{props.val.myOBJ.nickName}</b> has canceled to meet you at{" "}
            <b>{props.val.venueOBJ.venue}</b>.
          </p>
        }
      />
    </ListItem>
  );
};

export default PendingCards;
