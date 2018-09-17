import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'


class Book extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            shelf: ''
        }
    }
    componentDidMount = () => {
        this.setState({shelf: this.props.book.shelf})
    }

    //mycode
    moveBook = (event) => {
        const shelf = event.target.value;
        this.props.moveBook(this.props.book.id, shelf)

        this.setState({shelf});

        //BooksAPI.update(this.props.book.id, shelf)
    }


    render(){

        const {book} = this.props;
        const {shelf} = this.state;

        return (
            // <div>
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                        <div className="book-shelf-changer">
                            <select value={shelf} onChange={this.moveBook}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors.map(author =>
                        <div key={author} className="book-authors">{author}</div>
                        )}
                </div>
            </li>

            // </div>
        )
    }
}

export default Book