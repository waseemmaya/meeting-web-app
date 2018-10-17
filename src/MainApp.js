import React, { Component } from "react";
import LoginPage from "./Screens/LoginPage";
import NickName1 from "./Screens/NickName1";
import UploadImages2 from "./Screens/UploadImages2";
import SelectBeverages from "./Screens/SelectBeverages3";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import swal from "sweetalert";
import fire from "./config/fire";

import { App, Heading,Box } from "grommet/components/..";

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
      imglink3: ""
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
                <Link to="/">Main App</Link>
              </Heading>
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
                  image1={this.image1}
                  image2={this.image2}
                  image3={this.image3}
                />
              )}
            />
          </div>
        </Router>
      </App>
    );
  }

  login = go => {
    fire
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        var user = result.user;
        console.log("user", user.uid);
        swal("Logged in successfully");
        this.setState({
          userID: user.uid
        });
        go();
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
