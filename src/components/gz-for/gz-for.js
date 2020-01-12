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
      let strList = 'no data';
					
      if(Array.isArray(this._dataSet)){
        strList = this._dataSet.reduce((listOut, listItem)=>{
          return listOut + "<li>"+listItem+"</li>"
        }, '');
      }
          
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>

        <slot></slot>
        
        <div class="gz-for-container">
        </div>
      `;

      let templateTest = this.shadowRoot.querySelector('slot').assignedNodes()[1].content;
      console.log("TCL: extends -> render -> templateTest", templateTest)
      let container = this.shadowRoot.querySelector('.gz-for-container');
      if(Array.isArray(this._dataSet)){
        console.log("TCL: extends -> render -> this._dataSet", this._dataSet)
        for(let idx=0; idx<this._dataSet.length; idx++){
          let tmpNode = templateTest.cloneNode(true);
          
          container.appendChild(tmpNode);
          console.log("TCL: extends -> render -> tmpNode", container.lastChild)
          container.lastChild.innerHTML = "<button>test</button>"
        }
      }
    }
});