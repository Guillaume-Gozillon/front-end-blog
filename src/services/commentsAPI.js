import { URL_COMMENTS } from '../config'
import axios from 'axios'

const create = comments => {
  axios.post(URL_COMMENTS, comments)
}

const findAll = async () => {
  const res = await axios.get(URL_COMMENTS)
  return res.data
}

export default { create, findAll }
