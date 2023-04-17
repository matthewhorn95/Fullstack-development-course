import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (baseToken) => {
  token = `Bearer ${baseToken}`
}

const getToken = () => {
  return token
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, getToken }