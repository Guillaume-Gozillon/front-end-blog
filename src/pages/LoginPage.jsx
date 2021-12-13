import { TextField, Button } from '@mui/material'
import { useState, useContext } from 'react'
import authAPI from '../services/authAPI'
import AuthContext from '../contexts/AuthContext'
import { useNavigate } from 'react-router'

const LoginPage = () => {
  const navigate = useNavigate()

  const [credentials, setCredential] = useState({
    identifier: '',
    password: ''
  })

  const { setIsAuthenticated } = useContext(AuthContext)

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget

    setCredential({
      ...credentials,
      [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await authAPI.authenticate(credentials)
      setIsAuthenticated(true)
      
      navigate('/private/admin')
    } catch (err) {
      console.log(err)
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id='identifier'
        label='Username'
        type='text'
        name='identifier'
        onChange={handleChange}
      />
      <TextField
        id='password'
        label='Password'
        type='text'
        name='password'
        onChange={handleChange}
      />
      <div>
        <Button variant='contained' color='primary' type='submit'>
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginPage
