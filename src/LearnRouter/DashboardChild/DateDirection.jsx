/* eslint-disable no-undef */
/* global google */
import React, { Component } from "react";
import Box from "grommet/components/Box";
import Location from "grommet/components/icons/base/Location";
import Add from "grommet/components/icons/base/Add";
import Pulse from "grommet/components/icons/Pulse";
import fire from "../../MeetApp/config/fire";
import moment from "moment";

import { Form, FormField, DateTime, Button, Value, Timestamp } from "grommet";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  withScriptjs
} from "react-google-maps";
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

class DateDirection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      coords: {},
      hisOBJ: this.props.location.state.hisOBJ,
      myOBJ: this.props.location.state.myOBJ,
      venueOBJ: this.props.location.state.venueOBJ,
      distance: "",
      showDate: true,
      isMarkerShown: true,
      beforeMarker: true,
      isSubmitEnable: false
    };
  }
  render() {
    return (
      <div>
        <div>
          <Box justify="start" align="center" colorIndex="light-1">
            {/* <h1>Date</h1> */}
            {/* <p>{this.state.date}</p> */}
            {this.state.date.length > 1 && (
              <Timestamp
                value={this.state.date}
                fields={["date", "time", "seconds"]}
              />
            )}
          </Box>
        </div>
        {this.state.showDate && this.renderDate()}
        {!this.state.showDate && this.renderDirection()}
      </div>
    );
  }

  addMeeting = () => {
    const { hisOBJ, myOBJ, venueOBJ, distance, date } = this.state;
    var randNo = Math.floor(100444000 + Math.random() * 90012000);
    let meetingID = randNo;

    let meetingOBJForMe = {
      meetingID,
      hisOBJ,
      myOBJ,
      venueOBJ,
      distance,
      date,
      status: "Pending",
      isMet: false,
      isUpdateMeetingStatus: false,
      isRated: false,
      isCancel: false,
      isAccepted: false
    };

    let meetingOBJForHim = {
      meetingID,
      hisOBJ: myOBJ,
      myOBJ: hisOBJ,
      venueOBJ,
      distance,
      date,
      status: "Pending",
      isMet: false,
      isUpdateMeetingStatus: false,
      isRated: false,
      isCancel: false,
      isAccepted: false
    };

    let myMeetingRef = fire
      .database()
      .ref(`AllMeetings/${myOBJ.userID}/IRequestToHim/${meetingID}`);

    let hisMeetingRef = fire
      .database()
      .ref(`AllMeetings/${hisOBJ.userID}/HeRequestToMe/${meetingID}`);

    hisMeetingRef.set(meetingOBJForHim).then(() => {
      console.log("in his node");
      myMeetingRef.set(meetingOBJForMe).then(() => {
        console.log("in my node");
        this.props.history.push("/Dashboard");
      });
    });
  };

  renderDate = () => {
    return (
      <Box justify="start" align="center" colorIndex="light-1">
        <Form>
          <FormField>
            <DateTime
              id="date"
              name="date"
              value={this.state.date}
              onChange={this.handleDate}
            />
          </FormField>
        </Form>
        <br />
        {this.state.date.length > 0 && (
          <Button label="Next" primary={true} onClick={this.red} />
        )}
      </Box>
    );
  };

  red = () => {
    this.setState({
      showDate: false
    });
  };

  handleDate = e => {
    console.log(e);
    this.setState({
      date: e
    });
    var end = moment(e);
    var now = moment();
    let final = end.from(now);
    console.log("Final Date ===> ", final);
  };

  renderDirection = () => {
    const {
      venueOBJ,
      hisOBJ,
      coords,
      directions,
      beforeMarker,
      isMarkerShown,
      distance
    } = this.state;

    return (
      <div>
        <div>
          <MyMapComponent
            coords={coords}
            venueLat={venueOBJ.lat}
            venueLong={venueOBJ.long}
            hisLat={hisOBJ.lat}
            hisLong={hisOBJ.long}
            beforeMarker={beforeMarker}
            isMarkerShown={isMarkerShown}
            distance={distance}
            googleMapURL="https://maps.googleapis.com/maps/api/js?libraries=geometry&sensor=false&key=AIzaSyAv82eqKbZOaEU4RyRYOFBs0Tz7tlOEM4Y"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `600px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            directions={directions}
          />
        </div>

        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="small"
          margin="small"
          colorIndex="light-1"
        >
          <h2>Get Direction Routes</h2>

          <Pulse onClick={this.getDirections} icon={<Location />} />
        </Box>

        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="small"
          margin="small"
          colorIndex="light-1"
        >
          {this.state.isSubmitEnable && (
            <Button
              icon={<Add />}
              label="Add Meeting"
              onClick={this.addMeeting}
              primary={true}
            />
          )}
        </Box>
      </div>
    );
  };

  getDirections = () => {
    const { venueOBJ, hisOBJ } = this.state;
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: new google.maps.LatLng(hisOBJ.lat, hisOBJ.long),
        destination: new google.maps.LatLng(venueOBJ.lat, venueOBJ.long),
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log("result", result);
          this.setState({
            directions: result,
            beforeMarker: false,
            isSubmitEnable: true
          });
        } else {
          console.log("Sorry! Can't calculate directions!");
        }
      }
    );

    var p1 = new google.maps.LatLng(hisOBJ.lat, hisOBJ.long);
    var p2 = new google.maps.LatLng(venueOBJ.lat, venueOBJ.long);

    //calculates distance between two points in km's
    let distance = (
      google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000
    ).toFixed(2);
    this.setState({
      distance
    });
  };

  componentDidMount() {
    this.setVenue();
  }

  setVenue() {
    const { venueOBJ } = this.state;
    let Coordinates = {
      latitude: venueOBJ.lat,
      longitude: venueOBJ.long
    };
    this.setState({ coords: Coordinates });
  }
}

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      center={{ lat: props.venueLat, lng: props.venueLong }}
    >
      {props.distance && (
        <InfoBox
          defaultPosition={
            new google.maps.LatLng(props.venueLat, props.venueLong)
          }
          options={{ closeBoxURL: ``, enableEventPropagation: true }}
        >
          <div
            style={{
              backgroundColor: `#00cceb`,
              opacity: 0.8,
              padding: `8px`
            }}
          >
            <Value value={props.distance} units="KM" />
          </div>
        </InfoBox>
      )}

      {props.beforeMarker && (
        <React.Fragment>
          <Marker position={{ lat: props.venueLat, lng: props.venueLong }} />
          <Marker position={{ lat: props.hisLat, lng: props.hisLong }} />
        </React.Fragment>
      )}

      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  ))
);

export default DateDirection;
