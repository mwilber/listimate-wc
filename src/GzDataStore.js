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
            if( !this.bindings.has(evt.detail.node) ){
                this.bindings.set(evt.detail.node, evt.detail.target);
                // console.log('map');
                // this.bindings.forEach((val, key)=>{
                //     console.log('key', key, 'val', val);
                // });
                this._refresh(evt.detail.target);
            }
        }.bind(this));

        document.addEventListener('GzDataUpdate', function(evt){
            try{
                let targetRef = this._resolve(evt.detail.target, this.dataStore );
                if(targetRef){
                    Object.assign(targetRef, evt.detail.payload)
                    // Copy the new dataStore to localStorage
                    if(window.localStorage) window.localStorage.setItem(this.dataStoreName, JSON.stringify(this.dataStore));

                    this._refresh(evt.detail.target);
                }
            }catch(e){
                console.error('GzDataStore error: '+e.message);
            }
            
        }.bind(this));

        document.addEventListener('GzDataRefresh', function(evt){
            //this._refresh();
        }.bind(this));
    }

    /*
     * Pass fresh data into all bound web components
     */
    _refresh(path){
        this.bindings.forEach((val, key)=>{
            if(val == path){
                let targetRef = this._resolve(val, this.dataStore );
                if(Array.isArray(targetRef)){
                    key.dataSet = Array.from(targetRef);
                }else if(targetRef instanceof Object){
                    key.dataSet = Object.assign({}, targetRef);
                }else{
                    key.dataSet = targetRef;
                }
            }
        });
    }

    /*
     * Return ref to dataStore property from path represented in string
     */
    _resolve(path, obj) {
        return path.split('.').reduce(function(prev, curr) {
            //Check for array notation
            let arrCk = curr.match(/([^\[]+)\[([^\]]+)/);
            if(arrCk){
                return prev ? prev[arrCk[1]][arrCk[2]] : null
            }else{
                return prev ? prev[curr] : null;
            }
        }, obj || self)
    }
}