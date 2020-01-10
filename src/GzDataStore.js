export class GzDataStore{
    constructor(storeName, storeDefault){
        this.dataStore = storeDefault;
        // Restore from localStorage
        if(window.localStorage){
            let storedData = window.localStorage.getItem(storeName);
            if(storedData) this.dataStore = storedData;
        }
    }

    
}