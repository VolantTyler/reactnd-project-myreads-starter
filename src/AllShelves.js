import React, { Component } from 'react'
import Shelf from './Shelf.js'
import { Link } from 'react-router-dom'

class AllShelves extends Component {

    booksToShelf = (books) => {

        const currently = books.filter(book => book.shelf === 'currentlyReading');
        const want = books.filter(book => book.shelf === 'wantToRead');
        const previously = books.filter(book => book.shelf === 'read');
 
        return [
            {type: 'Currently Reading', books: currently}, 
            {type: 'Want To Read', books: want}, 
            {type: 'Previously Read', books: previously}, 

        ]
    }

    render() {
        const {books, moveBook, explanation, loading, incomingShelf} = this.props; 
        const shelves = this.booksToShelf(books);

        return (
            //copied from App.js
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {/* display any messages or errors here */}
              <div>
                  <h2>{explanation}</h2>
              </div>
              <div>

                  {shelves.map(shelf => 
                  <Shelf 
                    key={shelf.type}
                    shelf={shelf}
                    moveBook={moveBook}
                    loading={loading}
                    incomingShelf={incomingShelf}
                  />)}

              </div>
            </div>
            <div className="open-search">
              <Link 
              to='/search'
              >
              Add a book
              </Link>
            </div>
          </div>      
          )
    }
}

export default AllShelves