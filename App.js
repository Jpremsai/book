import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {Login} from './components/Login';
import {Home} from './components/Home';
import {ProtectedRoute} from './components/ProtectedRoute';
import Header from './components/Header';
import {CreateAccount} from './components/createAccount';
import {UserContextProvider} from './context/UserAuth';
import { UserBookIdProvider } from "./services/services";
import './components/App.css';

function App() {
  return (
    <div className='container'>
      <Header />
      <UserContextProvider>
        <Routes>
        <Route path= '/' element={<Login />} />
        <Route path= '/signup' element={<CreateAccount />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
       </Routes>
       </UserContextProvider>
      </div>
  );
}

export default App;
