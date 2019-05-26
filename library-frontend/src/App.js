import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthor from './components/EditAuthor'

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
        author
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

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('edit-author')}>edit author</button>
      </div>

      <Query query={ALL_AUTHORS}>
        {(result) => {
          return (
            <div>
              <Authors show={page === 'authors'} result={result} />
              <Mutation mutation={EDIT_AUTHOR} refetchQueries={[{ query: ALL_AUTHORS }]}>
                {(editAuthor) =>
                  <EditAuthor
                    editAuthor={editAuthor}
                    result={result}
                    show={page === 'edit-author'} />}
              </Mutation>
            </div>
          )
        }}
      </Query>

      <Query query={ALL_BOOKS}>
        {(result) => <Books show={page === 'books'} result={result} />}
      </Query>

      <Mutation mutation={CREATE_BOOK} refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}>
        {(addBook) => <NewBook addBook={addBook} show={page === 'add'} />}
      </Mutation>

    </div>
  )
}

export default App
