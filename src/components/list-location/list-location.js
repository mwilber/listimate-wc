import cssData from './list-location.css';
import { GzDataElement } from '../gz-core/GzDataElement';

window.customElements.define('list-location', class extends GzDataElement {
  
    constructor(){
      super();
    }
    
    connectedCallback() {
      this.render();
    }
    
    render(){
      const displayLabel = Object.keys(this._dataSet.stores).find((store)=>{
        return this._dataSet.stores[store];
      });
      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <div class="button">
        ${displayLabel.substring(0,3)}
        </div>
        `;

      this.shadowRoot.querySelector('.button').addEventListener('click', function(){
          const freshList = {...this._dataSet.stores};
          const keys = Object.keys(freshList);
          let idx;
          for(idx = 0; idx<keys.length; idx++){
            if(freshList[keys[idx]]) {
              freshList[keys[idx]] = false;
              break;
            }
          }
          if(idx >= keys.length-1) idx = -1;
          freshList[keys[idx+1]] = true;

          console.log('stores', this.getAttribute('databind')+'.stores', freshList, idx);
          this.DataUpdate(this.getAttribute('databind')+'.stores', freshList);
      }.bind(this));
    }
});