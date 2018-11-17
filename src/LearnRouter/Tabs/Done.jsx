import React, { Component } from "react";
import { Card, Box, ListItem, Button, Heading } from "grommet";
import moment from "moment";
import fire from "../../MeetApp/config/fire";
import Rating from "react-rating";
import Status from "grommet/components/icons/Status";

class Done extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("props", this.props.val);

    let end = moment(this.props.val.date);
    let now = moment();
    let final = end.from(now);
    let newTime = moment(this.props.val.date).fromNow();

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
              <img alt="" src={this.props.val.myOBJ.imgLinks[0]} />
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
              <img alt="" src={this.props.val.hisOBJ.imgLinks[0]} />
            </div>
          </span>
        </Box>
        <Card
          label={
            <div>
              {this.props.val.isMet && this.props.val.hisIsMet && (
                <p style={{ fontSize: 20 }}>
                  Status : Success <Status value="ok" />
                </p>
              )}
              {!this.props.val.isMet && this.props.val.hisIsMet && (
                <p style={{ fontSize: 20 }}>
                  Status : Complicated <Status value="warning" />
                </p>
              )}
              {this.props.val.isMet && !this.props.val.hisIsMet && (
                <p style={{ fontSize: 20 }}>
                  Status : Complicated <Status value="warning" />
                </p>
              )}
              {this.props.val.isUpdateMeetingStatus && !this.props.val.isMet && !this.props.val.hisIsMet && (
                <p style={{ fontSize: 20 }}>
                  Status : Cancelled <Status value="critical" />
                </p>
              )}
               {!this.props.val.isUpdateMeetingStatus && !this.props.val.isMet && !this.props.val.hisIsMet && (
                <p style={{ fontSize: 20 }}>
                  Status : Pending <Status value="unknown" />
                </p>
              )}

              <p style={{ fontSize: 15, marginTop: -16 }}>{final}</p>
            </div>
          }
          description={
            !this.props.val.isUpdateMeetingStatus ? (
              <p style={{ fontSize: 24 }}>
                {this.props.val.doneTextForMe} at{" "}
                <b>{this.props.val.venueOBJ.venue}</b>?
              </p>
            ) : (
              <p style={{ fontSize: 24 }}>Waiting</p>
            )
          }
        />
        {!this.props.val.isUpdateMeetingStatus && (
          <Box
            justify="start"
            align="center"
            wrap={true}
            pad="medium"
            margin="medium"
            colorIndex="light-1"
          >
            <Button
              onClick={() => this.getYesStatus(this.props.val, this.props.i)}
              label="Yes"
              primary={true}
              plain={false}
              type="submit"
            />
            <br />
            <Button
              onClick={() => this.getNoStatus(this.props.val, this.props.i)}
              label="No"
              primary={true}
              plain={false}
              type="submit"
            />
          </Box>
        )}
      </ListItem>
    );
  }

  getYesStatus = (obj, i) => {
    let myUID = this.props.userID;
    let hisUID = obj.hisOBJ.userID;
    let meetID = obj.meetingID;

    let hisRef = fire
      .database()
      .ref(`AllMeetings/${hisUID}/DoneMeeting/${meetID}`);
    hisRef.once("value", snap => {
      let hisIsMet = snap.val().isMet;

      var makeYes = {
        hisIsMet: hisIsMet,
        isMet: true,
        isUpdateMeetingStatus: true
      };
      let myRef = fire
        .database()
        .ref(`AllMeetings/${myUID}/DoneMeeting/${meetID}`);
      myRef.update(makeYes);
      this.props.rerenderDoneYes(i, hisIsMet);
    });
  };

  getNoStatus = (obj, i) => {
    let myUID = this.props.userID;
    let hisUID = obj.hisOBJ.userID;
    let meetID = obj.meetingID;

    let hisRef = fire
      .database()
      .ref(`AllMeetings/${hisUID}/DoneMeeting/${meetID}`);
    hisRef.once("value", snap => {
      let hisIsMet = snap.val().isMet;

      var makeYes = {
        hisIsMet: hisIsMet,
        isMet: false,
        isUpdateMeetingStatus: true
      };
      let myRef = fire
        .database()
        .ref(`AllMeetings/${myUID}/DoneMeeting/${meetID}`);
      myRef.update(makeYes);
      this.props.rerenderDoneNo(i, hisIsMet);
    });
  };
}

export default Done;
