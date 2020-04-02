import { GzDataElement } from '../GzDataElement';

window.customElements.define('gz-bind', class extends GzDataElement {
  
    constructor(){
      super();
      console.log('gz-bind constructor')
    }

    get bindChild() {
      return this.getAttribute('bind-child');
    }
    set bindChild(newValue) {
      this.setAttribute('bind-child', newValue);
      this.render();
    }
    
    connectedCallback() {
      this.render();
    }
    
    render(){
      let bindChild = this.getAttribute('bind-child');
      this.shadowRoot.innerHTML = `
        <slot></slot>
      `;
      // Set child binding
      if(bindChild){
        let assignedNodes = this.shadowRoot.querySelector('slot').assignedNodes();
        
        let boundChild = null;
        if(assignedNodes.length){
          for(let node of assignedNodes){
            if(node.hasAttribute && node.hasAttribute('databind'))
              boundChild = node;
          }
        }
        if(boundChild){
          if(bindChild === "byref"){
            boundChild.setAttribute('databind', this.dataSet);
          }else if(bindChild === "byval"){
            boundChild.setAttribute('databind', this.getAttribute('databind'));
          }
        }
      }
    }
});