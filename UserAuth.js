import { auth } from '../context/firebase-config';
import {useState, useEffect, useContext} from 'react';
import { createContext } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

const userContext = createContext();

export function UserContextProvider({children}){
    const [user, setUser] = useState('');
    const [bookId, setBookId] = useState("");
    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function signin( email, password){
        return signInWithEmailAndPassword(auth,email,password);
    }
    function logout(){
        return signOut(auth);
    }
    useEffect(()=> {
        const subscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })
        return () => subscribe();
    },[])
    
    return <userContext.Provider value={ {user,signup,signin,logout}}>
        {children}
    </userContext.Provider>
}

export function UserAuth(){
    return useContext(userContext);
}
