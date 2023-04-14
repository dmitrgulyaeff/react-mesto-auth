import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <img
          className="profile__avatar"
          alt="Аватар"
          src={currentUser['avatar']}
        />
        <h1 className="profile__name">{currentUser['name']}</h1>
        <button
          className="profile__button-edit-profile"
          type="button"
          aria-label="Редактировать профиль"
          onClick={onEditProfile}
        ></button>
        <p className="profile__description">{currentUser['about']}</p>
        <button
          className="profile__button-add-place"
          type="button"
          aria-label="Добавить место"
          onClick={onAddPlace}
        ></button>
        <button
          className="profile__button-edit-avatar"
          onClick={onEditAvatar}
        ></button>
      </section>
      <section className="places">
        <ul className="places__list">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                key={card._id}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
