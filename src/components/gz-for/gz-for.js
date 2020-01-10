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
    }

    dataTest(){
      this._dataSet.push('blah');
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
        
        <div>
          ${strList}
        </div>
      `;
    }
});