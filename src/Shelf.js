import React from 'react'
import Book from './Book.js'
// functional component


const Shelf = (props) => {
    const {shelf, moveBook} = props;

    return (
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.type}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {shelf.books.map(book => 
                            <Book 
                                key={book.id}
                                book={book}
                                moveBook={moveBook}
                                // title={book.title}
                                // authors={book.authors}
                                // image={book.imageLinks.smallThumbnail}
                            />)}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Shelf