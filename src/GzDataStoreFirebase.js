// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { GzDataStore } from './GzDataStore';
import { firebaseConfig, firebaseUsername, firebasePassword } from './firebaseCredentials';


export class GzDataStoreFirebase extends GzDataStore{
    constructor(storeName, storeDefault){
        super(storeName, storeDefault);

        this.dbRef = null;
        this.userId = null;

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
        
                this.dbRef.on('value', this._setRemoteData.bind(this));
        
            } else {
                console.log('not logged in')
            }
        }.bind(this));
        
        firebase.auth().signInWithEmailAndPassword(firebaseUsername, firebasePassword).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('auth error', errorCode, errorMessage)
        });
    }

    _setRemoteData(snapshot) {
        console.log("TCL: GzDataStoreFirebase -> _setRemoteData -> snapshot", snapshot)
        
        if(snapshot.val()){
            this.dataStore = snapshot.val();
            if(window.localStorage) window.localStorage.setItem(this.dataStoreName, JSON.stringify(this.dataStore));
            this._refresh();
        }
    }

    _commitData(refreshTarget){
        if(window.localStorage) window.localStorage.setItem(this.dataStoreName, JSON.stringify(this.dataStore));
        // Refresh immediately after updating localstorage to update the UI
        this._refresh(refreshTarget);
        // Save out to firebase. This will trigger its own refresh from 'value' listener above
        this.dbRef.set(this.dataStore).then((result)=>{
            console.log('saved to firebase');
        }).catch((result)=>{
            console.error('firebase save faild', result);
        });
    }
}