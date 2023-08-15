export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose, onSubmit }) {

  const handleCloseByOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
  <div id="popup-profile" className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handleCloseByOverlay} >
    <div className="popup__container">
      <button
        type="button"
        className="popup__close popup__close-edit"
        aria-label="Закрыть форму" onClick={onClose}
      />
      <h3 className="popup__name">{title}</h3>
      <form
        className={`popup__form popup__form-${name}`}
        name="profile"
        noValidate=""
        onSubmit={onSubmit} >
        {children}
        <button type="submit" className="popup__submit">
          {titleButton}
        </button>
      </form>
    </div>
  </div>
  )
}