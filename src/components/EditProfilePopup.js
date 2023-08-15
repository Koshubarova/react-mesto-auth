
import { useContext, useState, useEffect, useCallback } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [values, setValues] = useState({});
    const resetForm = useCallback(() => {
        setValues({});
    }, []);
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
        username: name,
        description: description,
        });
    }
        useEffect(() => {
            if (!isOpen) {
            resetForm();
            }
        }, [isOpen, resetForm]);

    return (
        <PopupWithForm 
            name='edit'
            title='Редактировать профиль'
            titleButton='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input
                type="text"
                id="username-input"
                className="popup__input popup__input_type_name"
                name="username"
                placeholder="Имя"
                required=""
                minLength={2}
                maxLength={40}
                value={name || ""}
                onChange={handleChangeName}
            />
            <span className="username-input-error popup__input-error" />
            <input
                type="text"
                id="description-input"
                className="popup__input popup__input_type_job"
                name="description"
                placeholder="Деятельность"
                required=""
                minLength={2}
                maxLength={200}
                value={description || ""}
                onChange={handleChangeDescription}
            />
            <span className="description-input-error popup__input-error" />
        </PopupWithForm>
    )
}