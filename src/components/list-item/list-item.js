import cssData from './list-item.css';
import { GzDataElement } from '../GzDataElement';

window.customElements.define('list-item', class extends GzDataElement {
  
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
        document.querySelector('list-item-detail').setAttribute('dataBind', this.getAttribute('databind'));
      }.bind(this));

      this.shadowRoot.querySelector('.delete').addEventListener('click', function(evt){
        document.querySelector('list-items').deleteItem(parseInt(this.getAttribute('idx')));
      }.bind(this));
    }
});