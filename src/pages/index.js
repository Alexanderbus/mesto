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
// const deleteButton = document.querySelector('.popup__submit-button_delete-card')
const avatarIcon = document.querySelector('.avatar')
const avatarPen = document.querySelector('.pencil')
const popupAvatar = document.querySelector('.popup_avatar')
const formPopupAvatar = document.querySelector('.popup__form_avatar')
const inputUrlAvatar = formPopupAvatar.avatarURL
const inputUrlAvatarArray = Array.from(inputUrlAvatar)
const submitButtonAvatar = formPopupAvatar.querySelector('.popup__submit-button_avatar')

import { Card } from '../components/Сard.js';
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api.js'
import { PopupWithDelete } from '../components/PopupWithDelete.js'

const popupUpdateAvatar = new PopupWithForm(popupAvatar, () => {
    updateAvatar()

});

const popupWithDelete = new PopupWithDelete(popupConfirmDeleteCatd, null)

// const popupDeleteCard = new PopupDeleteCard(popupConfirmDeleteCatd)

const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-70',
    headers: {
        authorization: '96b2927c-f9e2-4c51-9d09-71cad7026538',
        'Content-Type': 'application/json'
    }
})

// const editProfile = new UserInfo({ name: nameProfile, aboutMe: hobbyProfile })
const userInformation = new UserInfo({ name: nameProfile, aboutMe: hobbyProfile, avatar: avatar })
const popupWithImage = new PopupWithImage(popupImage)

// //Узнаем информацию юзера и добавляем 
function getUserInfo() {
    api.getUserInfo()
        .then(userInfo => {
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
        userId = userData._id
        const userInformation = new UserInfo({ name: nameProfile, aboutMe: hobbyProfile, avatar: avatar })
        userInformation.setUserInfo(userData.name, userData.about, userData.avatar)
        const revesrData = initialCards.reverse()
        defaultCards.renderItems(revesrData)
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
                        .then((data) => {
                            card.likeButton(data.likes.length)
                        })
                        .catch((error) => console.error(`Ошибка: ${error}`))
                } else {
                    api.addLike(item._id)
                        .then((data) => {
                            card.likeButton(data.likes.length)
                        })
                        .catch((error) => console.error(`Ошибка: ${error}`))
                }
            }
    }, cardTemplate, userId);
    const cardElement = card.generateCard();
    return cardElement
}

function updateAvatar() {
    submitButtonAvatar.textContent = 'Сохранение...'
    const data = popupUpdateAvatar.getInputValues();
    api.updateAvatar({ avatar: data.avatarURL })
        .then(ava => {
            avatar.style.backgroundImage = `url('${ava.avatar}')`;
            popupUpdateAvatar.close()
        })
        .catch((error) => console.error(`Ошибка: ${error}`))
        .finally(() => {
            submitButtonAvatar.textContent = 'Сохранить'
        })
}
//добавление юзером карточки
function addNewCard() {
    const data = popupFormPhoto.getInputValues();
    submitButtonAddphoto.textContent = 'Сохранение...'
    api.addCard({ name: data.nameAddPhoto, link: data.linkAddPhoto })
        .then(card => {
            defaultCards.addItem(createCard(card))
            popupFormPhoto.close()
        })
        .catch((error) => console.error(`Ошибка: ${error}`))
        .finally(() => {
            submitButtonAddphoto.textContent = 'Сохранить'
        })
}

// Валидация
const formAddPhoto = new FormValidator({
    submitButton: submitButtonAddphoto, inputsArray: inputsArrayAddPhoto 
}, popupFormAddPhoto)
const formEditProfile = new FormValidator({
    submitButton: submitButtonEditProfile, inputsArray: inputsArrayEditProfile 
}, popupFormEditProfile)
const formAvatar = new FormValidator({
    submitButton: submitButtonAvatar, inputsArray: inputUrlAvatarArray 
}, formPopupAvatar)

function launchValidation(form) {
    form.enableValidation()
}

launchValidation(formAddPhoto)
launchValidation(formEditProfile)
launchValidation(formAvatar)


const popupFormPhoto = new PopupWithForm(popupAddPhoto, () => {
    addNewCard()

});

buttonAddPhoto.addEventListener('click', () => {
    popupFormPhoto.open()
    formAddPhoto.disableButton() // если я это уберу, кнопка будет активной при открытии поп-апа, это написано у меня четко по вебинару от куратора
    formAddPhoto.resetError()
})

const popFormEditProfile = new PopupWithForm(popupEditProfile, () => {
    handleFormSubmitProfile();
});

function handleFormSubmitProfile() {
    submitButtonEditProfile.textContent = 'Сохранение...'
    const data = popFormEditProfile.getInputValues()
    api.updateUserInfo({ name: data.nameEditProfile, about: data.aboutEditProfile })
        .then(profile => {
            getUserInfo();
            popFormEditProfile.close()
        })
        .catch((error) => console.error(`Ошибка: ${error}`))
        .finally(() => {
            submitButtonEditProfile.textContent = 'Сохранить'
        })


}

editProfileBtn.addEventListener('click', () => {
    popFormEditProfile.open()
    formEditProfile.disableButton()
    formEditProfile.resetError()
    const nameInfo = userInformation.getUserInfo()
    inputNameProfile.value = nameInfo.name;
    inputHobbyProfile.value = nameInfo.aboutMe;
}
)

avatarIcon.addEventListener('click', () => {
    popupUpdateAvatar.open();
    formAvatar.disableButton();
    formAvatar.resetError()
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