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
		let tmp = this._dataSet.items.filter(function(value, index, arr){
			return index != itemIdx;
		});
		
		document.dispatchEvent(new CustomEvent('GzDataUpdate', {
			detail:{
				target: this.getAttribute('databind')+'.items',
				payload: tmp
			}
		}));
	}
	
	render(){
		const dataBinding = this.getAttribute('databind');
		const {name, items} = this._dataSet || {name: '', items:[]};
		let roundedTotal = 0;

		if(items){
			this.total = items.reduce((prev, curr)=>{
				roundedTotal += (Math.ceil(parseFloat(curr.price)) * parseFloat(curr.quantity))
				return prev + (parseFloat(curr.price) * parseFloat(curr.quantity));
			}, 0);
		}
		const displayTotal = this.total.toFixed(2);
		const displayRounded = roundedTotal.toFixed(2);

		this.shadowRoot.innerHTML = `
			<style>
				${cssData}
			</style>
			
			<h2>${name}</h2>
			<input id="inp-add" placeholder="Item Name" />
			<button id="btn-add">Add</button>
			<h2>Total: ${displayRounded} [${displayTotal}]</h2>
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
				this._dataSet.items = this._dataSet.items || [];
				document.dispatchEvent(new CustomEvent('GzDataUpdate', {
					detail:{
							target: this.getAttribute('databind')+'.items',
							payload: [...this._dataSet.items, {...this.dataTemplate, name: inpName.value}]
					}
				}));
				inpName.value = "";
			}
			
		});
	}
});