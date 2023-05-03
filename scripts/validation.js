function setInputValidState(config, input, errorElement) {
    input.classList.remove(config.inputErrorClass)
    errorElement.textContent = ''
}
function setInputInvalidState(config, input, errorElement) {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage
}


function checkInputValidity(config, input) {
    const errorElement = document.querySelector(`#${input.id}Error`)
    if(input.checkValidity()) {
        //валидный
        setInputValidState(config, input, errorElement);
    }
    else {
        //невалидный
        setInputInvalidState(config, input, errorElement);
    }
}

function disableButton({ inactiveButtonClass }, button) {
    button.setAttribute('disabled', '')
    button.classList.add(inactiveButtonClass);
}

function enableButton({ inactiveButtonClass }, button) {
    button.removeAttribute('disabled')
    button.classList.remove(inactiveButtonClass);
}
function toggleButtonValidity({ submitButtonSelector, ...rest }, form) {
    const submitButton = form.querySelector(submitButtonSelector);
    if(form.checkValidity()) {
        enableButton(rest, submitButton);
    } else {
        disableButton(rest, submitButton);
    }
}

function setSubmitListener(config, form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        toggleButtonValidity(config, form);
    })
    
}

function enableValidation({ formSelector, inputSelector, ...rest}) {
    const form = document.querySelector(formSelector);
    
    setSubmitListener(rest, form);
    toggleButtonValidity(rest, form);

    const inputs = form.querySelectorAll(inputSelector);
    const inputssArray = Array.from(inputs)
    inputssArray.forEach(function (input) {
        input.addEventListener('input', () => {
            checkInputValidity(rest, input);
            toggleButtonValidity(rest, form);
        })
    })
}

enableValidation({
    formSelector: '.popup__form_edit-profile',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error'
  }); 

  enableValidation({
    formSelector: '.popup__form_add-photo',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error'
  }); 