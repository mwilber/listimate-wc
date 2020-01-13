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
      this.render();
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
      btnAdd.addEventListener('click', (evt)=>{
        let inpName = this.shadowRoot.getElementById('inp-add');

        if(inpName.value){
          document.dispatchEvent(new CustomEvent('GzDataUpdate', {
            detail:{
                target: 'lists',
                payload: [...this.dataSet, {name: inpName.value, number: Math.floor(Math.random()*100)}]
            }
          }));
          inpName.value = "";
        }
        
      });
    }
    
    render(){
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <input id="inp-add" placeholder="Item Name" />
        <button id="btn-add">Add</button>
        <gz-for>
          <template>
            <gz-list-item databind="lists"></gz-list-item>
          </template>
        </gz-for>
      `;

      this.shadowRoot.querySelector('gz-for').dataSet = this._dataSet;
    }
});