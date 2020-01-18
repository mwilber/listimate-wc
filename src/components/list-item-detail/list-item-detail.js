import cssData from './list-item-detail.css';
import { GzDataElement } from '../GzDataElement';

window.customElements.define('list-item-detail', class extends GzDataElement {
  
  constructor(){
    super();

    this._clearDataSet();
  }

  _clearDataSet(){
    this._dataSet = {
      name:'', 
      number: ''
    };
  }
  
  render(){
    if( this.dataSet ){
      let dataSet = JSON.stringify(this._dataSet);

      let {name, number} = this._dataSet;

      this.shadowRoot.innerHTML = `
        <style>
          ${cssData}
        </style>
        
        <p>Name: ${name}</p>
        <p>Number:  ${number}</p>

        <code>${dataSet}</code>
        <button class="delete">&#10060;</button>
      `;

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