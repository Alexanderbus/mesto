export class UserInfo {
  constructor({ name, aboutMe, avatar }) {
    this._name = name;
    this._aboutMe = aboutMe;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      aboutMe: this._aboutMe.textContent,
    }
  }

  setUserInfo(nameInput, aboutMeInput, urlAvatar) {
    this._name.textContent = nameInput;
    this._aboutMe.textContent = aboutMeInput;
    this._avatar.style.backgroundImage = `url(${urlAvatar})`
  }

  setAvatar(urlAvatar) {
    this._avatar.style.backgroundImage = `url(${urlAvatar})`
  }

  setNickName(name, about) {
    this._name.textContent = name;
    this._aboutMe.textContent = about;
  }
}