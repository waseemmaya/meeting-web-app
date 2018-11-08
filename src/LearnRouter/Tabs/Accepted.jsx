import React from "react";
import { Card, Box, ListItem, Button, Heading } from "grommet";
import AddToCalendar from "react-add-to-calendar";
import Calendar from "grommet/components/icons/base/Calendar";

const Accepted = props => {
  console.log("idNikal", props.val);
  const event = {
    title: `${props.val.calendarText}`,
    description: `I have set a meeting with ${props.val.myOBJ.nickName} at ${
      props.val.venueOBJ.venue
    } on ${props.val.date}`,
    location: `${props.val.venueOBJ.venue}`,
    startTime: `${props.val.date}`,
    endTime: "2016-09-16T21:45:00-04:00"
  };

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
            {props.val.textForMe}{" "}
            <b>{props.val.venueOBJ.venue}</b>.
          </p>
        }
      />

      <AddToCalendar event={event} />
    </ListItem>
  );
};

export default Accepted;
