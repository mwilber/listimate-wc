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
            // console.log('map');
            // this.bindings.forEach((val, key)=>{
            //     console.log('key', key, 'val', val);
            // });
            this._refresh(evt.detail.target);
        }.bind(this));

        document.addEventListener('GzDataUnBind', function(evt){
            this.bindings.delete(evt.detail.node);
        }.bind(this));

        document.addEventListener('GzDataUpdate', function(evt){
            try{
                let targetPath = evt.detail.target.split('.');
                let targetRef = this.dataStore;
                // Get a reference var to the parent of the target
                for(let idx=0; idx<(targetPath.length-1); idx++){

                    let arrCk = targetPath[idx].match(/([^\[]+)\[([^\]]+)/);
                    if(arrCk){
                        targetRef = targetRef[arrCk[1]][arrCk[2]];
                    }else{
                        targetRef = targetRef[targetPath[idx]];
                    }

                    
                }
                // Replace the target with the payload
                targetRef[targetPath[targetPath.length-1]] = evt.detail.payload;
                
                this._commitData(evt.detail.target);
                
            }catch(e){
                console.error('GzDataStore error: '+e.message);
            }
            
        }.bind(this));

        document.addEventListener('GzDataRefresh', function(evt){
            //this._refresh();
        }.bind(this));
    }

    _commitData(refreshTarget){
        console.log('GZDataStore');
        if(window.localStorage) window.localStorage.setItem(this.dataStoreName, JSON.stringify(this.dataStore));

        this._refresh(refreshTarget);
    }

    /*
     * Pass fresh data into all bound web components
     */
    _refresh(path){
    console.log("TCL: GzDataStore -> _refresh -> path", path)
        this.bindings.forEach((val, key)=>{
            //console.log('key', key.dataSet);
            if(val == path || !path){
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