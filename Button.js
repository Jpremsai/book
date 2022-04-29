import React from "react";
import { UserAuth } from "../context/UserAuth";
import {useNavigate} from 'react-router-dom';

export function Button(){
    const {logout} = UserAuth();
    const [error, setError] = useState('');
    const navigate=useNavigate();
    const handleSubmit =async (e) => {
        e.preventDefault();
        try{
            await logout();
            navigate('/');
        } catch(err){
            setError(err.message);
        }

    }
    return (
        <div>
        {error && alert({error})}
        <button className="logout" onClick={handleSubmit}>logout</button>
        </div>
    )
}