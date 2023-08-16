import React from "react";
import successImage from '../images/success.svg';
import errorImage from '../images/error.svg';

export default function InfoTooltip({isOpen, onClose, isError}) {
  return (
    <div className={`popup popup-info-tooltip${isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <img src={isError ? errorImage : successImage} className="info-tooltip__img"/>
        <p className="info-tooltip__text">{isError ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}</p>
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  )
}
