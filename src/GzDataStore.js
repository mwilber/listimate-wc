export class GzDataStore{
    constructor(storeName, storeDefault){
        this.dataStoreName = storeName;
        this.dataStore = storeDefault;
        // Restore from localStorage
        if(window.localStorage){
            let storedData = window.localStorage.getItem(storeName);
            if(storedData) this.dataStore = JSON.parse(storedData);
        }

        // Set up event listeners
        document.addEventListener('GzDataBind', function(evt){

        }.bind(this));

        document.addEventListener('GzDataUpdate', function(evt){
            console.log("TCL: GzDataStore -> constructor -> this.dataStore", this.dataStore)
            try{
                let targetRef = this._resolve(evt.detail.target, this.dataStore ) //eval('this.dataStore.'+evt.detail.target);
                if(targetRef){
                    Object.assign(targetRef, evt.detail.payload)
                    // Copy the new dataStore to localStorage
                    if(window.localStorage) window.localStorage.setItem(this.dataStoreName, JSON.stringify(this.dataStore));
                }
            }catch(e){
                console.error('GzDataStore error: '+e.message);
            }
            
        }.bind(this));
    }

    _resolve(path, obj) {
        return path.split('.').reduce(function(prev, curr) {
            return prev ? prev[curr] : null
        }, obj || self)
    }
}