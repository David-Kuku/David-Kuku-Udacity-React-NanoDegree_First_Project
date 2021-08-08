import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class Search extends React.Component {
    state = {
        searchResult: [],
        query: '',
        shelf: []
    }

    render() {
      
      let image, value, author;
      
        const onSearchChange = (event) => {
            this.setState({
                query: event.target.value
            }, () => {
                BooksAPI.search(this.state.query, 20)
                    .then(result => result && result.filter(each => (each.title.toLowerCase().includes(this.state.query.toLowerCase()) || each.authors[0].toLowerCase().includes(this.state.query.toLowerCase()))))
                    .then(result => this.setState(() => ({ searchResult: result }), () => console.log(this.state.searchResult)))

            })
        }

        const { goback, statechangeonSearchPage, books } = this.props
        
        const onSelectChange = (event, book) => {
            BooksAPI.update(book, event)
            statechangeonSearchPage(event, book)
        }
    
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search" onClick={goback}>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
    
                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                        <input type="text" placeholder="Search by title or author" onChange={onSearchChange} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchResult ? this.state.searchResult.map((book) => {
                            
                            book.imageLinks ? image = book.imageLinks.thumbnail : image = null
                            book.authors ? author = book.authors[0] : author = null

                            let aBook = books.filter(each => (each.title === book.title))
                            aBook.length ? value = aBook[0].shelf : value = "none"

                            return (
                                <li key={book.id} onClick={() => console.log(book)}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("' + image + '")' }}></div>
                                            <div className="book-shelf-changer">
                                                <select value={value} onChange={(e) => onSelectChange(e.target.value, book)}>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{author}</div>
                                    </div>
                                </li>
                            )
                        }) : null}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search