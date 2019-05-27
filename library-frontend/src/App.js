import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthor from './components/EditAuthor'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [loggedUser, setLoggedUser] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('libraryAppUserToken', token))
  }, [token])

  const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
  `
  const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      id
      author { name }
      published
      genres
    }
  }
  `

  const ALL_GENRES = gql`
  query allGenres {
    allGenres
  }
  `

  const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
      addBook(
        title: $title,
        published: $published,
        author: $author,
        genres: $genres
      ) {
        title
        id
        author { name }
        published
      }
    }
  `
  const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
      editAuthor(
        name: $name,
        setBornTo: $setBornTo,
      ) {
        name
        id
        born
      }
    }
  `

  const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        value
      }
    }
  `

  const LOGGED_USER = gql`
    query me {
      me {
        username
        favoriteGenre
      }
    }
  `

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const genres = useQuery(ALL_GENRES)
  const addBook = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }, { query: ALL_GENRES }]
  })
  const editAuthor = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const login = useMutation(LOGIN)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('edit-author')}>edit author</button>}
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={logout}>log out</button>}
      </div>

      <Authors show={page === 'authors'} result={authors} />

      <EditAuthor
        show={page === 'edit-author'}
        editAuthor={editAuthor}
        result={authors} />

      <Books show={page === 'books'} bookQuery={ALL_BOOKS} genreResult={genres} />

      <NewBook show={page === 'add'} addBook={addBook} />

      <Recommendations 
        show={page === 'recommendations'}
        result={books}
        loggedUser={loggedUser} />

      <Login
        show={page === 'login'}
        login={login}
        loggedUserQuery={LOGGED_USER}
        setLoggedUser={(user) => setLoggedUser(user)}
        setToken={(token) => setToken(token)} />

    </div>
  )
}

export default App
