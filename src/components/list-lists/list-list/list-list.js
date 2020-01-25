import cssData from './list-list.css';
import { GzDataElement } from '../../gz-core/GzDataElement';

window.customElements.define('list-list', class extends GzDataElement {
  
  constructor(){
    super();

    this._dataSet = {
      name:'', 
      number: ''
    };
  }
  
  render(){
    const {name, number} = this._dataSet;

    this.shadowRoot.innerHTML = `
      <style>
        ${cssData}
      </style>
      
      <div class="list-item">
        ${name}
        <button class="delete">&#10006;</button>
      </div>
    `;

    this.shadowRoot.querySelector('.list-item').addEventListener('click', function(evt){
      this.DataUpdate('state.activeList', this.getAttribute('databind'));
      this.DataUpdate('state.activeMenu', '');
    }.bind(this));

    this.shadowRoot.querySelector('.delete').addEventListener('click', function(evt){
      document.querySelector('list-lists').deleteItem(parseInt(this.getAttribute('idx')));
    }.bind(this));
  }
});