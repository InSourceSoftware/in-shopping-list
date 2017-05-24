import {bindable} from 'aurelia-framework';
import {Item} from './item';

export class ShoppingList {
  @bindable listId;
  listName = 'Shopping List';
  name = '';
  items = [];
  isEditing = false;

  constructor() {
  }

  attached() {
    this.loadProperties();
    this.loadItems();
  }

  loadProperties() {
    let properties = JSON.parse(localStorage.getItem('properties#' + this.listId));
    if (properties) {
      this.listName = properties.name;
    }
  }

  loadItems() {
    let items = JSON.parse(localStorage.getItem('items#' + this.listId));
    if (items) {
      this.items = items;
    }
  }

  addItem(name) {
    if (this.name) {
      this.items.push(new Item(name));
      this.name = '';
      this.saveItems();
    }
  }

  clearPurchased() {
    this.items = this.items.filter(x => !x.purchased);
    this.saveItems();
  }

  clearAll() {
    this.items = [];
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
    localStorage.setItem('properties#' + this.listId, JSON.stringify({
      'name': this.listName
    }));
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  get isPurchased() {
    return this.items.find(x => x.purchased);
  }
}