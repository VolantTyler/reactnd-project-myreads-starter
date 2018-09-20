import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
//mycode
import SearchBook from './SearchBook'
import AllShelves from './AllShelves'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,

    //mycode
    //array includes will read, currently reading, have read?
    books: []
  }
}

  //@Rodrick webinar
  clickBack = () => {
    this.setState({ showSearchPage: false});
  }
  //mycode
  clickSearch = () => {
    this.setState({ showSearchPage: true});
  }
  moveBook = (bookToMove, newShelf) => {
        //TODO: adjust this code to allow changing the shelf 
        //of books not currently in library
        //@Rodrick 1:27:00 handle books not in library
        //@Rodrick 57:00 explains how to make refresh smoother
    BooksAPI.update(bookToMove, newShelf);
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
    }) 
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
        {this.state.showSearchPage ? (
          <SearchBook 
            clickBack={this.clickBack}
            books={this.state.books}
            moveBook={this.moveBook}
            />
        ) : (
          <AllShelves 
            clickSearch={this.clickSearch}
            books={this.state.books}
            moveBook={this.moveBook}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
