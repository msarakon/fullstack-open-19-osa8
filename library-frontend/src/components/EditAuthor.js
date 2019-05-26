import React, { useState } from 'react'
import Select from 'react-select'

const EditAuthor = ({ show, editAuthor, result }) => {
  const [name, setName] = useState('')
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
        name: name.trim() !== '' ? name : null,
        setBornTo: Number(born)
      }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <Select
            value={name}
            onChange={({ label }) => setName(label)}
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