import cssData from './gz-back.css';
import { GzDataElement } from '../GzDataElement';

window.customElements.define('gz-back', class extends GzDataElement {
  
    constructor(){
      super();
    }
    
    connectedCallback() {
      this.render();
      console.log('parent', this.shadowRoot.host.parentElement.parentElement);
    }
    
    render(){
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <strong>&lt;BACK</strong>
      `;

      this.shadowRoot.querySelector('strong').addEventListener('click', function(evt){
        // TODO: Clean this up, can't rely on consistent node depth
        let parentBinding = this.shadowRoot.host.parentElement.parentElement.getAttribute('dataBind');
        document.dispatchEvent(new CustomEvent('GzDataUpdate', {
          detail:{
              target: parentBinding,
              payload: ''
          }
        }));
      }.bind(this));
    }
});