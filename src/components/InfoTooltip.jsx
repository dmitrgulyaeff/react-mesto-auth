import Error from '../images/svg/error.svg';
import Success from '../images/svg/success.svg';

function InfoTooltip({ name, isOpen, onClose, isValid }) {
  return (
    <section
      className={`popup popup_el_${name}${isOpen ? ' popup_opened' : ''}`}
    >
      <div className={`popup__inner popup__inner_type_form`}>
        <button
          className="popup__button-close"
          type="button"
          aria-label="Закрыть поп-ап"
          onClick={onClose}
        ></button>
        {<img className={`popup__image popup__image_el_${name}`} src={isValid ? Success : Error} alt={isValid ? 'Успешно' : 'Проблема'} />}
        <h2 className={`popup__title popup__title_el_${name}`}>
          {isValid ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
