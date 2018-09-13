import React from 'react'
// functional component


const Shelf = (props) => {
    const {shelf} = props;
    console.log(shelf);

    return (
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.type}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Shelf