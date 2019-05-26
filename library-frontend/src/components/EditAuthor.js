import React, { useState } from 'react'
import Select from 'react-select'

const EditAuthor = ({ show, editAuthor, result }) => {
  const [author, setAuthor] = useState(null)
  const [born, setBorn] = useState('')

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors.map(author => {
    return { 
      value: author.id,
      label: author.name
    }
   })

  const submit = async (e) => {
    e.preventDefault()
    editAuthor({
      variables: {
        name: author.label,
        setBornTo: Number(born)
      }
    })

    setAuthor(null)
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <Select
            value={author}
            onChange={(author) => setAuthor(author)}
            options={authors}/>
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>edit author</button>
      </form>
    </div>
  )
}

export default EditAuthor