import React, { Component } from 'react'

class Book extends Component{
    //@Rodrick code
    //can also use componenetDidMount video 30-40min
    constructor(props) {
        super(props)
        this.state= {
            shelf: props.book.shelf
        }
    }

    //mycode
    moveBooks = (event) => {
        const shelf = event.target.value;
        this.setState({shelf})
    }

    // inspiration:
    // removeContact = (contact) => {
    //     this.setState((state) => ({
    //       contacts: state.contacts.filter((c) => c.id !== contact.id)
    //     }))
    
    //     ContactsAPI.remove(contact)
    //   }
    
    //   createContact(contact) {
    //     ContactsAPI.create(contact).then(contact => {
    //       this.setState(state => ({
    //         contacts: state.contacts.concat([ contact ])
    //       }))
    //     })
    //   }

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
                            <select value={shelf} onChange={this.moveBooks}>
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