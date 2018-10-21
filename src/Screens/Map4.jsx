import React, { Component } from "react";
import { Button } from "grommet/components/..";
// {withRouter}"react-router-dom"

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

var lat = 0;
var long = 0;
const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: lat, lng: long }}>
      {props.isMarkerShown && <Marker position={{ lat: lat, lng: long }} />}
    </GoogleMap>
  ))
);

class Map4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      long: ""
    };
  }
  render() {
    // this.props.history.push("url");
    return (
      <div>
        <h1>Map</h1>
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <br />
        <Button
          label="Submit"
          primary={true}
          plain={false}
          type="submit"
          onClick={this.props.submit}
        />
      </div>
    );
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      success => {
        var crd = success.coords;
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        lat = crd.latitude;
        long = crd.longitude;
      },
      err => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
    );
  }
}

export default Map4;
// export default withRouter(Map4);
