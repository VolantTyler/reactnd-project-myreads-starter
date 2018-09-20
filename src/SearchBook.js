import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book.js'
//why import BooksAPI here, and not App.js?
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'


class SearchBook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            query: '',
            books: []
        }
    }

    //@Rodrick
    syncBooks = (queryBooksList) => {
        return  (queryBooksList.map(book => {
            const myBook = this.props.books.find(item => item.id === book.id);
            if (myBook) {
                book['shelf'] = myBook.shelf;
            }

            return book;
        }))
    }

    updateQuery = (event) => {
        const query = event.target.value;
        this.setState({ query });
        if (query === '') {
            //if search input is empty, show no books
            this.setState({books: []})
        } else {
            BooksAPI.search(query)
            .then(res => {
                if(res.error) {
                    //if search API call returns an error, show no books
                    //TODO: include a "no results" <div>
                    this.setState({books: []})
                } else {
                this.setState({books: this.syncBooks(res)})
                }
            })
        }
    }
    clearQuery = () => {
        this.setState({query: ''})
    }

    render() {
        //@Rodrick
        const {moveBook} = this.props; 

        const {books} = this.state;
        const {query} = this.state


        return (
            //copied from App.js
            <div className="search-books">
            <div className="search-books-bar">
              <Link 
                className="close-search" 
                to='/'
                >
                Close
                </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={query} 
                    onChange={(event) => this.updateQuery(event)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {/* mycode */}
                {this.state.books.map((book) => 
                    <Book 
                    key={book.id}
                    book={book}
                    moveBook={moveBook}
                    />)
                }
              </ol>
            </div>
          </div>        
          )
    }
}

export default SearchBook