import React, {useState, useEffect} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import AllShelves from './AllShelves'
import { Route } from 'react-router-dom'

const BooksApp = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [explanation, setExplanation] = useState('');

useEffect(() => {
  BooksAPI.getAll()
  .then((result) => {
    setBooks(result);
  })
  .catch(error => setExplanation(error))

}, [])

  const moveBook = (bookToMove, newShelf) => {

        //Suggestion from @Forrest
        //update API books array
        BooksAPI.update(bookToMove, newShelf)
        //if successful, make a fresh request for the API books array
        .then(() => BooksAPI.getAll())
        //update the local state to match the API books array
        .then(res=> setBooks(res))
        //error handling
        .catch((error) => setExplanation( 'Error Moving Book: '+error))
  }


    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <AllShelves 
            books={books}
            explanation={explanation}
            moveBook={moveBook}
          />
        )}/>

        <Route path='/search' render={() => (
          <SearchBook 
            books={books}
            explanation={explanation}
            moveBook={moveBook}
          />
        )}/>

      </div>
    );
};

export default BooksApp;