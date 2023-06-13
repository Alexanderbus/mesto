const popupImage = document.querySelector('.pop-up-image')
const buttonAddPhoto = document.querySelector('.profile__add-photo');
const popupAddPhoto = document.querySelector('.popup_add-photo')
const inputNameFormAddNewCard = document.querySelector('.popup__input_NameCard')
const inputLinkFormAddNewCard = document.querySelector('.popup__input_UrlCard')
const cards = document.querySelector('.cards')
const editProfileBtn = document.querySelector('.profile__button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formPopupProfile = document.querySelector('.popup__form_edit-profile');
const inputNameProfile = formPopupProfile.nameEditProfile;
const inputHobbyProfile = formPopupProfile.aboutEditProfile;
const hobbyProfile = document.querySelector('.profile__whoau');
const nameProfile = document.querySelector('.profile__name');
const submitButtonAddphoto = document.querySelector('.popup__submit-button_add-photo')
const submitButtonAEditProfile = document.querySelector('.popup__submit-button_edit-profile')
const popupFormAddPhoto = document.querySelector('.popup__form_add-photo')
const inputsAddphoto = popupFormAddPhoto.querySelectorAll('.popup__input')
const inputsArrayAddPhoto = Array.from(inputsAddphoto)
const popupFormEditProfile = document.querySelector('.popup__form_edit-profile')
const inputsEditProfile = popupFormEditProfile.querySelectorAll('.popup__input')
const inputsArrayEditProfile = Array.from(inputsEditProfile)
const cardTemplate = document.querySelector('.card-template')

import { Card } from '../components/Сard.js';
import { initialCards } from '../components/initalCards.js'
import { FormValidator } from '../components/Validation.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'

const PopupImage = new PopupWithImage(popupImage)

// добавление начальных карточек
const defaultCards = new Section({
    items: initialCards, renderer: (item) => {
        const card = new Card({
            title: item.title, image: item.image, handleCardClick: () => {
                PopupImage.open(item.image, item.title)
                PopupImage.setEventListeners()
            }
        }, cardTemplate);
        const cardElement = card.generateCard();
        defaultCards.addItem(cardElement);
    }
}, cards)

defaultCards.renderItems()

//добавление юзером карточки
function addNewCard(evt) {
    const valueName = inputNameFormAddNewCard.value;
    const valueLink = inputLinkFormAddNewCard.value;
    const newCard = new Card({
        title: valueName, image: valueLink, handleCardClick: () => {
            PopupImage.open(valueLink, valueName)
            PopupImage.setEventListeners()
        }
    }, cardTemplate, {
        handleCardClick: () => {
            PopupImage.open(this._image, this._title)
            PopupImage.setEventListeners()
        }
    });
    const cardElement = newCard.generateCard();

    // Добавляем в DOM
    cards.prepend(cardElement);
}

// Валидация
const formAddPhoto = new FormValidator({
    errorClass: 'popup__input_invalid', disableButton: 'popup__submit-button_disabled',
    submitButton: submitButtonAddphoto, input: '.popup__input', inputsArray: inputsArrayAddPhoto
}, popupFormAddPhoto)
const formEditProfile = new FormValidator({
    errorClass: 'popup__input_invalid', disableButton: 'popup__submit-button_disabled',
    submitButton: submitButtonAEditProfile, input: '.popup__input', inputsArray: inputsArrayEditProfile
}, popupFormEditProfile)

function launchValidation(form) {
    form.enableValidation()
}

launchValidation(formAddPhoto)
launchValidation(formEditProfile)

const PopupFormPhoto = new PopupWithForm(popupAddPhoto, () => {
    addNewCard()
});

buttonAddPhoto.addEventListener('click', () => {
    PopupFormPhoto.open()
    formAddPhoto.disableButton(submitButtonAddphoto)
    formAddPhoto.resetError()
})

const editProfile = new UserInfo({ name: nameProfile, aboutMe: hobbyProfile })

function handleFormSubmitProfile() {
    editProfile.setUserInfo(inputNameProfile.value, inputHobbyProfile.value)
}

const PopupFormEditProfile = new PopupWithForm(popupEditProfile, () => {
    handleFormSubmitProfile();
});

editProfileBtn.addEventListener('click', () => {
    PopupFormEditProfile.open()
    const nameInfo = editProfile.getUserInfo()
    inputNameProfile.value = nameInfo.name;
    inputHobbyProfile.value = nameInfo.aboutMe;
}
)

PopupFormEditProfile.setEventListeners()
PopupFormPhoto.setEventListeners()