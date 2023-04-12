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
    popup.classList.add('pop-up_opened');
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