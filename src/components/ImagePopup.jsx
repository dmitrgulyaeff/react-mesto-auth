function ImagePopup({ card, onClose, isOpen }) {
  return (
    <section
      className={`popup${isOpen ? ' popup_opened' : ''} popup_el_zoom-image`}
    >
      <div className="popup__inner popup__inner_type_zoom-image">
        <button
          className="popup__button-close"
          type="button"
          aria-label="Закрыть поп-ап"
          onClick={onClose}
        ></button>
        <img
          className="popup__image"
          src={card ? card.link : ''}
          alt={card ? card.name : ''}
        />
        <p className="popup__image-description">{card ? card.name : ''}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
