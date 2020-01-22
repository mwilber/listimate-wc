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
        this.shadowRoot.host.parentElement.parentElement.setAttribute('dataBind', '');
      }.bind(this));
    }
});