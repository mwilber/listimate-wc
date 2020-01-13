import cssData from './gz-item-detail.css';

window.customElements.define('gz-item-detail', class extends HTMLElement {
  
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
  }
  
  connectedCallback() {
    console.log('gz-list loaded');
  }
  
  render(){
    let dataSet = JSON.stringify(this._dataSet);

    let {name, number} = this._dataSet;

    this.shadowRoot.innerHTML = `
      <style>
        ${cssData}
      </style>
      
      <p>Name: ${name}</p>
      <p>Number:  ${number}</p>

      <code>${dataSet}</code>
    `;
  }
});