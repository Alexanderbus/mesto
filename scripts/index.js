// все связанное с карточками
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardTemplate = document.querySelector('.card-template');
const cardsContainer = document.querySelector('.cards')

//создаем карту
const createCard = (cardData) => {
    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
    const cardName = cardElement.querySelector('.card__text');
    const cardImage = cardElement.querySelector('.card__photo');
    cardName.innerHTML = cardData.name;
    cardImage.src = cardData.link;

    //кнопка лайк
    const likeButton = cardElement.querySelector('.card__like');
    likeButton.addEventListener('click', ()=> {
        likeButton.classList.toggle('card__like_active');
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

const addPhoto = document.querySelector('.profile__add-photo');
const popup2 = document.querySelector('.pop-up-2')

//создаем удомную функию для открытия поп апа
const openPopup = (popup) => {
    popup.classList.add('pop-up_opened');
}

//открытие поп апа
addPhoto.addEventListener('click', function () {
    openPopup(popup2);
})

const closeBtn2 = document.querySelector('.pop-up-2__exit')
//закрытие поп апа
closeBtn2.addEventListener('click', function () {
    popup2.classList.remove('pop-up_opened');
})

const editor2 = document.editor2;

function addNewCard(evt) {
    evt.preventDefault();
    const namePhoto = editor2.name2;
    const linkPhoto = editor2.link;
    const valueName = namePhoto.value;
    const valueLink = linkPhoto.value;
    const NewCard = {
        name: valueName,
        link: valueLink
    }
    popup2.classList.remove('pop-up_opened');
    addCard(createCard(NewCard))
}

editor2.addEventListener('submit', addNewCard);

// попап редактирования профиля
let editProfileBtn = document.querySelector('.profile__button');
let popup = document.querySelector('.pop-up');
let editor = document.editor;
let myName = editor.name;
let about = editor.about;
let whoAU = document.querySelector('.profile__whoau');
let nickName = document.querySelector('.profile__name');
let closeBtn = document.querySelector('.pop-up__exit');

//открытие поп апа
editProfileBtn.addEventListener('click', function () {
    openPopup(popup);
    myName.value = nickName.textContent;
    about.value = whoAU.textContent;
})

//функция по редактированию профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    if (myName.value.length > 0 && about.value.length > 0) {
        nickName.textContent = myName.value;
        whoAU.textContent = about.value;
        popup.classList.remove('pop-up_opened');
    } else {
        myName.setAttribute("placeholder", 'Введите имя!');
        about.setAttribute("placeholder", 'Введите информацию о себе!');
    }
}

//запускаем функцию
editor.addEventListener('submit', handleFormSubmit);

//кнопка закрыть попап
closeBtn.addEventListener('click', function () {
    popup.classList.remove('pop-up_opened');
})

