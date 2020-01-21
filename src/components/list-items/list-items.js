import cssData from './list-items.css';
import { GzDataElement } from '../GzDataElement';

window.customElements.define('list-items', class extends GzDataElement {
	
	constructor(){
		super();

		this._dataSet = null;

		this.dataTemplate = {
			name: '',
			price: 0,
			quantity: 1
		};

		this.total = 0;
	}

	deleteItem(itemIdx){
		let tmp = this._dataSet.filter(function(value, index, arr){
			return index != itemIdx;
		});
		
		document.dispatchEvent(new CustomEvent('GzDataUpdate', {
			detail:{
				target: this.getAttribute('databind'),
				payload: tmp
			}
		}));
	}
	
	render(){
		const dataBinding = this.getAttribute('databind');

		if(this._dataSet){
			this.total = this._dataSet.items.reduce((prev, curr)=>{
				return prev + (parseFloat(curr.price) * parseFloat(curr.quantity));
			}, 0);
		}
		const displayTotal = this.total.toFixed(2);

		this.shadowRoot.innerHTML = `
			<style>
				${cssData}
			</style>
			
			<h2>Items</h2>
			<input id="inp-add" placeholder="Item Name" />
			<button id="btn-add">Add</button>
			<h2>Total:${displayTotal}</h2>
			<gz-for>
				<template>
					<list-item databind="${dataBinding}.items"></list-item>
				</template>
			</gz-for>
		`;

		if(this._dataSet){
			this.shadowRoot.querySelector('gz-for').dataSet = this._dataSet.items;
		}

		let btnAdd = this.shadowRoot.getElementById('btn-add');
		btnAdd.addEventListener('click', (evt)=>{
			let inpName = this.shadowRoot.getElementById('inp-add');

			if(inpName.value){
				if(!this._dataSet) this._dataSet = [];
				document.dispatchEvent(new CustomEvent('GzDataUpdate', {
					detail:{
							target: this.getAttribute('databind'),
							payload: [...this._dataSet, {...this.dataTemplate, name: inpName.value}]
					}
				}));
				inpName.value = "";
			}
			
		});
	}
});