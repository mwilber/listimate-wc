import cssData from './gz-toggle.css';
import { GzDataElement } from '../GzDataElement';

window.customElements.define('gz-toggle', class extends GzDataElement {
  
    constructor(){
      super();

    }
    
    connectedCallback() {
      this.render();
    }
    
    render(){
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <slot></slot>
      `;

      this.shadowRoot.querySelector('slot').addEventListener('click', function(evt){
        let toggledVal = this.getAttribute('toggled-value');
        if(this._dataSet === toggledVal){
          toggledVal = '';
        }
        document.dispatchEvent(new CustomEvent('GzDataUpdate', {
          detail:{
              target: this.getAttribute('databind'),
              payload: toggledVal
          }
        }));
      }.bind(this));
    }
});