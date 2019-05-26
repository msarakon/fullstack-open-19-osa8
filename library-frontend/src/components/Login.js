import React, { useState } from 'react'

const Login = ({ show, login, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    const result = await login({
      variables: { username, password }
    })
    const token = result.data.login.value
    setToken(token)
    localStorage.setItem('libraryAppUserToken', token)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>log in</button>
      </form>
    </div>
  )
}

export default Login