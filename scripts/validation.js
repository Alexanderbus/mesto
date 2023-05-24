export class FormValidator {

    constructor(formSelector) {
        this._formSelector = formSelector;
    }

    _setInputValidState(input, errorElement) {
        input.classList.remove('popup__input_invalid')
        errorElement.textContent = ''
    }

    _setInputInvalidState(input, errorElement) {
        input.classList.add('popup__input_invalid')
        errorElement.textContent = input.validationMessage
    }

    _checkInputValidity(input) {
        const errorElement = this._formSelector.querySelector(`#${input.id}Error`)
        if (input.checkValidity()) {
            this._setInputValidState(input, errorElement)
        }
        else {
            this._setInputInvalidState(input, errorElement)
        }
    }

    _disableButton(SubmitButton) {
        SubmitButton.setAttribute('disabled', '')
        SubmitButton.classList.add('popup__submit-button_disabled');
    }

    _enableButton(SubmitButton) {
        SubmitButton.removeAttribute('disabled')
        SubmitButton.classList.remove('popup__submit-button_disabled');
    }


    _toggleButtonValidity() {
        const SubmitButton = this._formSelector.querySelector('.popup__submit-button')
        if (this._formSelector.checkValidity())
            this._enableButton(SubmitButton)
        else {
            this._disableButton(SubmitButton)
        }
    }

    enableValidation() {
        const inputs = this._formSelector.querySelectorAll('.popup__input')
        const inputsArray = Array.from(inputs)
        inputsArray.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input)
                this._toggleButtonValidity()
            })
        })
    }
}