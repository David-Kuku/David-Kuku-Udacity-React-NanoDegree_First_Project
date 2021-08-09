import React from 'react'
import './App.css'
import Search from './Search'
import Bookdisplay from './Bookdisplay'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    yes:'tt'
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({ books }))
      console.log(books)

      this.setState(() => ({ currentlyReading: books.filter((book) => (book.shelf === "currentlyReading")) }))
      this.setState(() => ({ wantToRead: books.filter((book) => (book.shelf === "wantToRead")) }))
      this.setState(() => ({ read: books.filter((book) => (book.shelf === "read")) }))


    })
  }
  componentDidUpdate=()=>{
    BooksAPI.getAll().then(books => {
      this.setState(() => ({ books }))
  })
    
  }
  
  

  render() {
    const handleChange = (value, book) => {
      BooksAPI.update(book, value)
    }

    //updating the books in currently-reading shelf
    const currentlyReadingstatechange = (value, book) => {
      this.setState((prevState) => ({ currentlyReading: prevState.currentlyReading.filter(bookitem => (bookitem.title !== book.title)) }))

      if (value === "wantToRead") {
        this.setState((prevState) => ({ wantToRead: prevState.wantToRead.concat([book]) }))
      }
      else if (value === "read") {
        this.setState((prevState) => ({ read: prevState.read.concat([book]) }))
      }
    }


    //updating the books in want-to-read shelf
    const wantToReadingstatechange = (value, book) => {
      this.setState((prevState) => ({ wantToRead: prevState.wantToRead.filter(bookitem => (bookitem.title !== book.title)) }))

      if (value === "currentlyReading") {
        this.setState((prevState) => ({ currentlyReading: prevState.currentlyReading.concat([book]) }))
      }
      else if (value === "read") {
        this.setState((prevState) => ({ read: prevState.read.concat([book]) }))
      }
    }

    //updating the books in read shelf
    const readstatechange = (value, book) => {
      this.setState((prevState) => ({ read: prevState.read.filter(bookitem => (bookitem.title !== book.title)) }))

      if (value === "currentlyReading") {
        this.setState((prevState) => ({ currentlyReading: prevState.currentlyReading.concat([book]) }))
      }
      else if (value === "wantToRead") {
        this.setState((prevState) => ({ wantToRead: prevState.wantToRead.concat([book]) }))
      }
      
    }  
    
    const statechangeonSearchPage = (value, book) => {
      
      if (value === "currentlyReading") {
        this.state.currentlyReading.filter(abook => (abook.id === book.id)).length === 0 
        && this.setState((prevState) => ({ currentlyReading: prevState.currentlyReading.concat([book]) }))
        
      }
      //adding the main want to read shelf when the shelf changes in the search page
      else if (value === "wantToRead") {
        this.state.wantToRead.filter(abook => (abook.id === book.id)).length === 0 
        && this.setState((prevState) => ({ wantToRead: prevState.wantToRead.concat([book]) }))
        
      }
      //adding the main read shelf when the shelf changes in the search page
      else if (value === "read") {
        this.state.read.filter(abook => (abook.id === book.id)).length === 0 
        && this.setState((prevState) => ({ read: prevState.read.concat([book]) }))
        
      }
    
      //console.log(this.state.currentlyReading)
      //console.log(this.state.wantToRead)
      //console.log(this.state.read)
    }
    
    
    const DeletestatechangeonSearchPage = async(book) => {
      if(this.state.read.filter(a => (a.id === book.id)).length){
       await this.setState((prevState) => ({read: prevState.read.filter(books => (books.id !== book.id))}))
      }
    
    else if(this.state.wantToRead.filter(a => (a.id === book.id)).length){
       await this.setState((prevState) => ({wantToRead: prevState.wantToRead.filter(books => (books.id !== book.id))}))
    }
    
    else if(this.state.currentlyReading.filter(a => (a.id === book.id)).length){
       await this.setState((prevState) => ({currentlyReading: prevState.currentlyReading.filter(books => (books.id !== book.id))}))
   }
   
    }
    
    const GoBack = () => {
      this.setState(() => ({ showSearchPage: false }))
    }


    return (
      <div className="app">


        <Route exact path='/' render={() => (
          <div><Bookdisplay

            books={this.state.books}
            handleChange={(a, b) => handleChange(a, b)}
            currentlyReadingChange={(a, b) => currentlyReadingstatechange(a, b)}
            wantToReadchange={(a, b) => wantToReadingstatechange(a, b)}
            readchange={(a, b) => readstatechange(a, b)}
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read} />
            <div className="open-search">
              <Link
                to='/search' onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
            </div>
          </div>
        )} />
        <Route exact path='/search' render={() => (
          <Search 
          books={this.state.books} 
          handleChange={(a, b) => handleChange(a, b)} 
          goback={GoBack} 
          statechangeonSearchPage={(a, b) => statechangeonSearchPage(a, b)}
          DeletestatechangeonSearchPage={(b) => DeletestatechangeonSearchPage(b)}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
