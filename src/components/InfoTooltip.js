import React from "react";
import successImage from '../images/success.svg';
import errorImage from '../images/error.svg';

export default function InfoTooltip({isOpen, onClose, isError}) {
  return (
    <div className={`popup popup-info-tooltip${isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        {isError
          ?
          <>
            <img src={errorImage} alt="Неудача" className="info-tooltip__img"/>
            <p className="info-tooltip__text">Что-то пошло не так!<br/>Попробуйте ещё раз.</p>
          </>
          :
          <>
            <img src={successImage} alt="Успех" className="info-tooltip__img"/>
            <p className="info-tooltip__text">Вы успешно зарегистрировались!</p>
          </>
        }
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
      {isOpen}
    </div>
  )
}
