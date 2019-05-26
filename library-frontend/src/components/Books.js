import React, { useState } from 'react'

const Books = ({ show, result }) => {
  const [genre, setGenre] = useState(null)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = books.reduce((coll, book) => {
    book.genres.forEach(genre => {
      if (!coll.includes(genre)) coll.push(genre)
    })
    return coll
  }, [])

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