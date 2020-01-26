import cssData from './list-items.css';
import { GzDataElement } from '../gz-core/GzDataElement';

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
			
			<!--<h2>${name}</h2>-->
			<div class="input-group">
				<input id="inp-add" placeholder="Item Name" />
				<div id="btn-add">
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
				</div>
			</div>
			<div class="total-group">
				<span class="rounded">${displayRounded}</span>
				<span class="actual">${displayTotal}</span>
			</div>
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