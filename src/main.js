import { GzDataStore } from './GzDataStore';

let btnAdd = document.getElementById('btn-add');

let dataStore = new GzDataStore('listimate', {
    lists: ['blah']
});

let repeater = document.querySelector('gz-for');

btnAdd.addEventListener('click', (evt)=>{
    document.dispatchEvent(new CustomEvent('GzDataUpdate', {
        detail:{
            target: 'lists',
            payload: ['one', {name: 'Walmart', total: 33.33, items: ['blah']}, 'three']
        }
    }));
});

// document.dispatchEvent(new CustomEvent('GzDataUpdate', {
//     detail:{
//         target: 'lists',
//         payload: ['one', {name: 'Walmart', total: 33.33, items: ['blah']}, 'three']
//     }
// }));