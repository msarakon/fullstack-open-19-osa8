import React, { useState, useEffect } from 'react'
import { useApolloClient } from 'react-apollo-hooks'

const Books = ({ show, bookQuery, genreResult }) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    client.query({
      query: bookQuery,
      variables: {
        genre: genre
      }
    }).then(result => setBooks(result.data.allBooks))
  }, [client, bookQuery, genre])

  if (!show) {
    return null
  }

  if (genreResult.loading) {
    return <div>loading...</div>
  }

  const genres = genreResult.data.allGenres

  const filterByGenre = (book) => genre === null || book.genres.includes(genre)

  return (
    <div>
      <h2>books</h2>
      {genre && <h3>in genre {genre}</h3>}
      {genres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(filterByGenre).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books