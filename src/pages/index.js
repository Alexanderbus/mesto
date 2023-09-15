import './index.css';
const popupImage = document.querySelector('.pop-up-image')
const popupConfirmDeleteCatd = document.querySelector('.popup_delete-card')
const buttonAddPhoto = document.querySelector('.profile__add-photo');
const popupAddPhoto = document.querySelector('.popup_add-photo')
const cards = document.querySelector('.cards')
const editProfileBtn = document.querySelector('.profile__button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formPopupProfile = document.querySelector('.popup__form_edit-profile');
const inputNameProfile = formPopupProfile.nameEditProfile;
const inputHobbyProfile = formPopupProfile.aboutEditProfile;
const hobbyProfile = document.querySelector('.profile__whoau');
const nameProfile = document.querySelector('.profile__name');
const submitButtonAddphoto = document.querySelector('.popup__submit-button_add-photo')
const submitButtonEditProfile = document.querySelector('.popup__submit-button_edit-profile')
const popupFormAddPhoto = document.querySelector('.popup__form_add-photo')
const inputsAddphoto = popupFormAddPhoto.querySelectorAll('.popup__input')
const inputsArrayAddPhoto = Array.from(inputsAddphoto)
const popupFormEditProfile = document.querySelector('.popup__form_edit-profile')
const inputsEditProfile = popupFormEditProfile.querySelectorAll('.popup__input')
const inputsArrayEditProfile = Array.from(inputsEditProfile)
const cardTemplate = document.querySelector('.card-template')
const avatar = document.querySelector('.avatar')
const deleteButton = document.querySelector('.popup__submit-button_delete-card')
const avatarIcon = document.querySelector('.avatar')
const avatarPen = document.querySelector('.pencil')
const popupAvatar = document.querySelector('.popup_avatar')
const formPopupAvatar = document.querySelector('.popup__form_avatar')
const inputUrlAvatar = formPopupAvatar.avatarURL
const submitButtonAvatar = formPopupAvatar.querySelector('.popup__submit-button_avatar')

import { Card } from '../components/Сard.js';
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api.js'
import { PopupWithDelete } from '../components/PopupWithDelete.js'

const popupWithDelete = new PopupWithDelete(popupConfirmDeleteCatd, null)

// const popupDeleteCard = new PopupDeleteCard(popupConfirmDeleteCatd)

const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-70',
    headers: {
        authorization: '96b2927c-f9e2-4c51-9d09-71cad7026538',
        'Content-Type': 'application/json'
    }
})

const myId = await api.getUserID()

const popupWithImage = new PopupWithImage(popupImage)

// //Узнаем информацию юзера и добавляем 
function getUserInfo() {
    api.getUserInfo()
        .then(userInfo => {
            const userInformation = new UserInfo({ name: nameProfile, aboutMe: hobbyProfile, avatar: avatar })
            userInformation.setUserInfo(userInfo.name, userInfo.about, userInfo.avatar)
        })
        .catch((error) => console.error(`Ошибка: ${error}`))
}
const defaultCards = new Section({
    renderer: (item) => {
        defaultCards.addItem(createCard(item));
    }
}, cards)

//добавление начальных карточек с сервера
function addCards() {
    api.getCards()
        .then(data => {
            const revesrData = data.reverse()
            defaultCards.renderItems(revesrData)
        }
        )
        .catch((error) => console.error(`Ошибка: ${error}`))

}

let userId = ''
Promise.all([api.getUserInfo(), api.getCards()])
.then(([userData, initialCards]) => { 
        const userInformation = new UserInfo({ name: nameProfile, aboutMe: hobbyProfile, avatar: avatar })
        userInformation.setUserInfo(userData.name, userData.about, userData.avatar)
        const revesrData = initialCards.reverse()
        defaultCards.renderItems(revesrData)
        userId = userData._id
    })
.catch((error) => console.error(`Ошибка: ${error}`))

console.log(userId);

function createCard(item) {
    const card = new Card(item, {
        title: item.name, image: item.link, likes: item.likes, handleCardClick: () => {
            popupWithImage.open(item.link, item.name)
        }, confirmDelete:
            (cardInstanse) => {
                popupWithDelete.open();
                popupWithDelete.setHandleAction(
                    () => api.delete(cardInstanse.getID())
                        .then(() => {
                            cardInstanse.deleteButton()
                            popupWithDelete.close();
                        })
                        .catch((error) => console.error(`Ошибка: ${error}`))
                        .finally(() => popupWithDelete.resetDefaultText())
                )
            }, addLike: () => {
                if (cardElement.querySelector('.card__like').className == 'card__like card__like_active') {
                    api.deleteLike(item._id)
                        .then(() => {
                            card.likeButton()
                        })
                        .catch((error) => console.error(`Ошибка: ${error}`))
                } else {
                    api.addLike(item._id)
                        .then(() => {
                            card.likeButton()
                        })
                        .catch((error) => console.error(`Ошибка: ${error}`))
                }
            }
    }, cardTemplate, myId);
    const cardElement = card.generateCard();
    return cardElement
}

function updateAvatar() {
    submitButtonAvatar.textContent = 'Сохранение...'
    api.updateAvatar({ avatar: inputUrlAvatar.value })
        .then(ava => {
            avatar.style.backgroundImage = `url('${ava.avatar}')`;
        })
        .catch((error) => console.error(`Ошибка: ${error}`))
        .finally(() => {
            submitButtonAvatar.textContent = 'Сохранить'
            popupUpdateAvatar.close()
        })
}
//добавление юзером карточки
function addNewCard() {
    const data = popupFormPhoto._getInputValues();
    submitButtonAddphoto.textContent = 'Сохранение...'
    api.addCard({ name: data.nameAddPhoto, link: data.linkAddPhoto })
        .then(card => {

        })
        .catch((error) => console.error(`Ошибка: ${error}`))
        .finally(() => {
            submitButtonAddphoto.textContent = 'Сохранить'
            popupFormPhoto.close()
        })
}

// Валидация
const formAddPhoto = new FormValidator({
    errorClass: 'popup__input_invalid', disableButton: 'popup__submit-button_disabled',
    submitButton: submitButtonAddphoto, input: '.popup__input', inputsArray: inputsArrayAddPhoto
}, popupFormAddPhoto)
const formEditProfile = new FormValidator({
    errorClass: 'popup__input_invalid', disableButton: 'popup__submit-button_disabled',
    submitButton: submitButtonEditProfile, input: '.popup__input', inputsArray: inputsArrayEditProfile
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
    submitButtonEditProfile.textContent = 'Сохранение...'
    api.updateUserInfo({ name: inputNameProfile.value, about: inputHobbyProfile.value })
        .then(profile => { getUserInfo() })
        .catch((error) => console.error(`Ошибка: ${error}`))
        .finally(() => {
            submitButtonEditProfile.textContent = 'Сохранить'
            popFormEditProfile.close()
        })


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

const popupUpdateAvatar = new PopupWithForm(popupAvatar, () => {
    updateAvatar()

});

avatarIcon.addEventListener('click', () => {
    popupUpdateAvatar.open();
})

avatarIcon.addEventListener('mouseover', () => {
    avatarPen.classList.add('pencil_active')
})

avatarIcon.addEventListener('mouseout', () => {
    avatarPen.classList.remove('pencil_active')
})


popFormEditProfile.setEventListeners()
popupFormPhoto.setEventListeners()
popupWithImage.setEventListeners()
popupWithDelete.setEventListeners()
popupUpdateAvatar.setEventListeners()