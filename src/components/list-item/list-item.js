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
      `;

      this.shadowRoot.querySelector('h2').addEventListener('click', function(evt){
        document.querySelector('list-item-detail').setAttribute('dataBind', this.getAttribute('databind'));
        document.querySelector('list-item-detail').setAttribute('idx', this.getAttribute('idx'));
      }.bind(this));
    }
});