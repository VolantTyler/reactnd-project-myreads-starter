import React, { Component } from 'react'
import Shelf from './Shelf.js'

class AllShelves extends Component {

    booksToShelf = (books) => {

        const currently = books.filter(book => book.shelf === 'currentlyReading');
        const want = books.filter(book => book.shelf === 'wantToRead');
        const haveRead = books.filter(book => book.shelf === 'read');

        return [
            {type: 'Currently Reading', books: currently}, 
            {type: 'Want To Read', books: want}, 
            {type: 'Read', books: haveRead}, 

        ]
    }

    render() {
        const {clickSearch, books, moveBook} = this.props; 
        //console.log(books);
        const shelves = this.booksToShelf(books);
        console.log(shelves);

        return (
            //copied from App.js
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

                  {shelves.map(shelf => 
                  <Shelf 
                    key={shelf.type}
                    shelf={shelf}
                    moveBook={moveBook}
                  />)}

              </div>
            </div>
            <div className="open-search">
              <a onClick={clickSearch}>Add a book</a>
            </div>
          </div>      
          )
    }
}

export default AllShelves