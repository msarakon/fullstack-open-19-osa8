import React, { useState } from 'react'

const EditAuthor = ({ show, editAuthor }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!show) {
    return null
  }

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
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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