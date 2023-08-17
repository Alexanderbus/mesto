export class Card {
    constructor({ title, image, likes, handleCardClick, confirmDelete, addLike }, template) {
        this._title = title;
        this._image = image;
        this._likes = likes;
        // this._ownerId = ownerId;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._confirmDelete = confirmDelete;
        this._addLike = addLike
    }

    // получаем структуру карточки
    _getTemplate() {
        const cardElement = this._template.content.querySelector('.card').cloneNode(true);

        return cardElement;
    }

    _checkLikeStatus() {
        this._likes.forEach(item => {
          if (item._id === this._myId) {
            this._cardLikeButton.classList.add("card__like-btn_active");
            return 
          }
        }) 
        this._counter.textContent = this._likesLength;
      }

    likeButton() {
        this._cardLike.classList.toggle('card__like_active');
    }

    checkLikeStatus() {
        this._likes.forEach(element => {
            if (element._id == this._myId) {
                this._cardLike.classList.add('card__like_active')
            }
        });
    }

    deleteButton() {
        this._element.remove();
    }

    _setEventListeners() {
        this._cardLike = this._element.querySelector('.card__like')
        this._cardLike.addEventListener('click', () => {
            this.likeButton();
            this._addLike()
        });
        this._element.querySelector('.card__trash').addEventListener('click', () => {
            // this._deleteButton();
            this._confirmDelete()
        });
        this._element.querySelector('.card__photo').addEventListener('click', () => {
            this._handleCardClick()
        }
        );
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.card__photo').src = this._image;
        this._element.querySelector('.card__text').textContent = this._title;
        this._element.querySelector('.card__photo').alt = this._title;
        this._element.querySelector('.card__likeNumbers').textContent = this._likes.length;
        
        return this._element;
    }

}

