import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
//mycode
import SearchBook from './SearchBook'
import AllShelves from './AllShelves'

class BooksApp extends React.Component {
  state = {
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

  //@Rodrick webinar
  clickBack = () => {
    this.setState({ showSearchPage: false});
  }
  //mycode
  clickSearch = () => {
    this.setState({ showSearchPage: true});
  }
  moveBook = (bookToMove, newShelf) => {
    //TODO: use the same approach with BooksAPI.search(query)
    BooksAPI.update(bookToMove, newShelf)
      .then(() => {BooksAPI.getAll()
      .then(res => this.setState({ books: res}))})
        //@Rodrick 57:00 explains how to make refresh smoother
  }
  //TODO: search function
  searchAllBooks = (query) => {
    BooksAPI.search(query)
    .then(result => this.setState({ books: result}))
  }
  componentDidMount() {
    BooksAPI.getAll()
    .then((result) => {
      this.setState({books: result});
    })
    .catch(err => console.log(err))
  }


  render() {
    console.log(this.state.books)
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBook 
            clickBack={this.clickBack}
            books={this.state.books}
            moveBook={this.moveBook}
            searchAllBooks={this.searchAllBooks}
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
