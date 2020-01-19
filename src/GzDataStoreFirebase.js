// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { GzDataStore } from './GzDataStore';

export class GzDataStoreFirebase extends GzDataStore{
    constructor(storeName, storeDefault){
        super(storeName, storeDefault);

        this.dbRef = null;
        this.userId = null;

        var firebaseConfig = {
            apiKey: "AIzaSyDMTmZp8ApiHFQRNwnHV_LlvQcPGKUFAb0",
            authDomain: "listimate.firebaseapp.com",
            databaseURL: "https://listimate.firebaseio.com",
            projectId: "listimate",
            storageBucket: "listimate.appspot.com",
            messagingSenderId: "564163854220",
            appId: "1:564163854220:web:770c201ecc2255ff2160a9"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                let displayName = user.displayName;
                let email = user.email;
                let emailVerified = user.emailVerified;
                let photoURL = user.photoURL;
                let isAnonymous = user.isAnonymous;
                let uid = user.uid;
                let providerData = user.providerData;
                console.log('logged in', email, uid)
                this.userId = uid;
                this.dbRef = firebase.database().ref(this.userId);
        
                this.dbRef.on('value', function(snapshot) {
                    if(snapshot.val()){
                        this.dataStore = snapshot.val();
                        if(window.localStorage) window.localStorage.setItem(this.dataStoreName, JSON.stringify(this.dataStore));
                        this._refresh();
                    }
                }.bind(this));
        
            } else {
                console.log('not logged in')
            }
        }.bind(this));
        
        firebase.auth().signInWithEmailAndPassword("matt@mwilber.com", "polloloco").catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('auth error', errorCode, errorMessage)
        });
    }

    _commitData(refreshTarget){
        if(window.localStorage) window.localStorage.setItem(this.dataStoreName, JSON.stringify(this.dataStore));

        this.dbRef.set(this.dataStore).then((result)=>{
            console.log('saved to firebase');
        }).catch((result)=>{
            console.error('firebase save faild', result);
        });

        this._refresh(refreshTarget);
    }
}