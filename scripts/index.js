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

const popups = document.querySelectorAll('.popup')
const popupsArray = Array.from(popups)

import {Card} from './card.js';
import {initialCards} from './initalCards.js'
import {FormValidator} from './validation.js'

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

//открытие поп апа
buttonAddPhoto.addEventListener('click', function () {
    document.querySelector('.popup__form_add-photo').reset();
    inputNameFormAddNewCard.classList.remove('popup__input_invalid')
    inputLinkFormAddNewCard.classList.remove('popup__input_invalid')
    errorTextArray.forEach((errorTextArray) => {
        errorTextArray.textContent = '';
    })
    openPopup(popupAddPhoto);
})

//открытие поп апа
editProfileBtn.addEventListener('click', function () {
    openPopup(popupEditProfile);
    EditProfile.reset()
    inputNameProfile.classList.remove('popup__input_invalid')
    inputHobbyProfile.classList.remove('popup__input_invalid')
    errorTextArray.forEach((errorTextEditProfilerray) => {
        errorTextEditProfilerray.textContent = '';
    })
    inputNameProfile.value = nameProfile.textContent;
    inputHobbyProfile.value = hobbyProfile.textContent;
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
    const card = new Card(item.title, item.image);
    const cardElement = card.generateCard();

    // Добавляем в DOM
    document.querySelector('.cards').prepend(cardElement);
});

// добавление юзером карточки
function addNewCard(evt) {
    evt.preventDefault();
    const valueName = inputNameFormAddNewCard.value;
    const valueLink = inputLinkFormAddNewCard.value;
    const newCard = new Card(valueName, valueLink);
    const cardElement = newCard.generateCard();
    closePopup(popupAddPhoto);

    // Добавляем в DOM
    document.querySelector('.cards').prepend(cardElement);
}

// вешаем слушатель на сабмит добавления карточки
document.querySelector('.popup__form_add-photo').addEventListener('submit', addNewCard)

const FormAddPhoto = new FormValidator(document.querySelector('.popup__form_edit-profile'))
const FormEditProfile = new FormValidator(document.querySelector('.popup__form_add-photo'))

function launchValidation(form) {
    form.enableValidation()
}

launchValidation(FormAddPhoto)
launchValidation(FormEditProfile)
