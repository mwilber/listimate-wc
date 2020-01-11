export class GzDataStore{
    constructor(storeName, storeDefault){
        this.bindings = new Map();
        this.dataStoreName = storeName;
        this.dataStore = storeDefault;
        // Restore from localStorage
        if(window.localStorage){
            let storedData = window.localStorage.getItem(storeName);
            if(storedData) this.dataStore = JSON.parse(storedData);
        }

        // Set up event listeners
        document.addEventListener('GzDataBind', function(evt){
            this.bindings.set(evt.detail.node, evt.detail.target);
            console.log('map');
            this.bindings.forEach((val, key)=>{
                console.log('key', key, 'val', val);
            });
        }.bind(this));

        document.addEventListener('GzDataUpdate', function(evt){
            try{
                let targetRef = this._resolve(evt.detail.target, this.dataStore ) //eval('this.dataStore.'+evt.detail.target);
                if(targetRef){
                    Object.assign(targetRef, evt.detail.payload)
                    // Copy the new dataStore to localStorage
                    if(window.localStorage) window.localStorage.setItem(this.dataStoreName, JSON.stringify(this.dataStore));

                    this._refresh();
                }
            }catch(e){
                console.error('GzDataStore error: '+e.message);
            }
            
        }.bind(this));
    }

    /*
     * Pass fresh data into all bound web components
     */
    _refresh(){
        this.bindings.forEach((val, key)=>{
            let targetRef = this._resolve(val, this.dataStore );
            if(Array.isArray(targetRef)){
                key.dataSet = Array.from(targetRef);
            }else if(targetRef instanceof Object){
                key.dataStore = Object.create(targetRef);
            }else{
                key.dataStore = targetRef;
            }
        });
    }

    /*
     * Return ref to dataStore property from path represented in string
     */
    _resolve(path, obj) {
        return path.split('.').reduce(function(prev, curr) {
            return prev ? prev[curr] : null
        }, obj || self)
    }
}