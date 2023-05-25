export class FormValidator {

    constructor(config, formSelector) {
        this._errorClass = config.errorClass;  // popup__input_invalid 
        this._disableButton = config.disableButton; // popup__submit-button_disabled
        this._submitButton = config.submitButton // popup__submit-button
        this._input = config.input; // popup__input

        this._formSelector = formSelector;
    }

    setInputValidState(input, errorElement) {
        input.classList.remove(this._errorClass)
        errorElement.textContent = ''
    }

    _setInputInvalidState(input, errorElement) {
        input.classList.add(this._errorClass)
        errorElement.textContent = input.validationMessage
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

    disableButton(SubmitButton) {
        SubmitButton.setAttribute('disabled', '')
        SubmitButton.classList.add(this._disableButton);
    }

    _enableButton(SubmitButton) {
        SubmitButton.removeAttribute('disabled')
        SubmitButton.classList.remove(this._disableButton);
    }

    _toggleButtonValidity() {
        const SubmitButton = this._formSelector.querySelector(this._submitButton)
        if (this._formSelector.checkValidity())
            this._enableButton(SubmitButton)
        else {
            this.disableButton(SubmitButton)
        }
    }

    enableValidation() {
        const inputs = this._formSelector.querySelectorAll(this._input)
        const inputsArray = Array.from(inputs)
        inputsArray.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input)
                this._toggleButtonValidity()
            })
        })
    }
}

//const formAddPhoto = new FormValidator(document.querySelector('.popup__form_edit-profile'))
//const formEditProfile = new FormValidator(document.querySelector('.popup__form_add-photo'))

//launchValidation(formEditProfile)