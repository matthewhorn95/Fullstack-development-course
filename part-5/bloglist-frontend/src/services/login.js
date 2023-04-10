import axios from 'axios'
const baseUrl = '/api/login'

const login = async (userPass) => {
    const res = await axios.post(baseUrl, userPass)
    return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }