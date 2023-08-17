// я понимаю что здесь много что недоделано, но у меня уже мозг взрыввается, провертье хотя бы эту работу что бы я мог исправить эти ошибки

// import './index.css';
const popupImage = document.querySelector('.pop-up-image')
const popupConfirmDeleteCatd = document.querySelector('.popup_delete-card')
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
const avatar = document.querySelector('.avatar')
const deleteButton = document.querySelector('.popup__submit-button_delete-card')

import { Card } from '../components/Сard.js';
import { FormValidator } from '../components/Validation.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api.js'
import { PopupDeleteCard } from '../components/PopupDeleteCard.js'

const popupDeleteCard = new PopupDeleteCard(popupConfirmDeleteCatd)

const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-70',
    headers: {
        authorization: '96b2927c-f9e2-4c51-9d09-71cad7026538',
        'Content-Type': 'application/json'
    }
})

const myId = await api.getUserID()
console.log(myId);

const popupWithImage = new PopupWithImage(popupImage)

//Узнаем информацию юзера и добавляем 
function getUserInfo() {
    api.getUserInfo()
        .then(userInfo => {
            nameProfile.textContent = userInfo.name
            hobbyProfile.textContent = userInfo.about
            avatar.style.backgroundImage = `url(${userInfo.avatar})`
        })
}
getUserInfo()

//добавление начальных карточек с сервера
function addCards() {
    api.getCards()
        .then(data => {
            const revesrData = data.reverse()
            const defaultCards = new Section({
                items: revesrData, renderer: (item) => {
                    defaultCards.addItem(createCard(item));
                }
            }, cards)
            defaultCards.renderItems()
        }
        )
}
addCards()

function createCard(item) {
    const card = new Card({
        title: item.name, image: item.link, likes: item.likes, handleCardClick: () => {
            popupWithImage.open(item.link, item.name)
        }, confirmDelete: () => {
            popupDeleteCard.open()
            deleteButton.addEventListener('click', () => {
                popupDeleteCard.deleteCard(api.delete(item._id))
                card.deleteButton()
            })
        }, addLike: () => {
            api.addLike(item._id)
        }
    }, cardTemplate);
    const cardElement = card.generateCard();
    if (item.owner._id == myId) {
        cardElement.querySelector('.card__trash').classList.add('card__trash_active')
    }
    if (item.owner._id == myId) {
        cardElement.querySelector('.card__like').classList.add('card__like_active')
    }
    console.log(item.likes)
    return cardElement
}
// // добавление начальных карточек
// const defaultCards = new Section({
//     items: initialCards, renderer: (item) => {
//         defaultCards.addItem(createCard(item));
//     }
// }, cards)

// defaultCards.renderItems() 

//добавление юзером карточки
function addNewCard() {
    const data = popupFormPhoto._getInputValues();
    api.addCard({ name: data.nameAddPhoto, link: data.linkAddPhoto })
        .then(card => addCards())
    // defaultCards.addItem(createCard({ title: data.nameAddPhoto, image: data.linkAddPhoto}));
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

const popupFormPhoto = new PopupWithForm(popupAddPhoto, () => {
    addNewCard()

});

buttonAddPhoto.addEventListener('click', () => {
    popupFormPhoto.open()
    formAddPhoto.disableButton(submitButtonAddphoto)
    formAddPhoto.resetError()
})

const editProfile = new UserInfo({ name: nameProfile, aboutMe: hobbyProfile })

function handleFormSubmitProfile() {
    api.updateUserInfo({ name: inputNameProfile.value, about: inputHobbyProfile.value }
    )
    getUserInfo()
}

const popFormEditProfile = new PopupWithForm(popupEditProfile, () => {
    handleFormSubmitProfile();
});

editProfileBtn.addEventListener('click', () => {
    popFormEditProfile.open()
    const nameInfo = editProfile.getUserInfo()
    inputNameProfile.value = nameInfo.name;
    inputHobbyProfile.value = nameInfo.aboutMe;
}
)

popFormEditProfile.setEventListeners()
popupFormPhoto.setEventListeners()
popupWithImage.setEventListeners()
popupDeleteCard.setEventListeners()
