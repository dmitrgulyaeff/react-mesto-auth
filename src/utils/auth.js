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

  // register
  register({ email, password }) {
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

  // login
  login({ email, password }) {
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

  // checkToken
  checkToken(token) {
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
