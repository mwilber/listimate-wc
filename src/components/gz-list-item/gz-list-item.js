import cssData from './gz-list-item.css';

window.customElements.define('gz-list-item', class extends HTMLElement {
  
    constructor(){
      super();

      let shadowRoot = this.attachShadow({mode: 'open'});
      this.render();
    }

    get name() {
      return this.getAttribute('name');
    }
    set name(newValue) {
      this.setAttribute('name', newValue);
    }
    get number() {
      return this.getAttribute('number');
    }
    set number(newValue) {
      this.setAttribute('number', newValue);
    }

    static get observedAttributes() {
      return ['name', 'number'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      this.render();
    }
    
    connectedCallback() {
      console.log('gz-list-item loaded');
    }
    
    render(){
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <h2>name: ${this.getAttribute('name')}</h2>
      `;

      this.shadowRoot.querySelector('h2').addEventListener('click', function(evt){
        alert(this.number);
      }.bind({number: this.getAttribute('number')}));
    }
});