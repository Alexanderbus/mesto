let editProfileBtn = document.querySelector('.profile__button');
let popup = document.querySelector('.pop-up');
let editor = document.editor;
let myname = editor.name;
let about = editor.about;
let whoAU = document.querySelector('.profile__whoau');
let nickName = document.querySelector('.profile__name');
let closeBtn = document.querySelector('.pop-up__exit');

//открытие поп апа
editProfileBtn.addEventListener('click', function() {
    popup.classList.add('pop-up_opened');
    myname.value = nickName.textContent;
    about.value = whoAU.textContent;
})

//функция по редактированию профиля
function handleFormSubmit (evt) {
    evt.preventDefault();
    if (myname.value.length > 0 && about.value.length > 0) {
    nickName.textContent = myname.value;
    whoAU.textContent = about.value;
    popup.classList.remove('pop-up_opened');
} else {
    myname.setAttribute("placeholder", 'Введите имя!');
    about.setAttribute("placeholder", 'Введите информацию о себе!');
}
}

//запускаем функцию
editor.addEventListener('submit', handleFormSubmit);

//кнопка закрыть попап
closeBtn.addEventListener('click',  function(){ 
    popup.classList.remove('pop-up_opened');
})