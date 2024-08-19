import React from 'react'
import Book from './Book.js'


const Shelf = (props) => {
    const {shelf, moveBook, loading, incomingShelf} = props;

    console.log('shelf.type = ', shelf.type)
    console.log('incomingShelf = ', incomingShelf)

    return (
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.type}</h2>
                {loading ?
                    <h3>Loading...</h3>
                    : ''
                  }
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {shelf.books.map(book => 
                            <Book 
                                key={book.id}
                                book={book}
                                moveBook={moveBook}
                            />)}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Shelf