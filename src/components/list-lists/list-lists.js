import cssData from './list-lists.css';
import { GzDataElement } from '../gz-core/GzDataElement';

window.customElements.define('list-lists', class extends GzDataElement {
  
    constructor(){
      super();

      this._dataSet = null;
    }

    deleteItem(itemIdx){
      let tmp = this._dataSet.filter(function(value, index, arr){
        //console.log("TCL: extends -> deleteItem -> value, index, arr", value, index, arr, itemIdx)
          
          return index != itemIdx;
        });
      //console.log("TCL: extends -> deleteItem -> tmp", tmp)
      
      document.dispatchEvent(new CustomEvent('GzDataUpdate', {
        detail:{
          target: this.getAttribute('databind'),
          payload: tmp
        }
      }));
    }
    
    render(){
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <div class="input-group">
          <input id="inp-add" placeholder="List Name" />
          <div id="btn-add">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
          </div>
        </div>
        <gz-for>
          <template>
            <list-list databind="lists"></list-list>
          </template>
        </gz-for>
      `;

      this.shadowRoot.querySelector('gz-for').dataSet = this._dataSet;

      let btnAdd = this.shadowRoot.getElementById('btn-add');
      btnAdd.addEventListener('click', (evt)=>{
        let inpName = this.shadowRoot.getElementById('inp-add');

        if(inpName.value){
          document.dispatchEvent(new CustomEvent('GzDataUpdate', {
            detail:{
                target: this.getAttribute('databind'),
                payload: [...this._dataSet, {name: inpName.value, number: 0, items: []}]
            }
          }));
          inpName.value = "";
        }
        
      });
    }
});