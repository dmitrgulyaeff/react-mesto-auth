import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import api from '../utils/api';
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import InfoTooltipPopup from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setСurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
    _id: '',
    cohort: '',
  });
  const [cards, setCards] = useState([]);

  const [isValid, setIsValid] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const [isApiRequestReceived, setIsApiRequestReceived] = useState(false);

  const [headerEmail, setHeaderEmail] = useState('');

  const handleTokenCheck = () => {
    setIsApiRequestReceived(false);
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsApiRequestReceived(true);
          if (res) {
            setHeaderEmail(res.data.email);
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
          }
        })
        .catch((err) => console.log('Токен не верен', err));
    } else {
      setLoggedIn(false);
      setIsApiRequestReceived(true);
    }
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    api
      .getProfileInfo()
      .then((req) => {
        setСurrentUser(req);
      })
      .catch((err) =>
        console.log('Ошибка получения информации о пользователе', err)
      );
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((req) => {
        setCards(req);
      })
      .catch((err) => console.log('Ошибка получения карточек', err));
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i['_id'] === currentUser['_id']);

    api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c['_id'] === card['_id'] ? newCard : c))
        );
      })
      .catch((err) => console.log('Ошибка добавления/снятия лайка', err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((req) => {
        if (req['message'] === 'Пост удалён') {
          setCards(cards.filter((c) => c['_id'] !== card['_id']));
        }
      })
      .catch((err) => console.log('Ошибка удаления карточки', err));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const handleUpdateUser = (newInfo) => {
    api
      .setProfileInfo(newInfo)
      .then((newInfo) => setСurrentUser(newInfo))
      .then(closeAllPopups)
      .catch((err) =>
        console.log('Ошибка редактирования информации о пользователе', err)
      );
  };

  const handleUpdateAvatar = (url) => {
    api
      .updateProfileAvatar(url)
      .then((newInfo) => setСurrentUser(newInfo))
      .then(closeAllPopups)
      .catch((err) =>
        console.log('Ошибка редактирования аватара пользователя', err)
      );
  };

  const handleAddPlaceSubmit = (newCard) => {
    return api
      .addNewCard(newCard)
      .then((nCard) => setCards([nCard, ...cards]))
      .then(closeAllPopups)
      .catch((err) => console.log('Ошибка удаления карточки', err));
  };

  const handleLogin = () => {
    handleTokenCheck();
  };

  const handleRegister = (valid) => {
    setIsValid(valid);
    setInfoTooltipPopupOpen(true);
  };

  const handleHeaderExit = () => {
    localStorage.clear();
    handleTokenCheck();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        handleHeaderExit={handleHeaderExit}
        email={headerEmail}
        isApiRequestReceived={isApiRequestReceived}
      />
      <main className="content">
        {isApiRequestReceived && (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute IsAllowed={loggedIn} path={'/sign-in'}>
                  <>
                    <Main
                      onEditProfile={() => {
                        setIsEditProfilePopupOpen(true);
                      }}
                      onAddPlace={() => {
                        setIsAddPlacePopupOpen(true);
                      }}
                      onEditAvatar={() => {
                        setIsEditAvatarPopupOpen(true);
                      }}
                      onCardClick={handleCardClick}
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                    />
                    <Footer />

                    <AddPlacePopup
                      isOpen={isAddPlacePopupOpen}
                      onClose={closeAllPopups}
                      onSubmit={handleAddPlaceSubmit}
                    />
                    <EditAvatarPopup
                      isOpen={isEditAvatarPopupOpen}
                      onClose={closeAllPopups}
                      onUpdateAvatar={handleUpdateAvatar}
                    />
                    <EditProfilePopup
                      isOpen={isEditProfilePopupOpen}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                    />

                    <ImagePopup
                      card={selectedCard}
                      isOpen={isImagePopupOpen}
                      onClose={closeAllPopups}
                    />
                  </>
                </ProtectedRoute>
              }
            />

            <Route
              path="/sign-up"
              element={
                <ProtectedRoute IsAllowed={!loggedIn} path={'/'}>
                  <Register handleRegister={handleRegister} replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sign-in"
              element={
                <ProtectedRoute IsAllowed={!loggedIn} path={'/'}>
                  <Login handleLogin={handleLogin} replace />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to={'/'} replace />} replace />
          </Routes>
        )}
        <InfoTooltipPopup
          name="info-tolltip"
          buttonText="Да"
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isValid={isValid}
        />
      </main>
    </CurrentUserContext.Provider>
  );
}

export default App;
