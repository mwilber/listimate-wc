import cssData from './gz-list-item.css';

window.customElements.define('gz-list-item', class extends HTMLElement {
  
    constructor(){
      super();

      this._dataSet = {
        name:'', 
        number: ''
      };

      let shadowRoot = this.attachShadow({mode: 'open'});
      this.render();
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
      if(this.getAttribute('dataBind')){
        document.dispatchEvent(new CustomEvent('GzDataBind', {
          detail:{
              node: this,
              target: this.getAttribute('dataBind')
          }
        }));
  
        // Load existing data from the datastore
        //document.dispatchEvent(new CustomEvent('GzDataRefresh', {}));
      }
      // TODO: this might not be necessary
      this.render();
    }
    
    connectedCallback() {
      console.log('gz-list-item loaded');
    }
    
    render(){
      const {name, number} = this._dataSet;

      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <h2>name: ${name}</h2>
      `;

      this.shadowRoot.querySelector('h2').addEventListener('click', function(evt){
        document.querySelector('gz-item-detail').setAttribute('dataBind', this.getAttribute('databind'));
      }.bind(this));
    }
});