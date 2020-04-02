import { GzDataElement } from '../GzDataElement';

window.customElements.define('gz-label', class extends GzDataElement {
  
    constructor(){
      super();
      console.log('gz-label constructor')
    }
    
    connectedCallback() {
      this.render();
    }
    
    render(){
      if(this._dataSet){
        this.shadowRoot.innerHTML = `
          ${this._dataSet.name}
        `;
      }else{
        this.shadowRoot.innerHTML = `
          <slot></slot>
        `;
      }
    }
});