import { GzDataStore } from './GzDataStore';

let dataStore = new GzDataStore('listimate', {
    lists: []
});

let repeater = document.querySelector('gz-for');