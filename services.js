import {db} from '../firebase-config';
import {
    collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore';

const bookCollectionRefs = collection(db, 'Books');

function BookDataService(){
    addBook = (newBook)=>{
        return addDoc(bookCollectionRefs, newBook);
    }
    updateBook = (id, updateBook) => {
        const bookDoc = doc(db, 'Books', id);
       return updateDoc(bookDoc, updateBook); 
    }
    deleteBook = (id) => {
        const bookDoc = doc(db, 'Books', id);
        return deleteDoc(bookDoc);
    }
    getAllBooks = ()=>{
        return getDocs(bookCollectionRefs);
    }
    getBook = (id) =>{
        const bookDoc = doc(db, 'Books', id);
        return getDoc(bookDoc);
    }
}

export default new BookDataService;
