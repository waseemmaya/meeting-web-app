import React, { Component } from "react";

import NickName from "./UserFormChild/NickName";
import Beverages from "./UserFormChild/Beverages";
import UploadImages from "./UserFormChild/UploadImages";
import Map from "./UserFormChild/Map";
import fire from "../MeetApp/config/fire";
import swal from "sweetalert";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNickName: true,
      isBeverages: false,
      isUploadImages: false,
      isMap: false,
      beverages: [],
      duration: [],
      nickName: "",
      phone: "",
      imgArr: [],
      coords: [],
      imageNames: [],
      imgLinks: [],
      uploading: false
    };
  }

  render() {
    const {
      isNickName,
      isBeverages,
      isUploadImages,
      isMap,
      uploading
    } = this.state;
    return (
      <div>
        {isNickName && (
          <NickName
            nickNext={this.nickNext}
            handleNickName={this.handleNickName}
            handlePhone={this.handlePhone}
          />
        )}
        {isBeverages && (
          <Beverages
            beveragesNext={this.beveragesNext}
            handleDuration={this.handleDuration}
            handleBeverages={this.handleBeverages}
          />
        )}
        {isUploadImages && (
          <UploadImages
            uploading={uploading}
            uploadImages={this.uploadImages}
            handleImages={this.handleImages}
          />
        )}
        {isMap && <Map submit={this.submit} />}
      </div>
    );
  }

  submit = coords => {
    let lat = coords.latitude;
    let long = coords.longitude;
    const {
      nickName,
      phone,
      imageNames,
      imgLinks,
      beverages,
      duration
    } = this.state;
    if (this.props.userID && this.props.userPic) {
      let userID = this.props.userID;
      let userPic = this.props.userPic;
      let dbRef = fire.database().ref(`Users/${userID}`);
      dbRef.set({
        nickName,
        userID,
        userPic,
        phone,
        lat,
        long,
        imageNames,
        imgLinks,
        beverages,
        duration
      });
      this.props.changeStatus();
      this.props.history.replace("/Dashboard");
    } else {
      console.log("error");
    }
  };

  uploadImages = () => {
    if (this.state.imgArr.length === 3) {
      this.setState({
        uploading: true
      });
      this.state.imgArr.map((val, i) => {
        var { imageNames, userID, imgLinks } = this.state;
        var filename = Math.floor(100444234000 + Math.random() * 9032012000);
        imageNames.push(filename);

        var metadata = {
          contentType: val.type
        };
        var storageRef = fire.storage().ref();
        var uploadTask = storageRef
          .child(`Pics/${userID}/${filename}`)
          .put(val, metadata);
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          function(error) {},
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log("File available at", downloadURL);
              imgLinks.push(downloadURL);
              if (i === 2) {
                this.setState({
                  isNickName: false,
                  isBeverages: false,
                  isUploadImages: false,
                  isMap: true
                });
              }
            });
          }
        );
        return true;
      });
    } else {
      swal("Select All 3 Images");
    }
  };

  handleImages = e => {
    const { imgArr } = this.state;
    imgArr.push(e.target.files[0]);
  };

  handleBeverages = e => {
    const { beverages } = this.state;
    let index;
    if (e.target.checked) {
      beverages.push(e.target.value);
    } else {
      index = beverages.indexOf(+e.target.value);
      beverages.splice(index, 1);
    }
    this.setState({ beverages });
  };

  handleDuration = e => {
    const { duration } = this.state;
    let index;
    if (e.target.checked) {
      duration.push(e.target.value);
    } else {
      index = duration.indexOf(+e.target.value);
      duration.splice(index, 1);
    }
    this.setState({ duration });
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

  nickNext = () => {
    if (this.state.nickName.length > 3 && this.state.phone.length > 4) {
      this.setState({
        isNickName: false,
        isBeverages: true
      });
    } else {
      swal("Fill out form");
    }
  };

  beveragesNext = () => {
    if (this.state.beverages.length > 0 && this.state.duration.length > 0) {
      this.setState({
        isNickName: false,
        isBeverages: false,
        isUploadImages: true
      });
    } else {
      swal("Check out neccessary out form");
    }
  };
}

export default UserForm;
