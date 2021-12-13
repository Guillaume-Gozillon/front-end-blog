import { API_POSTS } from '../config'
import axios from 'axios'

const findAll = async () => {
  const res = await axios.get(API_POSTS)
  return res.data
}

const findOne = async id => {
  const res = await axios.get(API_POSTS + id)
  return res.data
}
const getComments = async id => {
  const res = await axios.get(`${API_POSTS}${id}/comments`)
  return res.data
}

export default {
  findAll,
  findOne,
  getComments
}
