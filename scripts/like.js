// кнопка like
let like = document.querySelectorAll('.card__like');
like.forEach(like => { 
        like.addEventListener('click', (e) => { 
            like.classList.toggle('card__like_active'); 
            })
      });  