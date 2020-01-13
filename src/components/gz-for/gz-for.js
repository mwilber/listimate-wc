import cssData from './gz-for.css';

window.customElements.define('gz-for', class extends HTMLElement {
  
    constructor(){
      super();

      this._dataSet = null;

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
    
    connectedCallback() {
      console.log('gz-for loaded');
      if(this.getAttribute('dataBind')){
        document.dispatchEvent(new CustomEvent('GzDataBind', {
          detail:{
              node: this,
              target: this.getAttribute('dataBind')
          }
        }));
      }
    }
    
    render(){
          
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>

        <slot></slot>
        
        <div class="gz-for-container">
        </div>
      `;

      if(Array.isArray(this._dataSet)){
        let container = this.shadowRoot.querySelector('.gz-for-container');
        // Grab the template tag from the slot
        let template = this.shadowRoot.querySelector('slot').assignedNodes()[1].content;
        // Loop through the data set and apply a template for each item
        for(let idx=0; idx<this._dataSet.length; idx++){
          container.appendChild(template.cloneNode(true));
          // Inject the array index
          container.innerHTML = container.innerHTML.replace('databinda', 'dataBind="'+this.getAttribute('dataBind')+'['+idx+']"');
          //container.innerHTML = container.innerHTML.replace('{name}', this._dataSet[idx]);
          // Search and replace the iinerHTML string for strings matching the data object's properties
          container.innerHTML = container.innerHTML.replace(
            /{(\w*)}/g ,
            function( m, key ){
              return this.hasOwnProperty( key ) ? this[ key ] : "";
            }.bind(this._dataSet[idx])
          );
        }
      }
    }
});