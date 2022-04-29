import { Button } from "./Button";
import React,{useEffect, useState} from "react";
import BookDataService from './service/service';
import {BookList} from './BookList'

export function Home(){
    const [title, setTilte] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState('available');
    const [flag, setFlag] = useState(true);
    const [bookId, setBookId] = useState('');
    const [message, setMessage] = useState({error: false, msg: ''});
    const getBookIdHandler =(id) =>{
        setBookId(id);
    }
    const handleSubmit= async (e) => {
        e.preventDefault();
        setMessage('');
        if(title === '' || author === ''){
            setMessage({error: true, msg:'All fields are mandatory'});
        }
        const newBook ={
            title,author, status
        }
        try {
            if(id !== undefined && id !== ''){
                await BookDataService.updateBook(bookId, newBook);
                setBookId('');
                setMessage({error: false, msg: 'New Book added successfully'});
            }else {
                await BookDataService.addBook(newBook);
                setMessage({error: false, msg: 'New Book added successfully'});
            }
        } catch(err){
            setMessage({error: true, msg: err.message});
        }
        setAuthor('');
        setTilte('');
    }
    const editHandler =async ()=>{
        setMessage('');
        try {
            const docSnap = await BookDataService.getBook(id);
            setTilte(docSnap.data().title);
            setAuthor(docSnap.data().author);
            setStatus(docSnap.data().status);
         } catch (err){
             setMessage({error: true, mes: err.message});
         }

    }
    useEffect(()=>{
        if(id !== undefined && id !== ''){
            editHandler();
        }
    },[id])
    return (
    <div> My Books
        <Button />
        <form onSubmit={handleSubmit} >
            {message.error? alert(message.msg):'success'}
            <input type="text" name='title' placeholder="title" onChange = {(e)=>setTilte(e.target.value)}></input>
            <input type='text' name='author' placeholder='author' onChange = {(e)=>setAuthor(e.target.value)}></input>
            <button disabled={flag} onClick={(e)=>{setStatus('available');setFlag(true)}}>Available</button>
            <button disabled={flag} onClick={(e)=>{setStatus('not available');setFlag(false)}}>Not Available</button>
      </form>
      <div>
          <BookList getBookId= {getBookIdHandler} />
      </div>
    </div>
    )
}