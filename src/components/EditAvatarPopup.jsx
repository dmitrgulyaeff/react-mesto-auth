import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const refInput = useRef();

  useEffect(() => {
    refInput.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(refInput.current.value);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input
        ref={refInput}
        id="avatar-url-input"
        className="popup__form-input popup__form-input_el_avatar-picture-url"
        type="url"
        placeholder="Ссылка на картинку"
        name="avatarPictureUrl"
        required
      />
      <span className="popup__form-input-error avatar-url-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
