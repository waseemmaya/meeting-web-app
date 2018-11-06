/* eslint-disable no-undef */
/* global google */
import React, { Component } from "react";
import Box from "grommet/components/Box";
import Location from "grommet/components/icons/base/Location";

import { Form, FormField, DateTime, Button, Value, Tip } from "grommet";
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
      coords: {},
      date: "",
      beforeMarker: true,
      distance: "",
      showDate: true,
      isMarkerShown: true,
      myLat: this.props.location.state.myLat,
      myLong: this.props.location.state.myLong,
      targetLat: this.props.location.state.lat,
      targetLong: this.props.location.state.long
    };
    this.getDirections = this.getDirections.bind(this);
  }
  render() {
    return (
      <div>
        <div>
          <Box justify="start" align="center" colorIndex="light-1">
            {/* <h1>Date</h1> */}
            <p>{this.state.date}</p>
          </Box>
        </div>
        {this.state.showDate && this.renderDate()}
        {!this.state.showDate && this.renderDirection()}
      </div>
    );
  }

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
  };

  renderDirection = () => {
    const {
      coords,
      directions,
      myLat,
      myLong,
      targetLat,
      beforeMarker,
      targetLong,
      isMarkerShown,
      distance
    } = this.state;

    return (
      <div>
        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="medium"
          margin="small"
          colorIndex="light-1"
        />
        <div>
          <MyMapComponent
            distance={distance}
            myLat={myLat}
            myLong={myLong}
            targetLat={targetLat}
            targetLong={targetLong}
            beforeMarker={beforeMarker}
            isMarkerShown={isMarkerShown}
            coords={coords}
            googleMapURL="https://maps.googleapis.com/maps/api/js?libraries=geometry&sensor=false&key=AIzaSyAv82eqKbZOaEU4RyRYOFBs0Tz7tlOEM4Y"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `600px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            directions={directions}
          />
          <br />
          <br />
          <Button
            icon={<Location />}
            label="Get Directions"
            onClick={this.getDirections}
            primary={true}
          />
          <br />
          <br /> <br />
          <br /> <br />
          <br /> <br />
          <br />
        </div>
      </div>
    );
  };

  getDirections() {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(this.state.myLat, this.state.myLong),
        destination: new google.maps.LatLng(
          this.state.targetLat,
          this.state.targetLong
        ),
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log("result", result);

          this.setState({
            directions: result,
            beforeMarker: false
          });
        } else {
          console.log("Sorry! Can't calculate directions!");
        }
      }
    );

    var p1 = new google.maps.LatLng(this.state.myLat, this.state.myLong);
    var p2 = new google.maps.LatLng(
      this.state.targetLat,
      this.state.targetLong
    );

    //calculates distance between two points in km's
    let distance = (
      google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000
    ).toFixed(2);
    console.log("distance===>", distance);

    this.setState({
      distance
    });
  }

  componentDidMount() {
    this.setPosition();
  }

  setPosition() {
    let Coordinates = {
      latitude: this.state.targetLat,
      longitude: this.state.targetLong
    };
    this.setState({ coords: Coordinates });
  }
}

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      center={{ lat: props.targetLat, lng: props.targetLong }}
    >
      {props.distance && (
        <InfoBox
          defaultPosition={
            new google.maps.LatLng(props.targetLat, props.targetLong)
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
          <Marker position={{ lat: props.myLat, lng: props.myLong }} />
          <Marker position={{ lat: props.targetLat, lng: props.targetLong }} />
        </React.Fragment>
      )}

      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  ))
);

export default DateDirection;
