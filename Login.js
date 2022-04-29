import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {UserAuth} from '../context/UserAuth'

export function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin } = UserAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit =async (e) => {
      e.preventDefault();
      setError("");
    const checkForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi;
    const checkForPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    email.match(checkForEmail) ? setEmail(email) :  alert('email is invalid');
    password.match(checkForPassword) ? setPassword(password) :  alert('password is invalid');
    try{
    await signin(email, password);
    navigate('/home');
    } catch (err){
      setError(err.message);
    }

  }
    return (
        <div className='login'>
      <form onSubmit={handleSubmit} >
        {error && alert({error})}
          <input type="email" name='email' placeholder="Email" onChange = {(e)=>setEmail(e.target.value)}></input>
           <input type='password' name='password' placeholder='password' onChange = {(e)=>setPassword(e.target.value)}></input>
          <div className='bt1'>
            <button><Link to='/signup'>Create an account</Link></button>
            <button>Login</button>
            </div>
      </form>
      </div>
    )
    }