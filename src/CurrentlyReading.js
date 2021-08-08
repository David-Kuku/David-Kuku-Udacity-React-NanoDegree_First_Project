import React from 'react'

class CurrentlyReading extends React.Component{
  render(){
    
    /**const handleChange=(value, book)=>{
        BooksAPI.update(book,value)
        book.shelf = value
    }
    **/
    
    const {books, handleChange}=this.props
    
    return(
       <div className="list-books-content">
                        <div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Currently Reading</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {
                                            books.length && books.map((book) => {
                                            let image, author;
      
                                            book.imageLinks? image = book.imageLinks.thumbnail : image=null
                                            book.authors? author = book.authors[0] : author="no author"
      
                                                return (
                                                    <li key={book.id}>
                                                        <div className="book">
                                                            <div className="book-top">
                                                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("' + image + '")' }}></div>
                                                                <div className="book-shelf-changer">
                                                                    <select value="currentlyReading" onChange={(e)=>handleChange(e.target.value, book)}>
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
                                            })}



                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
    )
 }
}

export default CurrentlyReading