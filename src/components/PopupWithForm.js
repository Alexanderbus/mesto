import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popup, handleSubmit) {
      super(popup);
      this._handleSubmit = handleSubmit;
      this._popupForm = this._popup.querySelector('.popup__form')
    }
  
    _getInputValues() {
      const inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
      const formValues = {};
      inputList.forEach(input => {
        formValues[input.name] = input.value;
      });
      return formValues;
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this._handleSubmit(this._getInputValues());
        this.close();
      });
    }
  
    close() {
      super.close();
      this._popupForm.reset();
    }
  }
