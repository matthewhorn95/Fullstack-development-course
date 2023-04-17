import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Post from './components/Post'
import Notification from './components/Notification.js'
import Togglable from './components/Togglable.js'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

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
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in', username)
    try {
      const user = await loginService.login({ username, password })
      setNotification(`logged in successfully as ${username}`)
      setTimeout(() => {
        setNotification('')
      }, 3000)
      window.localStorage.setItem('activeUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong username or password')
      setNotification('Wrong username or password')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setNotification('')
      }, 3000)
    }
  }



  const handleLogout = (event) => {
    if (window.confirm('Are you sure you want to log out?')) {
      console.log('logging out', user.username)
      window.localStorage.removeItem('activeUser')
      setUser(null)
      setNotification('Logged out successfully')
      setTimeout(() => {
        setNotification('')
      }, 3000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      {user === null
        ? (<Login username={username}
          handleUsername={event => setUsername(event.target.value)}
          password={password}
          handlePassword={event => setPassword(event.target.value)}
          handleLogin={handleLogin} />
        )
        : (
        <>
          <Togglable buttonLabel='new blog' hideLabel='cancel'>
            <Post blogs={blogs}
            setBlogs={setBlogs}
            setNotification={setNotification}
            user={user} />
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />)}
          <p>
          {user.username} is logged in <button onClick={handleLogout}>log out</button>
          </p>
        </>
      )}
    </div>
  )
}

export default App