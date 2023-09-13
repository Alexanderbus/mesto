export class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }


  renderItems(daraCards) {
    daraCards.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}