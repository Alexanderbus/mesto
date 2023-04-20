//создаем удомную функию для открытия поп-апа
const openPopup = (popup) => { popup.classList.add('popup_opened') };
//создаем функцию для закрытия поп-апа
const closePopup = (popup) => { popup.classList.remove('popup_opened') };

const cardTemplate = document.querySelector('.card-template');
const cardsContainer = document.querySelector('.cards')

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
    const popupImage = document.querySelector('.pop-up-image')
    const popUpZoomTitle = document.querySelector('.pop-up-image__title');
    const popUpZoomImage = document.querySelector('.pop-up-image__pic');
    const handlePreviewPicture = (cardData) => {
        popUpZoomTitle.textContent = cardData.name;
        popUpZoomImage.src = cardData.link;
        openPopup(popupImage)
    }

    cardImage.addEventListener('click', () => {
        handlePreviewPicture(cardData)
    })

    //закрываем зум поп ап
    const closeZoomImage = popupImage.querySelector('.pop-up-image__closeBtn');
    closeZoomImage.addEventListener('click', () => {
        closePopup(popupImage)
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
const namePhotoPopup = document.querySelector('.pop-up-add-photo__input_role_name')
const linkPhotoPopup = document.querySelector('.pop-up-add-photo__input_role_link')

//открытие поп апа
buttonAddPhoto.addEventListener('click', function () {
    openPopup(popupAddPhoto);
    namePhotoPopup.value = '';
    linkPhotoPopup.value = '';
})

const closePopupAddPhoto = document.querySelector('.pop-up-add-photo__exit')
//закрытие поп апа
closePopupAddPhoto.addEventListener('click', function () {
    closePopup(popupAddPhoto);
})


function addNewCard(evt) {
    evt.preventDefault();
    if (linkPhotoPopup.value.startsWith('http') == 1) {
        const valueName = namePhotoPopup.value;
        const valueLink = linkPhotoPopup.value;
        const NewCard = {
            name: valueName,
            link: valueLink
        }
        closePopup(popupAddPhoto);
        addCard(createCard(NewCard))
    }
    else {
        namePhotoPopup.setAttribute("placeholder", 'Введите имя!');
        linkPhotoPopup.setAttribute("placeholder", 'ССЫЛКУ ВВЕДИ!');
        namePhotoPopup.value = '';
        linkPhotoPopup.value = '';
    }
}

editorAddPhoto.addEventListener('submit', addNewCard)

// попап редактирования профиля
const editProfileBtn = document.querySelector('.profile__button');
const popupEditProfile = document.querySelector('.pop-up-edit-profile');
const popupEditProfileEditor = document.EditProfile;
const InputNameProfile = popupEditProfileEditor.nameEditProfile;
const InputHobbyProfile = popupEditProfileEditor.aboutEditProfile;
const HobbyProfile = document.querySelector('.profile__whoau');
const nameProfile = document.querySelector('.profile__name');
const closePopupEdit = document.querySelector('.pop-up-edit-profile__exit');

//открытие поп апа
editProfileBtn.addEventListener('click', function () {
    openPopup(popupEditProfile);
    InputNameProfile.setAttribute("placeholder", 'Имя');
    InputHobbyProfile.setAttribute("placeholder", 'Хобби');
    InputNameProfile.value = nameProfile.textContent;
    InputHobbyProfile.value = HobbyProfile.textContent;
})

//функция по редактированию профиля
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    if (InputNameProfile.value.length > 0 && InputHobbyProfile.value.length > 0) {
        nameProfile.textContent = InputNameProfile.value;
        HobbyProfile.textContent = InputHobbyProfile.value;
        closePopup(popupEditProfile)
    } else {
        InputNameProfile.setAttribute("placeholder", 'Введите имя!');
        InputHobbyProfile.setAttribute("placeholder", 'Введите информацию о себе!');
    }
}

//запускаем функцию
popupEditProfileEditor.addEventListener('submit', handleFormSubmitProfile);

//кнопка закрыть попап
closePopupEdit.addEventListener('click', function () {
    closePopup(popupEditProfile);
})