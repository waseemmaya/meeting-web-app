import React, { Component } from "react";
import { Box, Button } from "grommet/components/..";
import Location from "grommet/components/icons/base/Location";
import Pulse from "grommet/components/icons/Pulse";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coord: null
    };
  }
  render() {
    const { coords } = this.state;
    console.log(coords);

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
          <h1>Select Your Location</h1>
        </Box>
        <div>
          {coords && (
            <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?libraries=geometry&sensor=false&key=AIzaSyAv82eqKbZOaEU4RyRYOFBs0Tz7tlOEM4Y"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              coords={coords}
              updateCoords={this.updateCoords}
            />
          )}
        </div>
        <Box
          justify="start"
          align="center"
          wrap={true}
          pad="medium"
          margin="small"
          colorIndex="light-1"
        >
          <p>Get Current Location</p>
          <Pulse icon={<Location />} onClick={() => this.setPosition()} />
          <br />
          <Button
            label="Submit"
            primary={true}
            plain={false}
            type="submit"
            onClick={() => this.props.submit(this.state.coords)}
          />
        </Box>
      </div>
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

  updateCoords = ({ latitude, longitude }) => {
    this.setState({ coords: { latitude, longitude } });
  };
}

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={14}
      center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
      {props.isMarkerShown && (
        <Marker
          position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
          draggable={true}
          onDragEnd={position => {
            props.updateCoords({
              latitude: position.latLng.lat(),
              longitude: position.latLng.lng()
            });
          }}
        />
      )}
    </GoogleMap>
  ))
);

export default Map;
