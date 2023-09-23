import { useState } from 'react'
import blogService from '../services/blogs'

const Post = ({ setBlogs, setNotification }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handlePost = (event) => {
        event.preventDefault()
        console.log('post handler called!')

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
                title <input value={title}
                             onChange={event => setTitle(event.target.value)}
                             placeholder='title' />
            </div>
            <div>
                author <input value={author}
                              onChange={event => setAuthor(event.target.value)}
                              placeholder='author' />
            </div>
            <div>
                url <input value={url}
                            onChange={event => setUrl(event.target.value)}
                            placeholder='url' />
            </div>
            <button type='Submit' placeholder='post button'>post blog</button>
        </form>
    )
}

export default Post