import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  
  const input = useRef();

  function handleSubmitAvatar(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: input.current.value });
  }

  useEffect(() => {
    input.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm 
      name='edit-photo'
      title='Обновить аватар'
      titleButton='Сохранить'
      isOpen = {isOpen} 
      onClose = {onClose}
      onSubmit={handleSubmitAvatar} >
      <input
        ref = {input}
        type="url"
        id="photo-input"
        className="popup__input popup__input_type_photo"
        name="photo"
        placeholder="Ссылка на новое фото"
        required=""
      />
      <span className="photo-input-error popup__input-error" />
    </PopupWithForm>
  )
}