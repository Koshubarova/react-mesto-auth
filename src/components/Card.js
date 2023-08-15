import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonActive = `cards__delete-button ${isOwn ? "hover" : ""}`;
  const cardLikeButtonActive = `cards__like-button ${isLiked ? 'cards__like-button_active' : ''}`

  const handleClick = () => {
    onCardClick({link: card.link, name: card.name});
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (
    <div className="cards__item">
      <img className="cards__image" src={card.link} alt={`Изображение ${card.name}`} 
        onClick={handleClick} />
      {isOwn && <button type='button' className={cardDeleteButtonActive} onClick={handleDeleteClick} />} 
      <div className="cards__info">
        <h2 className="cards__name">{card.name}</h2>
        <button type="button" className={cardLikeButtonActive} onClick={handleLikeClick} />
        <h3 className="cards__like-counter">{card.likes.length}</h3>
      </div>
    </div>
  )
}