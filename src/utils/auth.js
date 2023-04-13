class Auth {
  constructor() {
    this._baseUrl = 'https://auth.nomoreparties.co/';
  }

  _doFetch = (url, requestOptions) => {
    return fetch(url, requestOptions).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  // registration
  registration({ email, password }) {
    const url = this._baseUrl + 'signup';
    const raw = JSON.stringify({ email, password });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: raw,
    };
    return this._doFetch(url, requestOptions);
  }

  // authorization
  authorization({ email, password }) {
    const url = this._baseUrl + 'signin';
    const raw = JSON.stringify({ email, password });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: raw,
    };
    return this._doFetch(url, requestOptions);
  }

  // authentication
  authentication(token) {
    const url = this._baseUrl + 'users/me';
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return this._doFetch(url, requestOptions);
  }
}

const auth = new Auth();

export default auth;
