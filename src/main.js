// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { GzDataStore } from './GzDataStore';

var firebaseConfig = {
    apiKey: "AIzaSyDMTmZp8ApiHFQRNwnHV_LlvQcPGKUFAb0",
    authDomain: "listimate.firebaseapp.com",
    databaseURL: "https://listimate.firebaseio.com",
    projectId: "listimate",
    storageBucket: "listimate.appspot.com",
    messagingSenderId: "564163854220",
    appId: "1:564163854220:web:770c201ecc2255ff2160a9"
};

var userId = "";
var dbRef = null;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log('logged in', email, uid)
        userId = uid;
        dbRef = firebase.database().ref(userId);

        dbRef.on('value', function(snapshot) {
            console.log("updated", snapshot.val());
        });

        saveData();

    } else {
        console.log('not logged in')
    }
});

firebase.auth().signInWithEmailAndPassword("matt@mwilber.com", "polloloco").catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('auth error', errorCode, errorMessage)
});

function saveData(){
    dbRef.set({
        var1: "my",
        var2: "test",
        var3: ['a','r','r','a','y']
    });
}

let dataStore = new GzDataStore('listimate', {
    lists: []
});

window['dataStore'] = dataStore;