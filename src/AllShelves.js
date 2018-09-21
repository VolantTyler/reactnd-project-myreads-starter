import React, { Component } from 'react'
import Shelf from './Shelf.js'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class AllShelves extends Component {
    // constructor(props) {
    //   super(props)

    //   this.state = {
    //       books: []
    //   }
    // }
    // componentDidMount() {
    //   BooksAPI.getAll()
    //   .then((result) => {
    //     this.setState({books: result});
    //   })
    //   .catch(err => console.log(err))
    // }

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
        const {books, moveBook} = this.props; 
        const shelves = this.booksToShelf(books);

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