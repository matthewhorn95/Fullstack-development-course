import Togglable from './Togglable.js'
import axios from 'axios'
import blogService from '../services/blogs.js'

const baseUrl = '/api/blogs'

const Blog = ({ blog, setBlogs, setNotification }) => {

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 5
  }

  const incrementLike = () => {
    const token = blogService.getToken()

    const config = {
      headers: { authorization: token }
    }

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.id
     }

    axios.put(`${baseUrl}/${blog.id}`, updatedBlog, config)
    .then(() => {
      blogService.getAll()
        .then(all => setBlogs(all))
    })

  }

  const removeBlog = () => {
    const deleteTitle = blog.title
    const deleteAuthor = blog.author
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      axios.delete(`${baseUrl}/${blog.id}`)
        .then(() => {
          blogService.getAll()
            .then(all => setBlogs(all))
        })

      setNotification(`Removed ${deleteTitle} by ${deleteAuthor}`)
      setTimeout(() => {
        setNotification('')
      }, 3000)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <Togglable buttonLabel='view' hideLabel='hide'>
        {blog.url} <br />
        likes {blog.likes} <button onClick={incrementLike}>like</button> <br />
        {blog.user.name} <br />
        <button onClick={removeBlog}>remove</button>
      </Togglable>
    </div>
  )

}

export default Blog