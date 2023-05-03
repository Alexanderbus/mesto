function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

//создаем удомную функию для открытия поп-апа
const openPopup = (popup) => {
    popup.classList.add('popup_opened')
    // закрытие искейпа попапов
    document.addEventListener('keydown', (evt) => {closePopupByEsc(evt) })
}
//создаем функцию для закрытия поп-апа
const closePopup = (popup) => { 
    popup.classList.remove('popup_opened') 
    document.removeEventListener('keydown', closePopupByEsc)
};

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

// добавляем карточку на страницу
const addCard = (cardElement) => {
    cardsContainer.prepend(cardElement);
}

//делаем из массива первые 6 карточек
initialCards.forEach((card) => {
    addCard(createCard(card));
});

const buttonAddPhoto = document.querySelector('.profile__add-photo');
const popupAddPhoto = document.querySelector('.popup_add-photo')
const inputNameFormAddNewCard = document.querySelector('.popup__input_NameCard')
const inputLinkFormAddNewCard = document.querySelector('.popup__input_UrlCard')
const errorText = document.querySelectorAll('.popup__error')
const errorTextArray = Array.from(errorText)

//открытие поп апа
buttonAddPhoto.addEventListener('click', function () {
    editorAddPhoto.reset();
    inputNameFormAddNewCard.classList.remove('popup__input_invalid')
    inputLinkFormAddNewCard.classList.remove('popup__input_invalid')
    errorTextArray.forEach((errorTextArray) => {
        errorTextArray.textContent = '';
    })
    openPopup(popupAddPhoto);
})

// добавление юзером карточки
function addNewCard(evt) {
    evt.preventDefault();
    const valueName = inputNameFormAddNewCard.value;
    const valueLink = inputLinkFormAddNewCard.value;
    const newCard = {
        name: valueName,
        link: valueLink
    }
    closePopup(popupAddPhoto);
    addCard(createCard(newCard))
}

const editorAddPhoto = document.querySelector('.popup__form_add-photo')
editorAddPhoto.addEventListener('submit', addNewCard)

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

const popups = document.querySelectorAll('.popup')
const popupsArray = Array.from(popups)

popupsArray.forEach((popup) => {
popup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup)
    }
  })
})
