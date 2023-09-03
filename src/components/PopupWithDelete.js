import { Popup }  from "./Popup.js";

export class PopupWithDelete extends Popup {
  constructor(popup, submitFunction) {
    super(popup);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".popup__form_deleteCard");
    this._submitButton = this._form.querySelector(".popup__submit-button");
    this._defaultSubmitButtonText = this._submitButton.textContent;
  }

  setHandleAction(action) {
    this._submitFunction =  action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `Удаление...`
      this._submitFunction({card: this._element, cardId: this._cardId});
    });
  }

  resetDefaultText() {
    this._submitButton.textContent = this._defaultSubmitButtonText;
  }

}