import { GzDataStore } from './GzDataStore';

let dataStore = new GzDataStore('listimate', {
    lists: []
});

let repeater = document.querySelector('gz-for');

// document.dispatchEvent(new CustomEvent('GzDataUpdate', {
//     detail:{
//         target: 'lists',
//         payload: ['one', {name: 'Walmart', total: 33.33, items: ['blah']}, 'three']
//     }
// }));