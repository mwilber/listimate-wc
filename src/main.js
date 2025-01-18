/**
 * Import PWA helper files
 * 
 * These file are optional. app-shell.css will not be packed into the js bundle and is linked 
 * separately in index.html. Use for initial styling to be displayed as JavaScripts load. serviceWorkerRegistration 
 * contains registration code for service-worker.js For more information on service workers and Progressive Web Apps 
 * check out the GreenZeta 10 minute PWA example at https://github.com/mwilber/gz-10-minute-pwa
 */ 
//import './serviceWorkerRegistration';

import { GzDataStoreFirebase } from './GzDataStoreFirebase';



// var userId = "";
// var dbRef = null;





// function saveData(){
//     dbRef.set({
//         var1: "my",
//         var2: "test",
//         var3: ['a','r','r','a','y']
//     });
// }

let dataStore = new GzDataStoreFirebase('listimate', {
    lists: [],
    state: {
        activeList: "",
        activeItem: ""
    }
});

window['dataStore'] = dataStore;