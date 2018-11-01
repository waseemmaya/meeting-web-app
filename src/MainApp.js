import React, { Component } from "react";
import LoginPage from "./Screens/LoginPage";
import NickName1 from "./Screens/NickName1";
import UploadImages2 from "./Screens/UploadImages2";
import Map4 from "./Screens/Map4";
import Dashboard5 from "./Screens/Dashboard5";
import AddMeeting from "./Screens/AddMeeting";
import Location from "./Screens/Location";
import Button from "grommet/components/Button";
import SelectBeverages from "./Screens/SelectBeverages3";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import swal from "sweetalert";
import fire from "./config/fire";

import { App, Heading, Box } from "grommet/components/..";

var provider = new fire.auth.FacebookAuthProvider();

class MainApp extends Component {
  constructor() {
    super();
    this.state = {
      userID: "",
      nickName: "",
      phone: "",
      imageNames: [],
      imglink1: "",
      imglink2: "",
      imglink3: "",
      beverages: [],
      duration: [],
      isAuth: false
    };
  }

  render() {
    return (
      <App>
        <Router>
          <div>
            <Box
              justify="center"
              align="center"
              wrap={true}
              pad="small"
              margin="none"
              colorIndex="light-1"
            >
              <Heading>
                <Link to="/">Meeting App</Link>
              </Heading>
              {this.state.isAuth && (
                <Button
                  label="Logout"
                  primary={true}
                  plain={false}
                  onClick={this.logout}
                />
              )}
              <br />
              {/* <Heading tag="h3">Powered By Grommet</Heading> */}
            </Box>
            <Route
              exact
              path="/"
              render={props => <LoginPage {...props} login={this.login} />}
            />
            <Route
              path="/NickName1"
              render={props => (
                <NickName1
                  {...props}
                  handleNickName={this.handleNickName}
                  handlePhone={this.handlePhone}
                />
              )}
            />
            <Route
              path="/UploadImages2"
              render={props => (
                <UploadImages2
                  {...props}
                  image1={this.image1}
                  image2={this.image2}
                  image3={this.image3}
                />
              )}
            />
            <Route
              path="/SelectBeverages"
              render={props => (
                <SelectBeverages
                  {...props}
                  checkBox1={this.checkBox1}
                  checkBox2={this.checkBox2}
                  checkBox3={this.checkBox3}
                  duration1={this.duration1}
                  duration2={this.duration2}
                  duration3={this.duration3}
                />
              )}
            />
            <Route
              path="/Map4"
              render={props => <Map4 {...props} submit={this.submit} />}
            />
            <Route
              path="/Dashboard5"
              render={props => <Dashboard5 {...props} submit={this.submit} />}
            />
            <Route
              path="/AddMeeting"
              render={props => <AddMeeting {...props} />}
            />
            <Route path="/Location" render={props => <Location {...props} />} />
          </div>
        </Router>
      </App>
    );
  }

  submit = () => {
    const {
      userID,
      nickName,
      phone,
      imageNames,
      imglink1,
      imglink2,
      imglink3,
      beverages,
      duration
    } = this.state;
    let dbRef = fire.database().ref(`UsersProfile/${userID}`);
    dbRef.set({
      nickName,
      userID,
      phone,
      imageNames,
      imglink1,
      imglink2,
      imglink3,
      beverages,
      duration
    });
    swal("Posted");
  };

  checkBox1 = e => {
    console.log(e.target.checked);

    var { beverages } = this.state;
    if (e.target.checked) {
      beverages[0] = e.target.value;
      this.setState({
        beverages
      });
    }

    if (!e.target.checked) {
      delete beverages[0];
      this.setState({
        beverages
      });
    }
  };

  checkBox2 = e => {
    console.log(e.target.checked);

    var { beverages } = this.state;
    if (e.target.checked) {
      beverages[1] = e.target.value;
      this.setState({
        beverages
      });
    }

    if (!e.target.checked) {
      delete beverages[1];
      this.setState({
        beverages
      });
    }
  };

  checkBox3 = e => {
    console.log(e.target.checked);

    var { beverages } = this.state;
    if (e.target.checked) {
      beverages[2] = e.target.value;
      this.setState({
        beverages
      });
    }

    if (!e.target.checked) {
      delete beverages[2];
      this.setState({
        beverages
      });
    }
  };

  duration1 = e => {
    console.log(e.target.checked);

    var { duration } = this.state;
    if (e.target.checked) {
      duration[0] = e.target.value;
      this.setState({
        duration
      });
    }

    if (!e.target.checked) {
      delete duration[0];
      this.setState({
        duration
      });
    }
  };

  duration2 = e => {
    console.log(e.target.checked);

    var { duration } = this.state;
    if (e.target.checked) {
      duration[1] = e.target.value;
      this.setState({
        duration
      });
    }

    if (!e.target.checked) {
      delete duration[1];
      this.setState({
        duration
      });
    }
  };

  duration3 = e => {
    console.log(e.target.checked);

    var { duration } = this.state;
    if (e.target.checked) {
      duration[2] = e.target.value;
      this.setState({
        duration
      });
    }

    if (!e.target.checked) {
      delete duration[2];
      this.setState({
        duration
      });
    }
  };

  logout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        console.log("sign out");
      })
      .catch(error => {});
  };

  login = (go, goMore) => {
    fire
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        var user = result.user;
        let id = user.uid;
        let userRef = fire.database().ref(`UsersProfile`);
        userRef.on("child_added", snap => {
          let key = snap.key;
          if (id === key) {
            goMore();
          } else {
            this.setState({
              userID: user.uid
            });
            go();
          }
        });
      })
      .catch(function(error) {});
  };

  image1 = e => {
    let img1 = e.target.files[0];
    var { imageNames, userID } = this.state;
    var filename = Math.floor(100444234000 + Math.random() * 9032012000);
    imageNames.push(filename);

    var metadata = {
      contentType: img1.type
    };
    var storageRef = fire.storage().ref();
    var uploadTask = storageRef
      .child(`ProfilePics/${userID}/${filename}`)
      .put(img1, metadata);
    uploadTask.on(
      "state_changed",
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function(error) {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log("File available at", downloadURL);
          this.setState({
            imglink1: downloadURL
          });
        });
      }
    );
  };

  image2 = e => {
    let img2 = e.target.files[0];
    var { imageNames, userID } = this.state;
    var filename = Math.floor(100444234000 + Math.random() * 9032012000);
    imageNames.push(filename);

    var metadata = {
      contentType: img2.type
    };
    var storageRef = fire.storage().ref();
    var uploadTask = storageRef
      .child(`ProfilePics/${userID}/${filename}`)
      .put(img2, metadata);
    uploadTask.on(
      "state_changed",
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function(error) {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log("File available at", downloadURL);
          this.setState({
            imglink2: downloadURL
          });
        });
      }
    );
  };

  image3 = e => {
    let img3 = e.target.files[0];
    var { imageNames, userID } = this.state;
    var filename = Math.floor(100444234000 + Math.random() * 9032012000);
    imageNames.push(filename);

    var metadata = {
      contentType: img3.type
    };
    var storageRef = fire.storage().ref();
    var uploadTask = storageRef
      .child(`ProfilePics/${userID}/${filename}`)
      .put(img3, metadata);
    uploadTask.on(
      "state_changed",
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function(error) {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log("File available at", downloadURL);
          this.setState({
            imglink3: downloadURL
          });
        });
      }
    );
  };

  componentDidMount() {
    this.isAUth();
  }

  isAUth = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isAuth: true
        });
      } else {
        this.setState({
          isAuth: false
        });
      }
    });
  };

  handleNickName = e => {
    this.setState({
      nickName: e.target.value
    });
  };

  handlePhone = e => {
    this.setState({
      phone: e.target.value
    });
  };
}

export default MainApp;
