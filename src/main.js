import { GzDataStore } from './GzDataStore';

let dataStore = new GzDataStore('listimate', {
    lists: []
});

window['dataStore'] = dataStore;