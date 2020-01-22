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
      const {name, price, quantity} = this._dataSet;
      const elemClass = (price > 0 && quantity > 0)? 'checked' : '';

      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <h3 class="${elemClass}">${name} $${price}</h3>
      `;

      this.shadowRoot.querySelector('h3').addEventListener('click', function(evt){
        document.dispatchEvent(new CustomEvent('GzDataUpdate', {
          detail:{
              target: 'state.activeItem',
              payload: this.getAttribute('databind')
          }
        }));
        // TODO: Parse this out directly in the detail component
        document.querySelector('list-item-detail').setAttribute('idx', this.getAttribute('idx'));
      }.bind(this));
    }
});