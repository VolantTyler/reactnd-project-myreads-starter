import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
//mycode
import SearchBook from './SearchBook'
import AllShelves from './AllShelves'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      //mycode
      //array includes will read, currently reading, have read?
      books: []
  }
}


  moveBook = (bookToMove, newShelf) => {
        //TODO: adjust this code to allow changing the shelf 
        //of books not currently in library
        //@Rodrick 1:27:00 handle books not in library
        //@Rodrick 57:00 explains how to make refresh smoother
    this.setState((state, props) => {
      const books = state.books;

      if (!books.includes(bookToMove)) {
        bookToMove.shelf = newShelf;
        books.push(bookToMove);
      } else {
        books.map(book => {
          if (book.id === bookToMove.id) {
            book.shelf = newShelf
          }

          return book;
        })
      }

      return {books};
    });
    BooksAPI.update(bookToMove, newShelf);
 
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((result) => {
      this.setState({books: result});
    })
    .catch(err => console.log(err))
  }


  render() {
    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <AllShelves 
            books={this.state.books}
            moveBook={this.moveBook}
          />
        )}/>

        <Route path='/search' render={() => (
          <SearchBook 
            books={this.state.books}
            moveBook={this.moveBook}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
