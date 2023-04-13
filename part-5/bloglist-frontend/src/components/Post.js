const Post = ({ title, handleTitle, author, handleAuthor, url, handleUrl, handlePost }) => {
    return (
        <form onSubmit={handlePost}>
            <div>
                title <input value={title} onChange={handleTitle} />
            </div>
            <div>
                author <input value={author} onChange={handleAuthor} />
            </div>
            <div>
                url <input value={url} onChange={handleUrl} />
            </div>
            <button type='Submit'>post blog</button>
        </form>
    )
}

export default Post