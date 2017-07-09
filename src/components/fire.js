import firebase from 'firebase';

var config = {
	apiKey: "AIzaSyAu4ALOVQgCRxUUxR_nOJkRnzyexJD7OVc",
	authDomain: "test-ddf10.firebaseapp.com",
	databaseURL: "https://test-ddf10.firebaseio.com",
	projectId: "test-ddf10",
	storageBucket: "test-ddf10.appspot.com",
	messagingSenderId: "676156167175"
};

var fire = firebase.initializeApp(config);


export default fire;