import cssData from './gz-list.css';

window.customElements.define('gz-list', class extends HTMLElement {
  
    constructor(){
      super();

      this._dataSet = null;

      let shadowRoot = this.attachShadow({mode: 'open'});
      this.render();
    }

    get dataSet() {
      return this._dataSet;
    }
    
    set dataSet(newValue) {
      this._dataSet = newValue;
    }
    
    connectedCallback() {
      console.log('gz-list loaded');
      if(this.getAttribute('dataBind')){
        document.dispatchEvent(new CustomEvent('GzDataBind', {
          detail:{
              node: this,
              target: this.getAttribute('dataBind')
          }
        }));
      }

      let btnAdd = this.shadowRoot.getElementById('btn-add');
      console.log("TCL: extends -> connectedCallback -> btnAdd", btnAdd)
      btnAdd.addEventListener('click', (evt)=>{
        console.log('add item');
        let inpName = this.shadowRoot.getElementById('inp-add');

        if(inpName.value){
          document.dispatchEvent(new CustomEvent('GzDataUpdate', {
            detail:{
                target: 'lists',
                payload: [...this.dataSet, inpName.value]
            }
          }));
          inpName.value = "";
        }
        
      });

      // Load existing data from the datastore
      document.dispatchEvent(new CustomEvent('GzDataRefresh', {}));
    }
    
    render(){
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <input id="inp-add" placeholder="Item Name" />
        <button id="btn-add">Add</button>
        <gz-for dataBind="${this.getAttribute('dataBind')}">
          <template>
            <h1>{name}</h1>
          </template>
        </gz-for>
      `;
    }
});