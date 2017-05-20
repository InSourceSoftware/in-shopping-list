export class App {
  id = 1;
  lists = [];

  constructor() {
    this.title = 'Shopping List';
    this.loadLists();
  }

  loadLists() {
    let lists = JSON.parse(localStorage.getItem('lists'));
    if (lists) {
      this.lists = lists;
      this.id = localStorage.getItem('listId');
    }
  }

  addList() {
    this.lists.push(this.id++);
    this.saveLists();
  }

  removeList() {
    if (this.lists.length > 1) {
      this.lists = this.lists.slice(0, this.lists.length - 1);
      this.id--;
    } else {
      this.lists = [];
      this.id = 1;
    }
    this.saveLists();
  }

  saveLists() {
    localStorage.setItem('lists', JSON.stringify(this.lists));
    localStorage.setItem('listId', this.id);
  }
}
