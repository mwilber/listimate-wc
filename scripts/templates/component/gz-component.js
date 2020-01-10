import cssData from './gz-component.css';

window.customElements.define('gz-component', class extends HTMLElement {
  
    constructor(){
      super();
      let shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.innerHTML = this.render();
    }
    
    connectedCallback() {
      console.log('gz-component loaded');
    }
    
    render(){
      return `
        <style>
          ${cssData}
        </style>
        
        <h1>gz-component works!</h1>
      `;
    }
});