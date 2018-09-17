import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book.js'


class SearchBook extends Component {

    state = {
        query: ""
    }
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }
    clearQuery = () => {
        this.setState({query: ''})
    }

    render() {
        //@Rodrick
        const {clickBack, moveBook, searchAllBooks} = this.props; 

        const {books} = this.props
        const {query} = this.state

        let showingBooks
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            //TODO: insert search function here, 
            //replace books.filter() with searchAllBooks(query)
            showingBooks = searchAllBooks(match)
            //original code worked:
            // showingBooks = books.filter(book => 
            //     match.test(book.title) ||
            //     match.test(book.authors)
            // )
            // if (showingBooks.length === 0) {
            //     //TODO: display message in div in place of book list
            //     console.log('No Results');
            // }
        } else {
            showingBooks = books;
        }

        return (
            //copied from App.js
            <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={clickBack}>Close</a>
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
                    onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {/* mycode */}
                {showingBooks.map((book) => 
                    <Book 
                    key={book.id}
                    book={book}
                    moveBook={moveBook}
                />)}
              </ol>
            </div>
          </div>        
          )
    }
}

export default SearchBook