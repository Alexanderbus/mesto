// const formPopupProfile = document.EditProfile;
formPopupAddPhoto = document.editorAddPhoto
const inputsEditProfile = formPopupProfile.querySelectorAll('.pop-up-edit-profile__input')
const inputsEditProfileArray = Array.from(inputsEditProfile)
const inputsAddPhoto = popupAddPhoto.querySelectorAll('.pop-up-add-photo__input')
const inputsAddPhotoArray = Array.from(inputsAddPhoto)

function noValid(input, errorElement) {
    input.classList.add('popup__input_invalid')
    errorElement.textContent = input.validationMessage
}
function YesValid(input, errorElement) {
    input.classList.remove('popup__input_invalid')
    errorElement.textContent = ''
}

function checkInputValidity(input, popup) {
    const errorElement = popup.querySelector(`.${input.id}Error`)
    if (!input.validity.valid) {
        noValid(input, errorElement)
    } else {
        YesValid(input, errorElement)
    }
}

function toggleButtonValidity(popup) {
    const submitButton = popup.querySelector('#submitButton')
    if (!popup.checkValidity()) {
        submitButton.setAttribute('disabled', '')
        submitButton.classList.add('button_invalid')
    } else {
        submitButton.removeAttribute('disabled')
        submitButton.classList.remove('button_invalid')
    }
}

function enableValidation(popup, inputs) {
    popup.addEventListener('submit', (e) => {
        e.preventDefault()
    })
    inputs.forEach((input) => {
        input.addEventListener('input', (input) => {
            checkInputValidity(input.target, popup)
            toggleButtonValidity(popup)
        })
    })
}

enableValidation(formPopupProfile, inputsEditProfileArray)
enableValidation(formPopupAddPhoto, inputsAddPhotoArray)