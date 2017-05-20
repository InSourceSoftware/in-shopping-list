import {Item} from './item';

export class ShoppingList {
  name = '';
  items = [];

  constructor() {
    this.title = 'Shopping List';
    let items = JSON.parse(localStorage.getItem('items'));
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

  removeItem(item) {
    this.items = this.items.filter(x => x.name !== item.name);
    this.saveItems();
  }

  saveItems() {
    localStorage.setItem('items', JSON.stringify(this.items));
  }
}