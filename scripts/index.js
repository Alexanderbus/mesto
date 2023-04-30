//создаем удомную функию для открытия поп-апа
const openPopup = (popup) => { popup.classList.add('popup_opened') };
//создаем функцию для закрытия поп-апа
const closePopup = (popup) => { popup.classList.remove('popup_opened') };

const cardTemplate = document.querySelector('.card-template');
const cardsContainer = document.querySelector('.cards')
const popupImage = document.querySelector('.pop-up-image')
const popUpZoomTitle = document.querySelector('.pop-up-image__title');
const popUpZoomImage = document.querySelector('.pop-up-image__pic');
//закрываем зум поп ап
const buttonCloseZoomImage = popupImage.querySelector('.pop-up-image__closeBtn');
buttonCloseZoomImage.addEventListener('click', () => {
    closePopup(popupImage)
})
//создаем карту
const createCard = (cardData) => {
    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
    const cardName = cardElement.querySelector('.card__text');
    const cardImage = cardElement.querySelector('.card__photo');
    cardName.textContent = cardData.name;
    cardImage.src = cardData.link;

    //кнопка лайк
    const likeButton = cardElement.querySelector('.card__like');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like_active');
    })

    //кнопка удалить карточку
    const delButton = cardElement.querySelector('.card__trash')
    delButton.addEventListener('click', () => {
        cardElement.remove();
    })

    //отркрываем зум поп ап
    const handlePreviewPicture = (cardData) => {
        popUpZoomTitle.textContent = cardData.name;
        popUpZoomImage.src = cardData.link;
        openPopup(popupImage)
    }

    cardImage.addEventListener('click', () => {
        handlePreviewPicture(cardData)
    })

    //запускаем
    return cardElement;
}

const addCard = (cardElement) => {
    cardsContainer.prepend(cardElement);
}

//делаем из массива первые 6 карточек
initialCards.forEach((card) => {
    addCard(createCard(card));
});

const buttonAddPhoto = document.querySelector('.profile__add-photo');
const popupAddPhoto = document.querySelector('.pop-up-add-photo')
const inputNameFormAddNewCard = document.querySelector('.pop-up-add-photo__input_role_name')
const inputLinkFormAddNewCard = document.querySelector('.pop-up-add-photo__input_role_link')
const errorTextAddPhoto = document.querySelectorAll('.pop-up-add-photo__error')
const errorTextAddPhotoArray = Array.from(errorTextAddPhoto)

//открытие поп апа
buttonAddPhoto.addEventListener('click', function () {
    openPopup(popupAddPhoto);
    editorAddPhoto.reset();
    inputNameFormAddNewCard.classList.remove('popup__input_invalid')
    inputLinkFormAddNewCard.classList.remove('popup__input_invalid')
    errorTextAddPhotoArray.forEach((errorTextAddPhotoArray) => {
        errorTextAddPhotoArray.textContent = '';
        })
})

const closePopupAddPhoto = document.querySelector('.pop-up-add-photo__exit')
//закрытие поп апа
closePopupAddPhoto.addEventListener('click', function () {
    closePopup(popupAddPhoto);
})


function addNewCard(evt) {
    evt.preventDefault();
    if (inputLinkFormAddNewCard.value.startsWith('http') == 1) {
        const valueName = inputNameFormAddNewCard.value;
        const valueLink = inputLinkFormAddNewCard.value;
        const newCard = {
            name: valueName,
            link: valueLink
        }
        closePopup(popupAddPhoto);
        addCard(createCard(newCard))
    }
    else {
        inputNameFormAddNewCard.setAttribute("placeholder", 'Введите имя!');
        inputLinkFormAddNewCard.setAttribute("placeholder", 'ССЫЛКУ ВВЕДИ!');
        editorAddPhoto.reset();
    }
}

editorAddPhoto.addEventListener('submit', addNewCard)

// попап редактирования профиля
const editProfileBtn = document.querySelector('.profile__button');
const popupEditProfile = document.querySelector('.pop-up-edit-profile');
const formPopupProfile = document.EditProfile;
const inputNameProfile = formPopupProfile.nameEditProfile;
const inputHobbyProfile = formPopupProfile.aboutEditProfile;
const hobbyProfile = document.querySelector('.profile__whoau');
const nameProfile = document.querySelector('.profile__name');
const closePopupEdit = document.querySelector('.pop-up-edit-profile__exit');
const errorTextEditProfile = document.querySelectorAll('.pop-up-edit-profile__error')
const errorTextEditProfilerray = Array.from(errorTextEditProfile)

//открытие поп апа
editProfileBtn.addEventListener('click', function () {
    openPopup(popupEditProfile);
    inputNameProfile.setAttribute("placeholder", 'Имя');
    inputHobbyProfile.setAttribute("placeholder", 'Хобби');
    EditProfile.reset()
    inputNameProfile.classList.remove('popup__input_invalid')
    inputHobbyProfile.classList.remove('popup__input_invalid')
    errorTextEditProfilerray.forEach((errorTextEditProfilerray) => {
        errorTextEditProfilerray.textContent = '';
        })
})

//функция по редактированию профиля
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    if (inputNameProfile.value.length > 0 && inputHobbyProfile.value.length > 0) {
        nameProfile.textContent = inputNameProfile.value;  
        hobbyProfile.textContent = inputHobbyProfile.value;
        closePopup(popupEditProfile)
    } else {
        inputNameProfile.setAttribute("placeholder", 'Введите имя!');
        inputHobbyProfile.setAttribute("placeholder", 'Введите информацию о себе!');
    }
}

//запускаем функцию
//запускаем функцию
formPopupProfile.addEventListener('submit', handleFormSubmitProfile);

//кнопка закрыть попап
closePopupEdit.addEventListener('click', function () {
    closePopup(popupEditProfile);
})