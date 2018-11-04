import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyBiLwl_IO5Umlu74zrzhz9kx9IayOIb1og",
  authDomain: "meeting-web-app.firebaseapp.com",
  databaseURL: "https://meeting-web-app.firebaseio.com",
  projectId: "meeting-web-app",
  storageBucket: "meeting-web-app.appspot.com",
  messagingSenderId: "311552917597"
};
firebase.initializeApp(config);

export default firebase;
