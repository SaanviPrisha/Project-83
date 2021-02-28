import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyCZcpqhPwZZ0wMyiyVaNYvXsZnciYbwE8c",
  authDomain: "barterapp-99e33.firebaseapp.com",
  projectId: "barterapp-99e33",
  storageBucket: "barterapp-99e33.appspot.com",
  messagingSenderId: "1058170461472",
  appId: "1:1058170461472:web:2673ba0f7104f4dc7f8b45"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore()