import { useEffect, useState } from "react";
import PopupWithForm from "../components/PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [ title, setTitle ] = useState('');
  const [ link, setLink ] = useState('');

  function handleChangeTitle(evt) {
    setTitle(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: title,
      link: link
    })
  }

  useEffect(() => {
    if(isOpen) {
      setTitle('');
      setLink('');
    }
  }, [isOpen])

  return (
    <PopupWithForm 
      name='add'
      title='Новое место'
      titleButton='Создать'
      isOpen = {isOpen} 
      onClose = {onClose}
      onSubmit = {handleSubmit} >
      <input
        type="text"
        id="card-name-input"
        className="popup__input popup__input_type_card-name"
        name="name"
        placeholder="Название"
        required=""
        minLength={2}
        maxLength={30}
        value={title}
        onChange={handleChangeTitle}
      />
      <span className="card-name-input-error popup__input-error" />
      <input
        type="url"
        id="link-input"
        className="popup__input popup__input_type_link"
        name="link"
        placeholder="Ссылка на картинку"
        required=""
        value={link}
        onChange={handleChangeLink}
      />
      <span className="link-input-error popup__input-error" />
    </PopupWithForm>
  )
}