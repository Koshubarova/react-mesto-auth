import React, { useState } from "react";

export default function Login({onLogin}) {
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
    onLogin(formValue.email, formValue.password);
  }

  return (
    <>
      <div className="auth">
        <h2 className="auth__title">Вход</h2>
        <form name="login"
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
          <button type="submit" className="auth__button">Войти</button>
        </form>
      </div>
    </>
  )
}