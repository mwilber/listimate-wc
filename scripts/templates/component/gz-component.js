import cssData from './gz-component.css';

window.customElements.define('gz-component', class extends HTMLElement {
  
    constructor(){
      super();
      let shadowRoot = this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
      this.render();
      console.log('gz-component loaded');
    }
    
    render(){
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <h1>gz-component works!</h1>
      `;
    }
});