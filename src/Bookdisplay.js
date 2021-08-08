import React, { Component } from 'react'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'

class Bookdisplay extends Component {

    /**handleChange=()=>{
      BookAPI.getAll().then((books) => console.log(books[3].shelf))
    }
    componentDidMount(){
      this.handleChange()
    }**/
    render() {
        const { currentlyReading, wantToRead, read, handleChange, currentlyReadingChange, wantToReadchange, readchange } = this.props
        return (
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <CurrentlyReading books={currentlyReading} handleChange={(a, b) => { handleChange(a, b); currentlyReadingChange(a, b) }} />
                    <WantToRead books={wantToRead} handleChange={(a, b) => { handleChange(a, b); wantToReadchange(a, b) }} />
                    <Read books={read} handleChange={(a, b) => { handleChange(a, b); readchange(a, b) }} />

                </div>
            </div>
        )
    }
}

export default Bookdisplay

