/* eslint-disable no-undef */
/* global google */
import React, { Component } from "react";
import Box from "grommet/components/Box";
import Location from "grommet/components/icons/base/Location";

import { Form, FormField, DateTime, Button } from "grommet";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  withScriptjs
} from "react-google-maps";

class DateDirection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {},
      date: "",
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
      isMarkerShown,
      targetLong
    } = this.state;
    console.log("directions", directions);

    // const { lat, long } = this.state;
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
            myLat={myLat}
            myLong={myLong}
            targetLat={targetLat}
            targetLong={targetLong}
            isMarkerShown={isMarkerShown}
            coords={coords}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzPdGNQeiKpaODVoQy6tjjzypqVXKNzWU&v=3.exp&libraries=geometry,drawing,places"
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
          <br />  <br />
          <br />  <br />
          <br />  <br />
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
            isMarkerShown: false
          });
        } else {
          alert("Sorry! Can't calculate directions!");
        }
      }
    );
  }

  componentDidMount() {
    this.setPosition();
  }

  setPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ coords: position.coords });
    });
  }

  updateCoords({ latitude, longitude }) {
    this.setState({ coords: { latitude, longitude } });
  }
}

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={14}
      center={{ lat: props.myLat, lng: props.myLong }}
    >
      <Marker position={{ lat: props.myLat, lng: props.myLong }} />
      <Marker position={{ lat: props.targetLat, lng: props.targetLong }} />

      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  ))
);

export default DateDirection;
