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
  const [incomingShelf, setIncomingShelf] = useState('');

useEffect(() => {
  BooksAPI.getAll()
  .then((result) => {
    setBooks(result);
  })
  .catch(error => setExplanation(error))

}, [])

  const moveBook = (bookToMove, newShelf) => {
        setLoading(true)
        setIncomingShelf(newShelf)

        //Suggestion from @Forrest
        //update API books array
        BooksAPI.update(bookToMove, newShelf)
        //if successful, make a fresh request for the API books array
        .then(() => BooksAPI.getAll())
        //update the local state to match the API books array
        .then(res => {
          setBooks(res)
          setLoading(false)
        })
        //error handling
        .catch((error) => {
          setExplanation( 'Error Moving Book: '+error)
          setLoading(false)
        })
  }


    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <AllShelves 
            books={books}
            explanation={explanation}
            moveBook={moveBook}
            loading={loading}
            setLoading={setLoading}
            incomingShelf={incomingShelf}
          />
        )}/>

        <Route path='/search' render={() => (
          <SearchBook 
            books={books}
            explanation={explanation}
            moveBook={moveBook}
            loading={loading}
            setLoading={setLoading}
          />
        )}/>

      </div>
    );
};

export default BooksApp;