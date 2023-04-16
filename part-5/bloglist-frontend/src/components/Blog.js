const Blog = ({ blog }) => {

  const blogStyle = {
    padding: 10
  }
  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
    </div>
  )

}

export default Blog