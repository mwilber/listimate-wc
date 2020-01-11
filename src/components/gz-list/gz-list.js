import cssData from './gz-list.css';

window.customElements.define('gz-list', class extends HTMLElement {
  
    constructor(){
      super();
      let shadowRoot = this.attachShadow({mode: 'open'});
      this.render();
    }
    
    connectedCallback() {
      console.log('gz-list loaded');
    }
    
    render(){
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <h1>gz-list works!</h1>
        <gz-for dataBind="lists"></gz-for>
      `;
    }
});