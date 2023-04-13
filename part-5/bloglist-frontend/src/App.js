import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Post from './components/Post'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])

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

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in', username)
    try {
      const user = await loginService.login({ username, password })
      console.log(user)
      window.localStorage.setItem('activeUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong username or password')
    }
  }

  const handlePost = (event) => {
    event.preventDefault()
    console.log('post by', username, 'initiated')

    blogService.create({ title, author, url })
      .then(response => setBlogs(blogs.concat(response)))

    setTitle('')
    setAuthor('')
    setUrl('')
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
          <Post title={title}
          author={author}
          url={url}
          handleTitle={handleTitle}
          handleUrl={handleUrl}
          handleAuthor={handleAuthor}
          handlePost={handlePost} />
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
          <button onClick={handleLogout}>log out</button>
        </>
      )}
    </div>
  )
}

export default App