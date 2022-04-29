import { async } from "@firebase/util";
import { doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import BookDataService from '../services'

export function BookList({getBookId}){
    const [books, setBooks] = useState([]);
    useEffect(() => {
        getBooks();
    },[]);
    const getBooks =async ()=>{
        const data = await BookDataService.getAllBooks();
        setBooks(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
    }
    const deleteHandler =async () => {
        await BookDataService.deleteBook();
        getBooks();
    }
    return(
        <>
        <div>
            <button onClick={getBooks}>Refresh List</button>
        </div>
        <table>
            <thead>
                <th>#</th>
                <th>Book title</th>
                <th>Book author</th>
                <th>status</th>
                <th>Action</th>
            </thead>
            <tbody>
                {books.map((doc, index) =>{
                    return (
                        <tr>
                            <td>{index+1}</td>
                            <td>{doc.title}</td>
                            <td>{doc.author}</td>
                            <td>{doc.status}</td>
                            <td>
                                <button onClick={(e)=>getBookId(doc.id)}>Edit</button>
                                <button onClick={(e) => deleteHandler(doc.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

        </>
    )
}