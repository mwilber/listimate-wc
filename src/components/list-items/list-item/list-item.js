import cssData from './list-item.css';
import { GzDataElement } from '../../gz-core/GzDataElement';

window.customElements.define('list-item', class extends GzDataElement {
  
    constructor(){
      super();

      this._dataSet = {
        name:'', 
        number: ''
      };
    }
    
    render(){
      const {name, price, quantity, pinned} = this._dataSet;
      const elemClass = (price > 0 && quantity > 0)? 'checked' : '';

      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <div class="list-item ${elemClass} ${(pinned==='true')?'pinned':''} ${(price===0)?'zero':''}">
          <span class="pinned">
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="map-pin" class="svg-inline--fa fa-map-pin fa-w-9" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512"><path fill="currentColor" d="M144 0C64.47 0 0 64.47 0 144c0 71.31 51.96 130.1 120 141.58v197.64l16.51 24.77c3.56 5.34 11.41 5.34 14.98 0L168 483.22V285.58C236.04 274.1 288 215.31 288 144 288 64.47 223.53 0 144 0zm0 240c-52.94 0-96-43.07-96-96 0-52.94 43.06-96 96-96s96 43.06 96 96c0 52.93-43.06 96-96 96zm0-160c-35.28 0-64 28.7-64 64 0 8.84 7.16 16 16 16s16-7.16 16-16c0-17.64 14.34-32 32-32 8.84 0 16-7.16 16-16s-7.16-16-16-16z"></path></svg>
          </span>
          <span class="item-name">
          ${name}
          </span>
          
          <span class="item-price">
          $${price}
          </span>
          <span class="item-quantity">
          x${quantity}
          </span>
          <span class="break"></span>
          <best-price databind="prices.${name.toUpperCase()}"></best-price>
        </div>
      `;

      this.shadowRoot.querySelector('.list-item').addEventListener('click', function(evt){
        document.dispatchEvent(new CustomEvent('GzDataUpdate', {
          detail:{
              target: 'state.activeItem',
              payload: this.getAttribute('databind')
          }
        }));
        // TODO: Parse this out directly in the detail component
        document.querySelector('list-item-detail').setAttribute('idx', this.getAttribute('idx'));
        document.querySelector('list-item-detail').setAttribute('data-store', this.getAttribute('data-store'));
      }.bind(this));
    }
});