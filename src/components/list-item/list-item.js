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
      const {name, price} = this._dataSet;

      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <h3>${name} $${price}</h3>
      `;

      this.shadowRoot.querySelector('h3').addEventListener('click', function(evt){
        document.querySelector('list-item-detail').setAttribute('dataBind', this.getAttribute('databind'));
        document.querySelector('list-item-detail').setAttribute('idx', this.getAttribute('idx'));
      }.bind(this));
    }
});