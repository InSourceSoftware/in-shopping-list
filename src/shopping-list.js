import {bindable} from 'aurelia-framework';
import {Item} from './item';

export class ShoppingList {
  @bindable listId;
  name = 'Shopping List';
  itemName = '';
  items = [];
  isEditing = false;

  constructor() {
  }

  attached() {
    this.loadItems();
    this.loadProperties();
  }

  loadItems() {
    let items = JSON.parse(localStorage.getItem('items#' + this.listId));
    if (items) {
      this.items = items;
    }
  }

  loadProperties() {
    let properties = JSON.parse(localStorage.getItem('properties#' + this.listId));
    console.log(properties);
    if (properties) {
      this.name = properties.name;
    }
  }

  addItem(name) {
    if (this.itemName) {
      this.items.push(new Item(name));
      this.itemName = '';
      this.saveItems();
    }
  }

  saveItem(item) {
    item.selected = false;
    this.saveItems();
  }

  clearAll() {
    this.items = [];
    this.saveItems();
  }

  clearPurchased() {
    this.items = this.items.filter(x => !x.purchased);
    this.saveItems();
  }

  removeItem(item) {
    this.items = this.items.filter(x => x.name !== item.name);
    this.saveItems();
  }

  saveItems() {
    localStorage.setItem('items#' + this.listId, JSON.stringify(this.items));
  }

  saveProperties() {
    console.log(this.listId + ': ' + this.name);
    localStorage.setItem('properties#' + this.listId, JSON.stringify({
      'name': this.name
    }));
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  get isPurchased() {
    return this.items.find(x => x.purchased);
  }
}