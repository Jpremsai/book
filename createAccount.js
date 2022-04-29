import React from 'react';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { UserAuth } from '../context/UserAuth';


export function CreateAccount(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = UserAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit =async (e) => {
        e.preventDefault();
      const checkForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi;
      const checkForPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      !email.match(checkForEmail) ? alert('email is invalid'): setEmail(email);
      !password.match(checkForPassword) ? alert('password is invalid') : setPassword(password);
      setError('');
      try{
      await signup(email, password);
      navigate('/');
      } catch(err){
            setError(err.message);
      }

    }
    return (
        <div className='signup'>
        <form onSubmit={handleSubmit}>
        {error && alert({error})}
            <input type = 'Email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
            <input type= 'password' placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
            <button>signup</button>
            <button>Already have a account<Link to='/'>Login</Link></button>
        </form>
        </div>
    )
}
