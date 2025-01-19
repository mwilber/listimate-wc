import cssData from './best-price.css';
import { GzDataElement } from '../../../gz-core/GzDataElement';

window.customElements.define('best-price', class extends GzDataElement {
  
    constructor(){
      super();

      this._dataSet = null;
    }
    
    render(){
      if (!this.dataset.store) return;

      const displayPrice = {
        name: this.dataset.store,
        price: this._dataSet[this.dataset.store]
      };
      let bestPrice = null;
      let bestPriceStr = '';
      let displayPriceStr = '';

      // if (!displayPrice.price && displayPrice.price !== 0) return;
      if (typeof this._dataSet === 'undefined') {
        console.log('no price prop for ', this.getAttribute('databind'), this._dataSet)
        // Add a placeholder under the name so the price can be added later
        this.DataUpdate(this.getAttribute('databind'), {x: "x"});
        return;
      } else if(!this._dataSet) return;

      Object.keys(this._dataSet).forEach(
        (name) => {
          const price = this._dataSet[name];
          if (price !== 'x' && (!bestPrice || bestPrice.price > price))
            bestPrice = {name: name, price: price}
        }
      );

      if(displayPrice.price && displayPrice.price !== 0) {
        displayPriceStr = `${displayPrice.name} $${displayPrice.price}`;
      }

      if(bestPrice && bestPrice.name !== displayPrice.name) {
        bestPriceStr = `${bestPrice.name} $${bestPrice.price}`;
      }

      if (displayPriceStr && bestPriceStr) {
        bestPriceStr = '&nbsp;&nbsp;&gt;&nbsp;&nbsp;' + bestPriceStr;
      }

      if (!displayPriceStr && !bestPriceStr) return;

      //this.dataset.store = displayPrice.name;
      this.dataset.price = displayPrice.price;

      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <div class="price-tag">
          <span class="name">${displayPriceStr.replace(/_/g, ' ')}</span>
          <span class="best-price">${bestPriceStr.replace(/_/g, ' ')}</span>
        </div>
      `;
    }
});
