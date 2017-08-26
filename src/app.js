export class App {
  lists = [1];

  constructor() {
    this.title = 'Shopping List';
  }

  bind() {
    this.loadLists();
  }

  loadLists() {
    let lists = JSON.parse(localStorage.getItem('lists'));
    if (lists) {
      this.lists = lists;
    }
  }

  saveLists() {
    localStorage.setItem('lists', JSON.stringify(this.lists));
  }

  addList() {
    this.lists.push(this.lists.length + 1);
    this.saveLists();
  }

  removeList() {
    if (this.lists.length > 0) {
      this.lists = this.lists.slice(0, this.lists.length - 1);
      this.saveLists();
    }
  }
}
