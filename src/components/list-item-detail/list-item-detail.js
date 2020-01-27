import cssData from './list-item-detail.css';
import { GzDataElement } from '../gz-core/GzDataElement';

window.customElements.define('list-item-detail', class extends GzDataElement {
  
  constructor(){
    super();

    this._clearDataSet();
  }

  _clearDataSet(){
    this._dataSet = {
      name: '',
      price: 0,
      quantity: 1
    };
  }
  
  render(){
    if( this.dataSet ){
      let dataSet = JSON.stringify(this._dataSet);

      let {name, price, quantity, pinned} = this._dataSet;

      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <h1>${name}</h1>
        <div class="input-group">
          <label>$</label><input name="price" type="number" value="${price}"/>
          <div style="flex: 100%;"></div>
          <label>qty</label><input name="quantity" type="number" value="${quantity}"/>
        </div>
        <div class="button-broup">
          <button class="save">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
          </button>
          <button class="pin ${(pinned==='true')?'active':''}">
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="map-pin" class="svg-inline--fa fa-map-pin fa-w-9" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512"><path fill="currentColor" d="M144 0C64.47 0 0 64.47 0 144c0 71.31 51.96 130.1 120 141.58v197.64l16.51 24.77c3.56 5.34 11.41 5.34 14.98 0L168 483.22V285.58C236.04 274.1 288 215.31 288 144 288 64.47 223.53 0 144 0zm0 240c-52.94 0-96-43.07-96-96 0-52.94 43.06-96 96-96s96 43.06 96 96c0 52.93-43.06 96-96 96zm0-160c-35.28 0-64 28.7-64 64 0 8.84 7.16 16 16 16s16-7.16 16-16c0-17.64 14.34-32 32-32 8.84 0 16-7.16 16-16s-7.16-16-16-16z"></path></svg>
          </button>
          <button class="delete">
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>
          </button>
        </div>
        <code>${dataSet}</code>
      `;

      this.shadowRoot.querySelector('.save').addEventListener('click', function(evt){
        let newPrice = this.shadowRoot.querySelector('input[name="price"]').value;
        let newQuantity = this.shadowRoot.querySelector('input[name="quantity"]').value;
        this.DataUpdate(this.getAttribute('databind'), {
          ...this._dataSet,
          price: parseFloat(newPrice),
          quantity: parseFloat(newQuantity)
        });
        this.DataUpdate('state.activeItem', '');
      }.bind(this));

      this.shadowRoot.querySelector('.pin').addEventListener('click', function(evt){
        let newPin = 'true';
        if(this._dataSet) if(this._dataSet.pinned === 'true') newPin = 'false';
        this.DataUpdate(this.getAttribute('databind'), {
          ...this._dataSet,
          pinned: newPin
        });
      }.bind(this));

      const inputs = this.shadowRoot.querySelectorAll('input');
      for (const input of inputs) {
        input.addEventListener('click', function(evt){
          if(this.value === '0'){
            this.value = '';
          }
        }.bind(input));
        input.addEventListener('blur', function(evt){
          if(this.value === ''){
            this.value = '0';
          }
        }.bind(input));
      }

      this.shadowRoot.querySelector('.delete').addEventListener('click', function(evt){
        document.querySelector('list-items').deleteItem(parseInt(this.getAttribute('idx')));
        this.setAttribute("dataBind", "");
        this.setAttribute("idx", "");
        this._clearDataSet();
        this.render();
      }.bind(this));
    }
  }
});