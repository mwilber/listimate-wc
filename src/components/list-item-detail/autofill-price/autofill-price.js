import cssData from './autofill-price.css';
import { GzDataElement } from '../../gz-core/GzDataElement';

window.customElements.define('autofill-price', class extends GzDataElement {
  
    constructor(){
      super();

      this._dataSet = null;
    }
    
    render(){
      if (!this.dataset.store) return;
      if (typeof this._dataSet === 'undefined') {
        console.log('no price prop for ', this.getAttribute('databind'), this._dataSet)
        // Add a placeholder under the name so the price can be added later
        this.DataUpdate(this.getAttribute('databind'), {x: "x"});
        return;
      } else if(!this._dataSet) return;

      const displayPrice = {
        name: this.dataset.store,
        price: this._dataSet[this.dataset.store]
      };

      if (!displayPrice.price && displayPrice.price !== 0) return;

      // this.dataset.store = displayPrice.name;
      this.dataset.price = displayPrice.price;

      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <div class="price-tag">
          <span class="name">${displayPrice.name}</span>
          <span class="price">$${displayPrice.price}</span>
        </div>
      `;

      this.shadowRoot.querySelector('.price-tag').addEventListener('click', function(evt){
        const host = this.getRootNode().host;
        if(host.SetPrice) host.SetPrice(displayPrice.price)
      }.bind(this));
    }
});