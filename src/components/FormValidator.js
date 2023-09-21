export class FormValidator {
    constructor(inputs, formSelector) {
        // this._submitButton = config.submitButton // popup__submit-button
        this._inputsArray = inputs; 
        this._formSelector = formSelector;
        this._invalidPopup = 'popup__input_invalid'
        this._disabledButton = 'popup__submit-button_disabled'
        this._submitButton = this._formSelector.querySelector('.popup__submit-button')
    }

    setInputValidState(input, errorElement) {
        input.classList.remove(this._invalidPopup)
        errorElement.textContent = ''
    }

    _setInputInvalidState(input, errorElement) {
        input.classList.add(this._invalidPopup)
        errorElement.textContent = input.validationMessage
    }

    resetError() {
        this._inputsArray.forEach(input => {
            const errorElement = this._formSelector.querySelector(`#${input.id}Error`)
            this.setInputValidState(input, errorElement)
        })
     } 

    _checkInputValidity(input) {
        const errorElement = this._formSelector.querySelector(`#${input.id}Error`)
        if (input.checkValidity()) {
            this.setInputValidState(input, errorElement)
        }
        else {
            this._setInputInvalidState(input, errorElement)
        }
    }

    disableButton() {
        this._submitButton.setAttribute('disabled', '')
        this._submitButton.classList.add(this._disabledButton);
    }

    _enableButton() {
        this._submitButton.removeAttribute('disabled')
        this._submitButton.classList.remove(this._disabledButton);
    }

    _toggleButtonValidity() {
        if (this._formSelector.checkValidity()) {
            this._enableButton()
        }
        else {
            this.disableButton()
        }
    }

    enableValidation() {
        this._inputsArray.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input)
                this._toggleButtonValidity()
            })
        })
    }
}