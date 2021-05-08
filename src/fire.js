import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBXdi61VjjEI7g3BNl8mTgEMRTJ7x5Dc54",
    authDomain: "comp426-313100.firebaseapp.com",
    projectId: "comp426-313100",
    storageBucket: "comp426-313100.appspot.com",
    messagingSenderId: "894259329295",
    appId: "1:894259329295:web:c5519f5a3b2383b842e67a",
    measurementId: "G-EB4Y62BGRB"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;