import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const activeUser = window.localStorage.getItem('activeUser')
    if (activeUser) {
      const user = JSON.parse(activeUser)
      setUser(user)
    }
  }, [])

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in', username)
    try {
      const user = await loginService.login({ username, password })
      console.log(user)
      window.localStorage.setItem('activeUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong username or password')
    }
  }

  const handleLogout = (event) => {
    if (window.confirm('Are you sure you want to log out?')) {
      console.log('logging out', user.username)
      window.localStorage.removeItem('activeUser')
      setUser(null)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {user === null
        ? (<Login username={username}
          handleUsername={handleUsername}
          password={password}
          handlePassword={handlePassword}
          handleLogin={handleLogin} />
        )
        : (
        <>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
          <button onClick={handleLogout}>log out</button>
        </>
      )}
    </div>
  )
}

export default App