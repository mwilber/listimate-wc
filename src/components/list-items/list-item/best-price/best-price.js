import cssData from './best-price.css';
import { GzDataElement } from '../../../gz-core/GzDataElement';

window.customElements.define('best-price', class extends GzDataElement {
  
    constructor(){
      super();

      this._dataSet = null;
    }
    
    render(){
      if (typeof this._dataSet === 'undefined') {
        console.log('no price prop for ', this.getAttribute('databind'), this._dataSet)
        // Add a placeholder under the name so the price can be added later
        this.DataUpdate(this.getAttribute('databind'), {x: "x"});
        return;
      } else if(!this._dataSet) return;

      let displayPrice = null;
      
      Object.keys(this._dataSet).forEach(
        (name) => {
          const price = this._dataSet[name];
          if (price !== 'x' && (!displayPrice || displayPrice.price > price))
            displayPrice = {name: name, price: price}
        }
      );

      if (displayPrice === null) return;

      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <div class="price-tag">
          <span class="name">${displayPrice.name}</span>
          <span class="price">$${displayPrice.price}</span>
        </div>
      `;
    }
});