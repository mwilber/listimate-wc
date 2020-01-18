import cssData from './list-items.css';
import { GzDataElement } from '../GzDataElement';

window.customElements.define('list-items', class extends GzDataElement {
  
  constructor(){
    super();

    this._dataSet = null;
  }

  deleteItem(itemIdx){
    let tmp = this._dataSet.filter(function(value, index, arr){
      //console.log("TCL: extends -> deleteItem -> value, index, arr", value, index, arr, itemIdx)
        
        return index != itemIdx;
      });
    console.log("TCL: extends -> deleteItem -> tmp", tmp)
    
    document.dispatchEvent(new CustomEvent('GzDataUpdate', {
      detail:{
        target: 'lists',
        payload: tmp
      }
    }));
  }
  
  render(){
    const dataBinding = this.getAttribute('databind');

    this.shadowRoot.innerHTML = `
      <style>
        ${cssData}
      </style>
      
      <h2>Items</h2>
      <input id="inp-add" placeholder="Item Name" />
      <button id="btn-add">Add</button>
      <gz-for>
        <template>
          <list-item databind="${dataBinding}"></list-item>
        </template>
      </gz-for>
    `;

    this.shadowRoot.querySelector('gz-for').dataSet = this._dataSet;

    let btnAdd = this.shadowRoot.getElementById('btn-add');
    btnAdd.addEventListener('click', (evt)=>{
      let inpName = this.shadowRoot.getElementById('inp-add');

      if(inpName.value){
        console.log('about to spread', this.dataSet);
        document.dispatchEvent(new CustomEvent('GzDataUpdate', {
          detail:{
              target: this.getAttribute('databind'),
              payload: [...this._dataSet, {name: inpName.value, number: Math.floor(Math.random()*100)}]
          }
        }));
        inpName.value = "";
      }
      
    });
  }
});