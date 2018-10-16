import React, { Component } from "react";
import LoginPage from "./Screens/LoginPage";
import NickName1 from "./Screens/NickName1";
import UploadImages2 from "./Screens/UploadImages2";

import swal from "sweetalert";
import fire from "./config/fire";

import { App, Heading } from "grommet/components/..";
import Next from "grommet/components/icons/base/Next";

var provider = new fire.auth.FacebookAuthProvider();

class MainApp extends Component {
  constructor() {
    super();
    this.state = {
      renderLogin: true,
      renderNick: false,
      uploadImages: false,
      nickName: "",
      phone: "",
      imglink1: "",
      userID : '',
      imglink2: "",
      imglink3: "",
      imageNames: []
    };
  }
  render() {
    const { renderLogin, renderNick, uploadImages } = this.state;
    return (
      <App>
        <Heading>Main App</Heading>
        { <LoginPage login={this.login} />}
        { (
            <NickName1
              next1={this.next1}
              handleNickName={this.handleNickName}
              handlePhone={this.handlePhone}
            />
          )}
        {
          <UploadImages2
            image1={this.image1}
            image2={this.image2}
            image3={this.image3}
            next2={this.next2}
          />
        }
      </App>
    );
  }

  image1 = e => {
    console.log("img1", e[0]);
    let img1 = e[0];
    var { imageNames,userID } = this.state;
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
    console.log("img2", e[0]);
    let img2 = e[0];
    var { imageNames,userID } = this.state;
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
    let img3 = e[0];
    console.log("img3", e[0]);
    var { imageNames,userID } = this.state;
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
    console.log("name", e.target.value);
    this.setState({
      nickName: e.target.value
    });
  };

  handlePhone = e => {
    console.log("phone", e.target.value);
    this.setState({
      phone: e.target.value
    });
  };

  next1 = () => {
    this.setState({
      renderNick: false,
      uploadImages: true
    });
  };

  next2 = () => {
    this.setState({
      renderNick: false,
      uploadImages: true
    });
  };

  login = () => {
    console.log("login Chala");
    fire
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log('user',user.uid);
        swal("Logged in successfully");
        this.setState({
          userID : user.uid,
          renderLogin: false,
          renderNick: true
        });
        console.log("state", this.state);
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  };
}

export default MainApp;
