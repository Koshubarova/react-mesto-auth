import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <>
      <main className="content">
        <section className="profile">
          <button
            type="button"
            className="profile__photo-button"
            aria-label="Изменить аватар" onClick={onEditAvatar}
          >
            <img
              className="profile__photo"
              src={currentUser.avatar}
              alt="Фото профиля"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit"
              aria-label="Редактировать профиль" onClick={onEditProfile}
            />
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button type="button" className="profile__add" aria-label="Добавить фото" onClick={onAddPlace}/>
        </section>
        <section className="cards">
          {cards.map(data => {
            return (<Card key={data._id} card={data} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}  />)
          })}
        </section>
      </main>
    </>
  )
}

export default Main;