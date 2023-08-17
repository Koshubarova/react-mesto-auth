import { useState, useEffect } from 'react';
import api from '../utils/api';
import auth from '../utils/auth';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from '../components/PopupWithForm';
import ImagePopup from '../components/ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import Register from '../components/Register';
import InfoTooltip from '../components/InfoTooltip';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopupOpen, setImagePopupOpen] = useState(false)

  const [currentUser, setCurrentUser] = useState({})
  const [userEmail, setUserEmail] = useState("")
  const [isRegistrationError, setIsRegistrationError] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [cards, setCards] = useState([])

  const navigate = useNavigate();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setImagePopupOpen(true)
  }

  function openInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setImagePopupOpen(false)
    setIsInfoTooltipOpen(false)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if(!isLiked) {
      api.addLike(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(err))
    }
    else {
      api.deleteLike(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(err))
    }
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch(err => console.log(err));
  };

  function handleUpdateUser(dataUser) {
    api.setUserInfo(dataUser)
    .then(res => {
      setCurrentUser(res)
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(dataUser) {
    api.setPhoto(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleAddCard(dataCard) {
    api.addNewCard(dataCard)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([dataUser, dataCard]) => {
          setCards(dataCard);
          setCurrentUser(dataUser);
        })
        .catch((err) => console.log(err))}
  }, [isLoggedIn]);

  useEffect(() => {
    checkToken();
  }, [])

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setUserEmail(res.data.email);
          navigate("/", {replace: true})
        })
        .catch(err => console.log(err));
    }
  }

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/signin');
    isLoggedIn(false);
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        setIsRegistrationError(false);
        openInfoTooltip();
        navigate('/signin', {replace: true});
      })
      .catch(() => {
        setIsRegistrationError(true);
        openInfoTooltip();
      });
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then(() => {
        setIsLoggedIn(true);
        setUserEmail(email);
        navigate('/', {replace: true});
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          signOut={signOut}
        />

        <Routes>
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route 
            path="/signin" 
            element={<Login onLogin={handleLogin} />} />
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/signin"} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike = {handleCardLike}
                onCardDelete ={handleCardDelete}
                signOut={signOut}
              />
            }
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen = {isEditProfilePopupOpen} 
          onClose = {closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup 
          isOpen = {isEditAvatarPopupOpen} 
          onClose = {closeAllPopups}
          onUpdateAvatar = {handleUpdateAvatar} />

        <AddPlacePopup 
          isOpen = {isAddPlacePopupOpen} 
          onClose = {closeAllPopups}
          onAddPlace = {handleAddCard} />

        <PopupWithForm 
          name='delete'
          title='Вы уверены?'
          titleButton='Да'
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}>
        </PopupWithForm>

        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isError={isRegistrationError}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
