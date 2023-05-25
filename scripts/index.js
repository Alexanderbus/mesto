const popupImage = document.querySelector('.pop-up-image')
const buttonCloseZoomImage = popupImage.querySelector('.pop-up-image__closeBtn');
const buttonAddPhoto = document.querySelector('.profile__add-photo');
const popupAddPhoto = document.querySelector('.popup_add-photo')
const inputNameFormAddNewCard = document.querySelector('.popup__input_NameCard')
const inputLinkFormAddNewCard = document.querySelector('.popup__input_UrlCard')
const errorText = document.querySelectorAll('.popup__error')
const errorTextArray = Array.from(errorText)

// попап редактирования профиля
const editProfileBtn = document.querySelector('.profile__button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formPopupProfile = document.querySelector('.popup__form_edit-profile');
const inputNameProfile = formPopupProfile.nameEditProfile;
const inputHobbyProfile = formPopupProfile.aboutEditProfile;
const hobbyProfile = document.querySelector('.profile__whoau');
const nameProfile = document.querySelector('.profile__name');
const closePopupEditProfile = document.querySelector('.popup__exit_editProfile');
const closePopupAddPhoto = document.querySelector('.popup__exit_add-photo');
const submitButtonAddphoto = document.querySelector('.popup__submit-button_add-photo')
const submitButtonAEditProfile = document.querySelector('.popup__submit-button_edit-profile')

const popups = document.querySelectorAll('.popup')
const popupsArray = Array.from(popups)
const popupFormAddPhoto = document.querySelector('.popup__form_add-photo')
const inputsAddphoto = popupFormAddPhoto.querySelectorAll('.popup__input')
const inputsArrayAddPhoto = Array.from(inputsAddphoto)
const popupFormEditProfile = document.querySelector('.popup__form_edit-profile')
const inputsEditProfile = popupFormEditProfile.querySelectorAll('.popup__input')
const inputsArrayEditProfile = Array.from(inputsEditProfile)
const cardTemplate = document.querySelector('.card-template')

import { Card } from './Сard.js';
import { initialCards } from './initalCards.js'
import { FormValidator } from './validation.js'

const formAddPhoto = new FormValidator({errorClass: 'popup__input_invalid', disableButton: 'popup__submit-button_disabled', 
submitButton: submitButtonAddphoto, input: '.popup__input', inputsArray: inputsArrayAddPhoto}, popupFormAddPhoto)
const formEditProfile = new FormValidator({errorClass: 'popup__input_invalid', disableButton: 'popup__submit-button_disabled', 
submitButton: submitButtonAEditProfile, input: '.popup__input', inputsArray: inputsArrayEditProfile}, popupFormEditProfile )

function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

//создаем удомную функию для открытия поп-апа
export const openPopup = (popup) => {
    popup.classList.add('popup_opened')
    // закрытие искейпа попапов
    document.addEventListener('keydown', closePopupByEsc)
}
//создаем функцию для закрытия поп-апа
const closePopup = (popup) => {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closePopupByEsc)
};

buttonCloseZoomImage.addEventListener('click', () => {
    closePopup(popupImage)
})

//открытие поп апа добавления фото
buttonAddPhoto.addEventListener('click', function () {
    popupFormAddPhoto.reset();
    openPopup(popupAddPhoto);
    formAddPhoto.disableButton(submitButtonAddphoto);
    errorTextArray.forEach((errorTextEditProfileArray) => { // сколько не пытался я не понимаю как сюда применить _setInputValidState
        formAddPhoto.setInputValidState(inputNameFormAddNewCard, errorTextEditProfileArray)
        formAddPhoto.setInputValidState(inputLinkFormAddNewCard, errorTextEditProfileArray)
    })
})

//открытие поп апа
editProfileBtn.addEventListener('click', function () {
    openPopup(popupEditProfile)
    formPopupProfile.reset()
    inputNameProfile.value = nameProfile.textContent;
    inputHobbyProfile.value = hobbyProfile.textContent;
    errorTextArray.forEach((errorTextEditProfileArray) => { // сколько не пытался я не понимаю как сюда применить _setInputValidState
        formAddPhoto.setInputValidState(inputNameProfile, errorTextEditProfileArray)
        formAddPhoto.setInputValidState(inputHobbyProfile, errorTextEditProfileArray)
    })
})

//функция по редактированию профиля
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    nameProfile.textContent = inputNameProfile.value;
    hobbyProfile.textContent = inputHobbyProfile.value;
    closePopup(popupEditProfile)
}

//запускаем функцию
formPopupProfile.addEventListener('submit', handleFormSubmitProfile);

//кнопка закрыть попап
closePopupEditProfile.addEventListener('click', function () {
    closePopup(popupEditProfile);
})

closePopupAddPhoto.addEventListener('click', function () {
    closePopup(popupAddPhoto);
})

popupsArray.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
        if (evt.currentTarget === evt.target) {
            closePopup(popup)
        }
    })
})


//пробегаем массив начальных карточек
initialCards.forEach((item) => {
    const card = new Card(item.title, item.image, cardTemplate);
    const cardElement = card.generateCard();

    // Добавляем в DOM
    document.querySelector('.cards').prepend(cardElement);
});

// добавление юзером карточки
function addNewCard(evt) {
    evt.preventDefault();
    const valueName = inputNameFormAddNewCard.value;
    const valueLink = inputLinkFormAddNewCard.value;
    const newCard = new Card(valueName, valueLink, cardTemplate);
    const cardElement = newCard.generateCard();
    closePopup(popupAddPhoto);

    // Добавляем в DOM
    document.querySelector('.cards').prepend(cardElement);
}

// вешаем слушатель на сабмит добавления карточки
popupFormAddPhoto.addEventListener('submit', addNewCard)

function launchValidation(form) {
    form.enableValidation()
}

launchValidation(formAddPhoto)
launchValidation(formEditProfile)