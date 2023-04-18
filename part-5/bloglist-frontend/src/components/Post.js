import { useState } from 'react'
import blogService from '../services/blogs'

const Post = ({ blogs, setBlogs, setNotification }) => {

    const [title, setTitle] = useState([])
    const [author, setAuthor] = useState([])
    const [url, setUrl] = useState([])

    const handlePost = (event) => {
        event.preventDefault()

        blogService.create({ title, author, url })
            .then(() => {
                blogService.getAll()
                    .then(response => setBlogs(response))
            })


        setNotification(`New blog titled ${title} by ${author} added`)
        setTimeout(() => {
          setNotification('')
        }, 3000)

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={handlePost}>
            <div>
                title <input value={title} onChange={event => setTitle(event.target.value)} />
            </div>
            <div>
                author <input value={author} onChange={event => setAuthor(event.target.value)} />
            </div>
            <div>
                url <input value={url} onChange={event => setUrl(event.target.value)} />
            </div>
            <button type='Submit'>post blog</button>
        </form>
    )
}

export default Post