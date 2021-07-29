import firebase from 'firebase';
import 'firebase/firestore'

firebase.initializeApp({
      apiKey: "AIzaSyAiARj5iIwd0UmsKCOz0y5HiS7y4FjRMzA",
      authDomain: "my-todo-app-3fc15.firebaseapp.com",
      projectId: "my-todo-app-3fc15",
      storageBucket: "my-todo-app-3fc15.appspot.com",
      messagingSenderId: "905244280848",
      appId: "1:905244280848:web:4d0d2e53b404c204452295",
      measurementId: "G-D3CZ2Y76G4"
});

const db = firebase.firestore();
export default db;
