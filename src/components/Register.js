import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function Register({onRegister}) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue.email, formValue.password);
  }

  return (
    <>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form name="register"
          className="auth__form"
          noValidate
          onSubmit={handleSubmit}>
          <div className="auth__input-container">
            <input type="email"
              name="email"
              placeholder="Email"
              className="auth__input"
              onChange={handleChange}
              value={formValue.email}/>
            <input type="password"
              name="password"
              placeholder="Пароль"
              className="auth__input"
              onChange={handleChange}
              value={formValue.password}/>
          </div>
          <button type="submit" className="auth__button">Зарегистрироваться</button>
        </form>
        <div className="auth__redirect-container">
          <p className="auth__redirect">
            Уже зарегистрированы? <Link to="/signin" className="auth__redirect link-opacity">
            Войти</Link>
          </p>
        </div>
      </div>
    </>
  )
}