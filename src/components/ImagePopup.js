export default function ImagePopup({ card, isOpen, onClose}) {
  return (
  <div className={`popup popup_fullscreen ${isOpen ? 'popup_opened' : ''}`}>
    <div className="popup__container popup__container_type_image">
      <button className="popup__close popup__close-image" type="button" onClick={onClose} />
      <img src={card.link} className="popup__image" alt={`Изображение ${card.name}`} />
      <h2 className="popup__image-name">{card.name}</h2>
    </div>
  </div>
  )
}