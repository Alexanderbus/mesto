export class Card {
    constructor(data, { title, image, likes, handleCardClick, confirmDelete, addLike }, template, userID) {
        this._title = title;
        this._image = image;
        this._likes = likes;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._confirmDelete = confirmDelete;
        this._addLike = addLike
        this._cardId = data._id;
        this._userID = userID;
        this._ownerId = data.owner._id
    }

    // получаем структуру карточки
    _getTemplate() {
        const cardElement = this._template.content.querySelector('.card').cloneNode(true);
        return cardElement;
    }

    isLiked() {
        return this._cardLike.classList.contains('card__like_active')
    } 

    likeButton(data) {
        this._counterLike.textContent = data;
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
        this._cardPhoto = this._element.querySelector('.card__photo')
        this._counterLike = this._element.querySelector('.card__likeNumbers')
        this._cardLike.addEventListener('click', () => {
            // this.likeButton();
            this._addLike()
        });
        this._element.querySelector('.card__trash').addEventListener('click', () => {
            // this._deleteButton();
            this._confirmDelete(this)
        });
        this._cardPhoto.addEventListener('click', () => {
            this._handleCardClick()
        }
        );
    }

    getID() {
        return this._cardId
    }

    _addTrash() {
        if (this._userID == this._ownerId)
            this._element.querySelector('.card__trash').classList.add('card__trash_active')
    }

    _activateLike() {
        this._likes.forEach(element => {
            if (element._id == this._userID) {
                this._cardLike.classList.add('card__like_active')
            }
        })
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._cardPhoto.src = this._image;
        this._element.querySelector('.card__text').textContent = this._title;
        this._cardPhoto.alt = this._title;
        this._counterLike.textContent = this._likes.length;
        this._addTrash();
        this._activateLike();
        return this._element;
    }

}