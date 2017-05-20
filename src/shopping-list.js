import {Item} from './item';

export class ShoppingList {
  listName = 'Shopping List';
  name = '';
  items = [];
  isEditing = false;

  constructor() {
    this.loadProperties();
    this.loadItems();
  }

  loadItems() {
    let items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      this.items = items;
    }
  }

  loadProperties() {
    let properties = JSON.parse(localStorage.getItem('properties'));
    if (properties) {
      this.listName = properties.listName;
    }
  }

  addItem(name) {
    if (this.name) {
      this.items.push(new Item(name));
      this.name = '';
      this.saveItems();
    }
  }

  selectItem(item) {
    this.selected = item;
    item.selected = true;
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
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  saveProperties() {
    localStorage.setItem('properties', JSON.stringify({
      'listName': this.listName
    }));
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  get isPurchased() {
    return this.items.find(x => x.purchased);
  }
}