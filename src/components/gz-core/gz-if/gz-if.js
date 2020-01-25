import cssData from './gz-if.css';
import { GzDataElement } from '../GzDataElement';

window.customElements.define('gz-if', class extends GzDataElement {
  
    constructor(){
      super();

      this._dataSet = "";
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
      let slotName = this.getAttribute('always-render');
      if(!slotName) 
        if(this.dataSet) slotName = "then"; 
        else slotName = "else";

      this.classList.remove('then', 'else');
      if(this.dataSet) this.classList.add('then'); else this.classList.add('else');

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