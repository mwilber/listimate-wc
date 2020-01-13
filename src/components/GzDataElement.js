/* 
    Base class for components binding to a GzDataStore
*/
export class GzDataElement extends HTMLElement {
  
    constructor(){
      super();

      this._dataSet = {};

      let shadowRoot = this.attachShadow({mode: 'open'});
    }

    get dataSet() {
      return this._dataSet;
    }
    set dataSet(newValue) {
      this._dataSet = newValue;
      this.render();
    }
    get dataBind() {
      return this.getAttribute('databind');
    }
    set dataBind(newValue) {
      this.setAttribute('databind', newValue);
      this.render();
    }
  
    static get observedAttributes() {
      return ['databind'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      if(name == 'databind'){
        document.dispatchEvent(new CustomEvent('GzDataBind', {
          detail:{
              node: this,
              target: this.getAttribute(name)
          }
        }));
      }
    }
    
    connectedCallback() {
      
    }
    
    render(){
      const {name, number} = this._dataSet;

      this.shadowRoot.innerHTML = `
        <h2>GzDataElement</h2>
      `;
    }
}