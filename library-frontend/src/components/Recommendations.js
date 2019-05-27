import React from 'react'

const Recommendations = ({ show, result, loggedUser }) => {
  if (!show) {
    return null
  }

  if (result.loading || loggedUser.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const favoriteGenre = loggedUser.data.me.favoriteGenre

  const filterByGenre = (book) => book.genres.includes(favoriteGenre)

  return (
    <div>
      <h2>recommendations</h2>
      <h3>books in your favorite genre {favoriteGenre}</h3>
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

export default Recommendations