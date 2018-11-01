import React, { Component } from "react";
import { Button, List, ListItem, Search, Box } from "grommet";

import fire from "../config/fire";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: null,
      loaded: false,
      beveragesArr: null,
      nearBy: null,
      searchResult: [],
      showSearch: false
    };
  }
  render() {
    const { loaded, showSearch } = this.state;

    return (
      <div>
        <div>
          {this.SearchUI()}
          {showSearch && this.renderSearch()}
          {loaded && (
            <div>
              <List>
                {this.state.nearBy.map((val, i) => {
                  return (
                    <ListItem justify="between" key={i} separator="horizontal">
                      <span>{val.venue.name}</span>
                      <span className="secondary">
                        {val.venue.location.address}
                        {val.venue.location.crossStreet}
                        <span style={{ marginLeft: 14 }}>
                          <Button
                            label="Select"
                            primary={true}
                            plain={false}
                            type="submit"
                            onClick={() =>
                              this.handleLocation(
                                val.venue.name,
                                val.venue.location.address,
                                val.venue.location.crossStreet,
                                val.venue.location.lat,
                                val.venue.location.lng
                              )
                            }
                          />
                        </span>
                      </span>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          )}
        </div>
      </div>
    );
  }

  renderSearch = () => {
    return (
      <div>
        <h1>Searching</h1>
        <div>
          <List>
            {this.state.searchResult.map((val, i) => {
              return (
                <ListItem justify="between" key={i} separator="horizontal">
                  <span>{val.venue.name}</span>
                  <span className="secondary">
                    {val.venue.location.address}
                    {val.venue.location.crossStreet}
                    <span style={{ marginLeft: 14 }}>
                      <Button
                        label="Select"
                        primary={true}
                        plain={false}
                        type="submit"
                        onClick={() =>
                          this.handleLocation(
                            val.venue.name,
                            val.venue.location.address,
                            val.venue.location.crossStreet,
                            val.venue.location.lat,
                            val.venue.location.lng
                          )
                        }
                      />
                    </span>
                  </span>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    );
  };

  handleLocation = (name, location, crossStreet, lat, long) => {};

  SearchUI = () => {
    return (
      <div>
        <Box
          justify="center"
          align="center"
          wrap={true}
          pad="small"
          margin="none"
          colorIndex="light-1"
        >
          <h1>Select Location</h1>

          <Search
            placeHolder="Search"
            inline={true}
            onDOMChange={this.handeleSearch}
          />
        </Box>
      </div>
    );
  };

  componentDidMount() {
    this.getData();
  }

  fourSquare = () => {
    let client_id = "ES4PK425E5FW4JM5MKTCWBHL31XGER1LM5MMTOIQ3OQHW30F";
    let client_secret = "3HSB3BMHL3FMOFB4BKNA4JA4JU3JO44WH5NMB5FBVM50S31L";

    let url = `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=5&ll=${
      this.state.arr[0].lat
    },${this.state.arr[0].long}&query=${this.state.beveragesArr[1]}`;

    fetch(url)
      .then(res => {
        return res.json().then(val => {
          let nearBy = val.response.groups[0].items;
          this.setState({
            nearBy: nearBy,
            loaded: true
          });
        });
      })
      .catch(function() {
        // Code for handling errors
      });
  };

  getData = () => {
    let myId = localStorage.getItem("key");

    let myCordRef = fire.database().ref(`UsersProfile/${myId}`);
    myCordRef
      .once("value")
      .then(snap => {
        const arr = [];
        arr.push({
          id: snap.key,
          ...snap.val()
        });
        this.setState({
          arr
        });
      })
      .then(v => {
        const { beverages } = this.state.arr[0];

        let beveragesArr = [];

        beverages.map(val => {
          return beveragesArr.push(val);
        });

        this.setState({
          beveragesArr
        });

        this.fourSquare();
      });
  };

  renderLocation() {
    return <div />;
  }

  handeleSearch = e => {
    if (e.target.value.length === 0) {
      this.setState({
        loaded: true,
        showSearch: false
      });
    } else {
      this.setState({
        loaded: false,
        showSearch: true
      });
    }
    let client_id = "ES4PK425E5FW4JM5MKTCWBHL31XGER1LM5MMTOIQ3OQHW30F";
    let client_secret = "3HSB3BMHL3FMOFB4BKNA4JA4JU3JO44WH5NMB5FBVM50S31L";

    let url = `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=5&ll=${
      this.state.arr[0].lat
    },${this.state.arr[0].long}&query=${e.target.value}`;

    fetch(url)
      .then(res => {
        return res.json().then(val => {
          let searchResult = val.response.groups[0].items;
          this.setState({
            searchResult: searchResult
          });
        });
      })
      .catch(function() {
        // Code for handling errors
      });
  };
}

export default Location;
