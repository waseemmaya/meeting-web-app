import React from "react";
import { Card, Box, ListItem, Button } from "grommet";

const RequestCards = props => {
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
            <img src={props.val.hisOBJ.imgLinks[0]} />
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
            <img src={props.val.myOBJ.imgLinks[0]} />
          </div>
        </span>
      </Box>
      <Card
        label={<p style={{ fontSize: 18 }}>Meeting Date {props.val.date}</p>}
        description={
          <p style={{ fontSize: 24 }}>
            <b>{props.val.hisOBJ.nickName}</b> has requested you to meet at{" "}
            <b>{props.val.venueOBJ.venue}</b>.
          </p>
        }
      />
      <Box
        justify="start"
        align="center"
        wrap={true}
        pad="medium"
        margin="medium"
        colorIndex="light-1"
      >
        <Button
          label="Accept"
          onClick={() =>
            props.acceptMeeting(
              props.val.hisOBJ.nickName,
              props.val.myOBJ.nickName,
              props.val.hisOBJ.userID,
              props.val.myOBJ.userID,
              props.val,
              props.val.meetingID,
              props.i
            )
          }
          primary={true}
          plain={false}
          type="submit"
        />
        <br />
        <Button
          label="Reject"
          onClick={() =>
            props.rejectMeeting(
              props.val.hisOBJ.nickName,
              props.val.myOBJ.nickName,
              props.val.hisOBJ.userID,
              props.val.myOBJ.userID,
              props.val,
              props.val.meetingID,
              props.i
            )
          }
          primary={true}
          plain={false}
          type="submit"
        />
      </Box>
    </ListItem>
  );
};

export default RequestCards;
