export class Card {
    constructor({ title, image, handleCardClick }, template) {
        this._title = title;
        this._image = image;
        this._template = template;
        this._handleCardClick = handleCardClick;
    }

    // получаем структуру карточки
    _getTemplate() {
        const cardElement = this._template.content.querySelector('.card').cloneNode(true);

        return cardElement;
    }

    _likeButton() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _deleteButton() {
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._likeButton();
        });
        this._element.querySelector('.card__trash').addEventListener('click', () => {
            this._deleteButton();
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

        return this._element;
    }
}

