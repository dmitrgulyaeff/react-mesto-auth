import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onSubmit }) {
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name: cardName, link: cardLink });
      }}
      onClose={onClose}
    >
      <input
        id="place-name-input"
        className="popup__form-input popup__form-input_el_place-name"
        type="text"
        placeholder="Название"
        name="cardName"
        minLength="2"
        maxLength="30"
        value={cardName}
        onChange={(e) => {
          setCardName(e.target.value);
        }}
        required
      />
      <span className="popup__form-input-error place-name-input-error"></span>
      <input
        id="place-url-input"
        className="popup__form-input popup__form-input_el_place-picture-url"
        type="url"
        placeholder="Ссылка на картинку"
        name="cardPictureUrl"
        value={cardLink}
        onChange={(e) => {
          setCardLink(e.target.value);
        }}
        required
      />
      <span className="popup__form-input-error place-url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
