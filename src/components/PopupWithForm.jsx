function PopupWithForm({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onSubmit,
  onClose,
}) {
  return (
    <section
      className={`popup popup_el_${name}${isOpen ? ' popup_opened' : ''}`}
    >
      <div className="popup__inner popup__inner_type_form">
        <button
          className="popup__button-close"
          type="button"
          aria-label="Закрыть поп-ап"
          onClick={onClose}
        ></button>
        <h2 className={`popup__title popup__title_el_${name}`}>{title}</h2>
        <form className="popup__form" onSubmit={onSubmit} name={name}>
          {children}
          <button
            className={`popup__form-button-submit popup__form-button-submit_el_${name}`}
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
