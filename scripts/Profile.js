let editProfileBtn = document.querySelector('.profile__button');
let popup = document.querySelector('.pop-up');
let editor = document.editor;
let name = editor.name;
let about = editor.about;
let whoau = document.querySelector('.profile__whoau');
let nickname = document.querySelector('.profile__name');
let changheprofile = document.querySelector('.pop-up__edit');
let editheader = document.querySelector('.pop-up__header');
let closebutton = document.querySelector('.pop-up__exit');

//открытие поп апа
editProfileBtn.addEventListener('click', function() {
    popup.classList.add('pop-up_opened');
    name.setAttribute("placeholder", nickname.textContent);
    about.setAttribute("placeholder", whoau.textContent);
})

//функция по редактированию профиля
function handleFormSubmit (evt) {
    evt.preventDefault();
    if (name.value.length > 0 && about.value.length > 0) {
    nickname.textContent = name.value;
    whoau.textContent = about.value;
    popup.classList.remove('pop-up_opened');
    name.value = '';
    about.value = ''; 
} else {
    name.setAttribute("placeholder", 'Введите имя!');
    about.setAttribute("placeholder", 'Введите кто вы!');
}
}

//запускаем функцию
editor.addEventListener('submit', handleFormSubmit);

//кнопка закрыть попап
closebutton.addEventListener('click',  function(){ 
    popup.classList.remove('pop-up_opened');
})