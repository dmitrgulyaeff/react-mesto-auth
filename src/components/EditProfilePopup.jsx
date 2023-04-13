import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser['name']);
    setDescription(currentUser['about']);
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input
        id="profile-name-input"
        className="popup__form-input popup__form-input_el_name"
        type="text"
        placeholder="Имя"
        name="name"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        required
      />
      <span className="popup__form-input-error profile-name-input-error"></span>
      <input
        id="profile-description-input"
        className="popup__form-input popup__form-input_el_description"
        type="text"
        placeholder="О себе"
        name="description"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        required
      />
      <span className="popup__form-input-error profile-description-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
