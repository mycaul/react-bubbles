import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('login', login)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubbles')
      })
      .catch((err) => console.log(`Login error: ${err.response}`));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type = 'text'
          name = 'username'
          placeholder = 'username'
          value = {props.username}
          onChange = {handleChange}
        />
        <input 
          type = 'password'
          name = 'password'
          placeholder = 'password'
          value = {props.password}
          onChange = {handleChange}
        />
      <button>Login</button>
      </form>
    </>
  );
};

export default Login;