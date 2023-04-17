import Togglable from './Togglable.js'

const Blog = ({ blog }) => {

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 5
  }
  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <Togglable buttonLabel='view' hideLabel='hide'>
        {blog.url} <br />
        {blog.likes} <br />
        {blog.user.name} <br />
      </Togglable>
    </div>
  )

}

export default Blog