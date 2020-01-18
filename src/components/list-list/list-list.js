import cssData from './list-list.css';
import { GzDataElement } from '../GzDataElement';

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
      
      <h2>name: ${name}</h2>
      <button class="delete">&#10060;</button>
    `;

    this.shadowRoot.querySelector('h2').addEventListener('click', function(evt){
      // Set list-items binding here
      document.querySelector('list-items').setAttribute('dataBind', this.getAttribute('databind')+'.items');
    }.bind(this));

    this.shadowRoot.querySelector('.delete').addEventListener('click', function(evt){
      document.querySelector('list-lists').deleteItem(parseInt(this.getAttribute('idx')));
    }.bind(this));
  }
});