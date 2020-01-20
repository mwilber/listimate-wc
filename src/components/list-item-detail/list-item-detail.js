import cssData from './list-item-detail.css';
import { GzDataElement } from '../GzDataElement';

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

      let {name, price, quantity} = this._dataSet;

      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <h1>${name}</h1>
        <p>$<input name="price" type="number" value="${price}"</p>
        <p>qty <input name="quantity" type="number" value="${quantity}"</p>
        <button class="save">&#10004;</button>
        <button class="delete">&#10006;</button>
        <code>${dataSet}</code>
      `;

      this.shadowRoot.querySelector('.save').addEventListener('click', function(evt){
        let newPrice = this.shadowRoot.querySelector('input[name="price"]').value;
        let newQuantity = this.shadowRoot.querySelector('input[name="quantity"]').value;
        document.dispatchEvent(new CustomEvent('GzDataUpdate', {
          detail:{
              target: this.getAttribute('databind'),
              payload: {
                ...this._dataSet,
                price: newPrice,
                quantity: newQuantity
              }
          }
        }));
      }.bind(this));

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