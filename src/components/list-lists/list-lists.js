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
        
        <h2>Lists</h2>
        <input id="inp-add" placeholder="List Name" />
        <button id="btn-add">Add</button>
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