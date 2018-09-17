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

  }
  componentDidMount() {
    BooksAPI.getAll().then((result) => {
      this.setState({books: result});
    })
    .catch(err => console.log(err))
  }

  //mycode
  // moveBook = (book) => {
  //   this.setState((state) => ({
      //move book from one array to another? from one object within
      //the books[] to another object?
      //next line is wrong: placeholder
  //     books: state.book.concat([ book ])
  //   }))
  // }

  render() {
    console.log(this.state.books)
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
