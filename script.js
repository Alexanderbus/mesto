let buttonpop = document.querySelector('.profile__button');
let openpop = document.querySelector('.pop-up');
let whoau = document.querySelector('.whoau');
let popwhoau = document.querySelector('.pop-up__whoau');
let nickname = document.querySelector('.name');
let popname = document.querySelector('.pop-up__name');
let closebutton = document.querySelector('.pop-up__exit');
let changhename = document.querySelector('.pop-up__edit');

buttonpop.addEventListener('click', (e) => { 
        openpop.classList.add('pop-up_opened'); 
        popname.setAttribute("placeholder", nickname.textContent);
        popwhoau.setAttribute("placeholder", whoau.textContent);
    })

let like = document.querySelector('.card__like');
like.addEventListener('click', (e) => { 
like.classList.toggle('card__like_active'); 
})

closebutton.addEventListener('click', (e) => { 
    openpop.classList.remove('pop-up_opened');
})

  closebutton.addEventListener('click', (e) => { 
    openpop.classList.remove('pop-up_opened');
})


changhename.addEventListener('click', (e) => {
    if (popname.value.length > 0 && popwhoau.value.length > 0) {
    nickname.textContent = popname.value 
    whoau.textContent = popwhoau.value
    popwhoau.value = '';
    popname.value = '';
    openpop.classList.remove('pop-up_opened');
    } else {
        openpop.classList.remove('pop-up_opened');
    }
})






    










    
    