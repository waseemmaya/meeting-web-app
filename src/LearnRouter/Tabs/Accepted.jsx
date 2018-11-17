import React from "react";
import { Card, Box, ListItem } from "grommet";
import AddToCalendar from "react-add-to-calendar";
import moment from "moment";

const Accepted = props => {
  const event = {
    title: `${props.val.calendarText}`,
    description: `I have set a meeting with ${props.val.myOBJ.nickName} at ${
      props.val.venueOBJ.venue
    } on ${props.val.date}`,
    location: `${props.val.venueOBJ.venue}`,
    startTime: `${props.val.date}`,
    endTime: "2016-09-16T21:45:00-04:00"
  };

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
            <img alt='' src={props.val.myOBJ.imgLinks[0]} />
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
            <img alt='' src={props.val.hisOBJ.imgLinks[0]} />
          </div>
        </span>
      </Box>
      <Card
        label={<p style={{ fontSize: 18 }}>Meeting {final}</p>}
        description={
          <p style={{ fontSize: 24 }}>
            {props.val.textForMe} <b>{props.val.venueOBJ.venue}</b>.
          </p>
        }
      />

      <AddToCalendar event={event} />
    </ListItem>
  );
};

export default Accepted;
