import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popup, submitCallback) {
      super(popup);
      this._submitCallback = submitCallback;
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
      this._popup.querySelector('.popup__form').addEventListener('submit', (event) => {
        event.preventDefault();
        this._submitCallback(this._getInputValues());
        this.close();
      });
    }
  
    close() {
      super.close();
      this._popup.querySelector('.popup__form').reset();
    }
  }
