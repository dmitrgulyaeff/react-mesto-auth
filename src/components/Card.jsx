import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__button-like ${
    isLiked && 'place__button-like_liked'
  }`;
  return (
    <li className="places__list-item">
      <article className="place">
        {isOwn && (
          <button
            className="place__button-delete-place"
            type="button"
            aria-label="Удалить"
            onClick={() => {
              onCardDelete(card);
            }}
          ></button>
        )}
        <img
          className="place__photo"
          src={card.link}
          alt={card.name}
          onClick={() => onCardClick(card)}
        />
        <p className="place__number-likes">{card.likes.length}</p>
        <h2 className="place__name">{card.name}</h2>
        <button
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Лайк"
          onClick={() => {
            onCardLike(card);
          }}
        ></button>
      </article>
    </li>
  );
}

export default Card;
