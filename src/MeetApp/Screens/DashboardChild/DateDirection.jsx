import React, { Component } from "react";
import Box from "grommet/components/Box";

import { Form, FormField, DateTime, Button } from "grommet";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  withScriptjs
} from "react-google-maps";
const google = window.google;
class DateDirection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {},
      date: "",
      showDate: true,
      myLat: 24.97185,
      myLong: 67.0714,
      targetLat: this.props.location.state.lat,
      targetLong: this.props.location.state.long
    };
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
          <Button
            label="Next"
            primary={true}
            plain={false}
            type="Submit"
            onClick={this.red}
          />
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
    const { coords, directions } = this.state;
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
            isMarkerShown
            coords={coords}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzPdGNQeiKpaODVoQy6tjjzypqVXKNzWU&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `600px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            directions={directions}
          />

          <button onClick={this.getDirections}>
            <h1>Get Directions</h1>
          </button>
        </div>
      </div>
    );
  };

  getDirections = () => {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(24.8812296, 67.0727269),
        destination: new google.maps.LatLng(24.8861479, 67.0595196),
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          alert("Sorry! Can't calculate directions!");
        }
      }
    );
  };
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
    <GoogleMap defaultZoom={14} center={{ lat: 24.8812296, lng: 67.0727269 }}>
      <Marker position={{ lat: 24.8812296, lng: 67.0727269 }} />
      <Marker position={{ lat: 24.8861479, lng: 67.0595196 }} />

      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  ))
);

export default DateDirection;
