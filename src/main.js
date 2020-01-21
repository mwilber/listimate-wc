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