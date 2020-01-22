import cssData from './gz-if.css';
import { GzDataElement } from '../GzDataElement';

window.customElements.define('gz-if', class extends GzDataElement {
  
    constructor(){
      super();

      this.render();
    }

    get bindChild() {
      return this.getAttribute('bind-child');
    }
    set bindChild(newValue) {
      this.setAttribute('bind-child', newValue);
    }
    
    connectedCallback() {
      console.log('gz-if loaded');
    }
    
    render(){
      let bindChild = this.getAttribute('bind-child');
      let slotName = "else";
      if(this.dataSet) slotName = "then";
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <slot name="${slotName}"></slot>
      `;

      // Set child binding
      if(bindChild){
        let template = this.shadowRoot.querySelector('slot').assignedNodes()[0];
        let boundChild = null;
        if(template) boundChild = template.querySelector('*[databind]');
        if(boundChild){
          if(bindChild === "byref"){
            boundChild.setAttribute('dataBind', this.dataSet);
          }else if(bindChild === "byval"){
            boundChild.setAttribute('dataBind', this.getAttribute('databind'));
          }
        }
      }
    }
});