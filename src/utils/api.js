class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _doFetch = (url, requestOptions) => {
    return fetch(url, requestOptions).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  // 1. Загрузка информации о пользователе с сервера
  getProfileInfo = () => {
    const url = this._baseUrl + '/users/me';
    const requestOptions = {
      method: 'GET',
      headers: this._headers,
    };

    return this._doFetch(url, requestOptions);
  };

  // 2. Загрузка карточек с сервера
  getInitialCards = () => {
    const url = this._baseUrl + '/cards';
    const requestOptions = {
      method: 'GET',
      headers: this._headers,
    };

    return this._doFetch(url, requestOptions);
  };

  // 3. Редактирование профиля
  setProfileInfo = ({ name, about }) => {
    const url = this._baseUrl + '/users/me';
    const raw = JSON.stringify({
      name: name,
      about: about,
    });
    const requestOptions = {
      method: 'PATCH',
      headers: this._headers,
      body: raw,
    };

    return this._doFetch(url, requestOptions);
  };

  // 4. Добавление новой карточки
  addNewCard = ({ name, link }) => {
    const url = this._baseUrl + '/cards';
    const raw = JSON.stringify({
      name: name,
      link: link,
    });
    const requestOptions = {
      method: 'POST',
      headers: this._headers,
      body: raw,
    };

    return this._doFetch(url, requestOptions);
  };

  // 7. Удалить карточку
  deleteCard = (idCard) => {
    const url = this._baseUrl + '/cards/' + idCard;
    const requestOptions = {
      method: 'DELETE',
      headers: this._headers,
    };
    return this._doFetch(url, requestOptions);
  };

  // 8. Поставить лайк
  _likeCard = (idCard) => {
    const url = this._baseUrl + '/cards/' + idCard + '/likes';
    const requestOptions = {
      method: 'PUT',
      headers: this._headers,
    };
    return this._doFetch(url, requestOptions);
  };

  // 8. Убрать лайк
  _unlikeCard = (idCard) => {
    const url = this._baseUrl + '/cards/' + idCard + '/likes';
    const requestOptions = {
      method: 'DELETE',
      headers: this._headers,
    };
    return this._doFetch(url, requestOptions);
  };

  // изменить лайк
  toggleLike = (idCard, isLiked) => {
    if (isLiked) {
      return this._likeCard(idCard);
    } else {
      return this._unlikeCard(idCard);
    }
  };

  // 9. Обновление аватара пользователя
  updateProfileAvatar = (photoLink) => {
    const url = this._baseUrl + '/users/me/avatar';
    const raw = JSON.stringify({
      avatar: photoLink,
    });
    const requestOptions = {
      method: 'PATCH',
      headers: this._headers,
      body: raw,
    };

    return this._doFetch(url, requestOptions);
  };
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: 'b67e047d-e0f1-46ee-a2b0-fa487b6441a0',
    'Content-Type': 'application/json',
  },
});

export default api;
