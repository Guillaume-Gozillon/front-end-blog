import { API_LOGIN } from '../config'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const authenticate = async credential => {
  return axios
    .post(API_LOGIN, credential)
    .then(res => res.data)
    .then(data => {
      window.localStorage.setItem('authToken', data.jwt)
      window.localStorage.setItem('userName', data.user.username)
      axios.defaults.headers['Authorization'] = 'Bearer' + data.jwt
    })
}

const isAuthenticated = () => {
  const token = window.localStorage.getItem('authToken')

  if (token) {
    const { exp } = jwtDecode(token)
    if (exp * 1000 > new Date().getTime()) {
      return true
    }
    return false
  }
  return false
}

const logOut = () => {
  window.localStorage.removeItem('authToken')
  window.localStorage.removeItem('userName')
  delete axios.defaults.headers['Authorization']
}

const setUp = () => {
  const token = window.localStorage.getItem('authToken')

  if (token) {
    const { exp } = jwtDecode(token)
    if (exp * 1000 > new Date().getTime()) {
      axios.defaults.headers['Authorization'] = 'Bearer' + token
    }
  }
}

export default {
  authenticate,
  isAuthenticated,
  logOut,
  setUp
}
