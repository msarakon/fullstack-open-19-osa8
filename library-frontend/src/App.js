import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')

  const ALL_AUTHORS = gql`
  {
    allAuthors {
      name,
      id,
      born,
      bookCount
    }
  }
  `
  const ALL_BOOKS = gql`
  {
    allBooks {
      title,
      id,
      author,
      published
    }
  }
  `

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Query query={ALL_AUTHORS}>
        {(result) => <Authors show={page === 'authors'} result={result} />}
      </Query>

      <Query query={ALL_BOOKS}>
        {(result) => <Books show={page === 'books'} result={result} />}
      </Query>

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App
