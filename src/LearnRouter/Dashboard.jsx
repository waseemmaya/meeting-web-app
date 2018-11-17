import React, { Component } from "react";
import { Box, Heading, Tabs, Tab, List } from "grommet";
import Spinning from "grommet/components/icons/Spinning";
import Add from "grommet/components/icons/base/Add";
import Pulse from "grommet/components/icons/Pulse";
import fire from "../MeetApp/config/fire";
import PendingCards from "./Tabs/PendingCards";
import RequestCards from "./Tabs/RequestCards";
import Accepted from "./Tabs/Accepted";
import Rejected from "./Tabs/Rejected";
import Done from "./Tabs/Done";

import moment from "moment";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.userID,
      myProposalsArr: [],
      hisProposalsArr: [],
      acceptedArr: [],
      rejectedArr: [],
      doneArr: []
    };
  }
  render() {
    return (
      <div>
        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="medium"
          margin="small"
          colorIndex="light-1"
        >
          <h3>Add New Meeting</h3>

          <Pulse icon={<Add />} onClick={this.navUserCards} />
        </Box>
        {this.renderTabs()}
      </div>
    );
  }

  navUserCards = () => {
    this.props.history.replace("/UserCards");
  };

  renderTabs = () => {
    const {
      myProposalsArr,
      hisProposalsArr,
      acceptedArr,
      rejectedArr,
      doneArr
    } = this.state;

    return (
      <Tabs>
        <Tab
          title={
            <span>
              <b>{myProposalsArr.length} </b>
              Pending
            </span>
          }
        >
          <Box
            justify="start"
            align="center"
            wrap={true}
            pad="small"
            margin="small"
            colorIndex="light-1"
          >
            <Heading>Pending</Heading>
            {myProposalsArr.length > 0 ? (
              <List>
                {myProposalsArr.map((val, i) => {
                  return (
                    <PendingCards key={val.myOBJ.userID + i} i={i} val={val} />
                  );
                })}
              </List>
            ) : (
              <span>
                <h2>No Data Found</h2>
                <Spinning size="xlarge" />
              </span>
            )}
          </Box>
        </Tab>
        <Tab
          title={
            <span>
              <b>{hisProposalsArr.length} </b>
              Requests
            </span>
          }
        >
          <Box
            justify="start"
            align="center"
            wrap={true}
            pad="small"
            margin="small"
            colorIndex="light-1"
          >
            <Heading>Requests</Heading>
            {hisProposalsArr.length > 0 ? (
              <List>
                {hisProposalsArr.map((val, i) => {
                  return (
                    <RequestCards
                      key={val.myOBJ.userID + i}
                      acceptMeeting={this.acceptMeeting}
                      rejectMeeting={this.rejectMeeting}
                      i={i}
                      val={val}
                    />
                  );
                })}
              </List>
            ) : (
              <span>
                <h2>No Data Found</h2>
                <Spinning size="xlarge" />
              </span>
            )}
          </Box>
        </Tab>
        <Tab
          title={
            <span>
              <b>{acceptedArr.length} </b>
              Accepted
            </span>
          }
        >
          <Box
            justify="start"
            align="center"
            wrap={true}
            pad="small"
            margin="small"
            colorIndex="light-1"
          >
            <Heading>Accepted</Heading>
            {acceptedArr.length > 0 ? (
              <List>
                {acceptedArr.map((val, i) => {
                  return (
                    <Accepted key={val.myOBJ.userID + i} i={i} val={val} />
                  );
                })}
              </List>
            ) : (
              <span>
                <h2>No Data Found</h2>
                <Spinning size="xlarge" />
              </span>
            )}
          </Box>
        </Tab>
        <Tab
          title={
            <span>
              <b>{rejectedArr.length} </b>
              Rejected
            </span>
          }
        >
          <Box
            justify="start"
            align="center"
            wrap={true}
            pad="small"
            margin="small"
            colorIndex="light-1"
          >
            <Heading>Rejected</Heading>
            {rejectedArr.length > 0 ? (
              <List>
                {rejectedArr.map((val, i) => {
                  return (
                    <Rejected key={val.myOBJ.userID + i} i={i} val={val} />
                  );
                })}
              </List>
            ) : (
              <span>
                <h2>No Data Found</h2>
                <Spinning size="xlarge" />
              </span>
            )}
          </Box>
        </Tab>
        <Tab
          title={
            <span>
              <b>{doneArr.length} </b>
              Done
            </span>
          }
        >
          <Box
            justify="start"
            align="center"
            wrap={true}
            pad="small"
            margin="small"
            colorIndex="light-1"
          >
            <Heading>Done</Heading>
            {doneArr.length > 0 ? (
              <List>
                {doneArr.map((val, i) => {
                  return (
                    <Done
                      key={val.myOBJ.userID + i}
                      userID={this.state.userID}
                      rerenderDoneYes={this.rerenderDoneYes}
                      rerenderDoneNo={this.rerenderDoneNo}
                      i={i}
                      val={val}
                    />
                  );
                })}
              </List>
            ) : (
              <span>
                <h2>No Data Found</h2>
                <Spinning size="xlarge" />
              </span>
            )}
          </Box>
        </Tab>
      </Tabs>
    );
  };

  componentDidMount() {
    this.getHisProposal();
    this.getMyProposal();
    this.getAcceptedForBoth();
    this.getRejectedForBoth();
    this.getDoneMeeting();
  }

  rerenderDoneYes = (i, hisIsMet) => {
    var { doneArr } = this.state;
    doneArr[i].isMet = true;
    doneArr[i].isUpdateMeetingStatus = true;
    doneArr[i].hisIsMet = hisIsMet;

    this.setState({
      doneArr
    });
  };

  rerenderDoneNo = (i, hisIsMet) => {
    var { doneArr } = this.state;
    doneArr[i].isMet = false;
    doneArr[i].isUpdateMeetingStatus = true;
    doneArr[i].hisIsMet = hisIsMet;

    this.setState({
      doneArr
    });
  };

  acceptMeeting = (
    myName,
    hisName,
    myUID,
    hisUID,
    meetingOBJ,
    meetingDeleteID,
    arrayID
  ) => {
    let hisID = hisUID;
    let myID = myUID;
    let meetID = meetingDeleteID;

    let obj = meetingOBJ;

    let hisAcceptRef = fire
      .database()
      .ref(`AllMeetings/${hisID}/AcceptedMeeting/${meetID}`);
    let myAcceptRef = fire
      .database()
      .ref(`AllMeetings/${myID}/AcceptedMeeting/${meetID}`);

    let hisMeetingRef = fire
      .database()
      .ref(`AllMeetings/${myID}/IRequestToHim/${meetID}`);
    let myMeetingRef = fire
      .database()
      .ref(`AllMeetings/${hisID}/HeRequestToMe/${meetID}`);

    hisMeetingRef.set(null).then(() => {
      console.log("hisDelete");
      obj.textForMe = `I have accepted ${myName}'s request to meet him at `;
      obj.calendarText = `You have set meeting with ${myName}`;

      hisAcceptRef.set(obj);
      myMeetingRef.set(null).then(() => {
        obj.textForMe = `${hisName} has accepted your request to meet you at `;
        obj.calendarText = `${hisName} has set meeting with me`;

        myAcceptRef.set(obj);
        console.log("myDelete");
        const { hisProposalsArr } = this.state;
        hisProposalsArr.splice(arrayID, 1);
        this.setState({
          hisProposalsArr
        });
      });
    });
  };

  rejectMeeting = (
    myName,
    hisName,
    myUID,
    hisUID,
    meetingOBJ,
    meetingDeleteID,
    arrayID
  ) => {
    let hisID = hisUID;
    let myID = myUID;
    let meetID = meetingDeleteID;

    let obj = meetingOBJ;

    let hisRejectRef = fire
      .database()
      .ref(`AllMeetings/${hisID}/RejectedMeeting/${meetID}`);

    let myRejectRef = fire
      .database()
      .ref(`AllMeetings/${myID}/RejectedMeeting/${meetID}`);

    let hisMeetingRef = fire
      .database()
      .ref(`AllMeetings/${myID}/IRequestToHim/${meetID}`);

    let myMeetingRef = fire
      .database()
      .ref(`AllMeetings/${hisID}/HeRequestToMe/${meetID}`);

    hisMeetingRef.set(null).then(() => {
      console.log("hisDelete");
      obj.textForMe = `You have rejected ${myName}'s request`;
      hisRejectRef.set(obj);
      myMeetingRef.set(null).then(() => {
        console.log("myDelete");
        obj.textForMe = `${hisName} has cancelled your request `;
        myRejectRef.set(obj);
        const { hisProposalsArr } = this.state;
        hisProposalsArr.splice(arrayID, 1);
        this.setState({
          hisProposalsArr
        });
      });
    });
  };

  getRejectedForBoth = () => {
    const { userID, rejectedArr } = this.state;
    let meetings = fire.database().ref(`AllMeetings/${userID}/RejectedMeeting`);
    meetings.on("child_added", snap => {
      rejectedArr.push({ ...snap.val() });
      this.setState({
        rejectedArr
      });
    });
  };

  getAcceptedForBoth = () => {
    const { userID, acceptedArr } = this.state;
    let meetings = fire.database().ref(`AllMeetings/${userID}/AcceptedMeeting`);
    meetings.on("child_added", snap => {
      meetings.once("value").then(snapshot => {
        var a = snapshot.numChildren();
        for (let i = 0; i < a; i++) {
          let meetingTime = snap.val().date;
          // let diffTime = moment(meetingTime).fromNow();
          var now = moment();
          let diff = now.diff(meetingTime);
          if (diff > 0) {
            this.delAndPush(snap.val());
          } else {
            acceptedArr.push({ ...snap.val() });
            this.setState({
              acceptedArr
            });
          }
        }
      });
    });
  };

  delAndPush = getOBJ => {
    let hisID = getOBJ.myOBJ.userID;
    let hisName = getOBJ.myOBJ.nickName;
    let myID = getOBJ.hisOBJ.userID;
    let myName = getOBJ.hisOBJ.nickName;

    let meetID = getOBJ.meetingID;

    let hisDoneRef = fire
      .database()
      .ref(`AllMeetings/${hisID}/DoneMeeting/${meetID}`);
    let myDoneRef = fire
      .database()
      .ref(`AllMeetings/${myID}/DoneMeeting/${meetID}`);

    let hisMeetingRef = fire
      .database()
      .ref(`AllMeetings/${myID}/AcceptedMeeting/${meetID}`);
    let myMeetingRef = fire
      .database()
      .ref(`AllMeetings/${hisID}/AcceptedMeeting/${meetID}`);

    hisMeetingRef.set(null).then(() => {
      console.log("hisDelete");
      getOBJ.doneTextForMe = `Was the meeting successful with ${myName} `;
      getOBJ.isMet = false;

      hisDoneRef.set(getOBJ);
      myMeetingRef.set(null).then(() => {
        getOBJ.isMet = false;
        getOBJ.doneTextForMe = `Was the meeting successful with ${hisName} `;
        myDoneRef.set(getOBJ);
        console.log("myDelete");
      });
    });
  };

  getMyProposal = () => {
    const { userID, myProposalsArr } = this.state;
    let meetings = fire.database().ref(`AllMeetings/${userID}/IRequestToHim`);
    meetings.on("child_added", snap => {
      myProposalsArr.push({ ...snap.val() });
      this.setState({
        myProposalsArr
      });
    });
  };

  getDoneMeeting = () => {
    const { userID, doneArr } = this.state;
    let meetings = fire.database().ref(`AllMeetings/${userID}/DoneMeeting`);
    meetings.on("child_added", snap => {
      doneArr.push({ ...snap.val() });
      this.setState({
        doneArr
      });
    });
  };

  getHisProposal = () => {
    const { userID, hisProposalsArr } = this.state;
    console.log("length===>", hisProposalsArr.length);

    let meetings = fire.database().ref(`AllMeetings/${userID}/HeRequestToMe`);
    meetings.on("child_added", snap => {
      // console.log("snap==>", snap.val());
      hisProposalsArr.push({ ...snap.val() });
      this.setState({
        hisProposalsArr
      });
    });
  };
}

export default Dashboard;
