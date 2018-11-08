import React, { Component } from "react";
import { Button, List, ListItem, Search, Box } from "grommet";

class NearByLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      nearBy: null,
      searchResult: [],
      showSearch: false,
      hisOBJ: this.props.location.state.hisOBJ,
      myOBJ: this.props.location.state.myOBJ
    };
  }
  render() {
    const { loaded, showSearch, hisOBJ } = this.state;
    console.log("hahahaha", hisOBJ);

    return (
      <div>
        <div>
          {this.SearchUI()}
          {showSearch && this.renderSearch()}
          {loaded && (
            <div>
              <div>
                <Box
                  justify="center"
                  align="center"
                  wrap={true}
                  pad="small"
                  margin="none"
                  colorIndex="light-1"
                >
                  <h2>Nearby Locations</h2>
                </Box>
              </div>
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
        {this.state.searchResult.length > 0 ? (
          <h1>Search Results</h1>
        ) : (
          <h1>No Result Found</h1>
        )}
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

  handleLocation = (venue, lat, long) => {
    const { hisOBJ, myOBJ } = this.state;

    let venueOBJ = {
      venue: venue,
      lat: lat,
      long: long
    };

    this.props.history.push({
      pathname: "/DateDirection",
      state: {
        hisOBJ: hisOBJ,
        myOBJ: myOBJ,
        venueOBJ: venueOBJ
      }
    });
  };

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
    this.fourSquare();
  }

  fourSquare = () => {
    const { hisOBJ } = this.state;

    let client_id = "ES4PK425E5FW4JM5MKTCWBHL31XGER1LM5MMTOIQ3OQHW30F";
    let client_secret = "3HSB3BMHL3FMOFB4BKNA4JA4JU3JO44WH5NMB5FBVM50S31L";
    let url = `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=5&ll=${
      hisOBJ.lat
    },${hisOBJ.long}&query=${hisOBJ.beverages[0]}`;

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

  handeleSearch = e => {
    const { hisOBJ } = this.state;

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
      hisOBJ.lat
    },${hisOBJ.long}&query=${e.target.value}`;

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

export default NearByLocations;
