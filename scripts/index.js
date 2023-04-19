// все связанное с карточками
const initialCards = [
    {
        name: '1 капибара',
        link: 'https://animals.pibig.info/uploads/posts/2023-04/thumbs/1680614581_animals-pibig-info-p-grizun-kapibara-zhivotnie-pinterest-1.jpg'
    },
    {
        name: '2 капибары',
        link: 'https://api.360tv.ru/get_resized/480bwHYWmy6mtHqJ8gMbR4Wg-oWZtH46xCsEbpL7kXw/rs:fill-down:1920:1080/g:fp:0.5:0.5/aHR0cHM6Ly8yNTc4MjQuc2VsY2RuLnJ1L2JhYnlsb24tbWVkaWEvaW1hZ2VzL2FydGljbGVzL2NvdmVyL2I3MDcxMTYwLTg3OGItNGI1NC1iYjY3LTU3MjQyODM5NGU3Yy9jYXB5YmFyYS02MDkxODcyXzE5MjAuanBn.webp'
    },
    {
        name: '3 капибары',
        link: 'https://c0.wallpaperflare.com/preview/638/845/68/animals-capybara-close-up-cute.jpg'
    },
    {
        name: '4 капибары',
        link: 'https://i.pinimg.com/originals/ac/6f/da/ac6fdaaaa8cf86fb95558b9028b4f993.jpg'
    },
    {
        name: '5 капибар',
        link: 'https://cojo.ru/wp-content/uploads/2022/12/vodosvinka-kapibara-amazonka-1.webp'
    },
    {
        name: 'стая капибар',
        link: 'https://cojo.ru/wp-content/uploads/2022/12/kapibara-zhivotnoe-1.webp'
    }
];

//создаем удомную функию для открытия поп апа
const openPopup = (popup) => {
    popup.classList.add('pop-up_opened');
}

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
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like_active');
    })

    const delButton = cardElement.querySelector('.card__trash')
    delButton.addEventListener('click', () => {
        cardElement.remove();
    })

    const popupImage = document.querySelector('.pop-up-image').cloneNode(true);;
    const popTitle = popupImage.querySelector('.pop-up-image__title');
    const popPic = popupImage.querySelector('.pop-up-image__pic');
    const page = document.querySelector('.page');
    const CloseBtn3 = popupImage.querySelector('.pop-up-image__closeBtn');
    popTitle.innerHTML = cardData.name;
    popPic.src = cardData.link;

    cardImage.addEventListener('click', () => {
        openPopup(popupImage)
    })

    page.append(popupImage)

    CloseBtn3.addEventListener('click', () => {
       popupImage.classList.remove('pop-up_opened')
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
const namePhoto = document.querySelector('.pop-up-2__input_role_name')
const linkPhoto = document.querySelector('.pop-up-2__input_role_link')

//открытие поп апа
addPhoto.addEventListener('click', function () {
    openPopup(popup2);
    namePhoto.value = '';
    linkPhoto.value = '';
})

const closeBtn2 = document.querySelector('.pop-up-2__exit')
//закрытие поп апа
closeBtn2.addEventListener('click', function () {
    popup2.classList.remove('pop-up_opened');
})


function addNewCard(evt) {
    evt.preventDefault();
    if (linkPhoto.value.startsWith('http') == 1) {
        const valueName = namePhoto.value;
        const valueLink = linkPhoto.value;
        const NewCard = {
            name: valueName,
            link: valueLink
        }
        popup2.classList.remove('pop-up_opened');
        addCard(createCard(NewCard))
    }
    else {
        namePhoto.setAttribute("placeholder", 'Введите имя!');
        linkPhoto.setAttribute("placeholder", 'ССЫЛКУ ВВЕДИ!');
        namePhoto.value = '';
        linkPhoto.value = '';
    }
}

editor2.addEventListener('submit', addNewCard)

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