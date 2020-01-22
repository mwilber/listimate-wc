import cssData from './gz-back.css';
import { GzDataElement } from '../GzDataElement';

window.customElements.define('gz-back', class extends GzDataElement {
  
    constructor(){
      super();
    }
    
    connectedCallback() {

    }
    
    render(){
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <strong>&lt;BACK</strong>
      `;
    }
});