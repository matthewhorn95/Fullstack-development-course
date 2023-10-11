import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog.js'
import Post from './Post.js'


describe('Blog tests', () => {

    test('default blog', () => {

        const blog = {
            title: 'Art of the Ballad',
            author: 'Chet Baker',
            url: 'fakeurl.org',
            likes: 38,
            user: {
                name: 'Cheese Rat'
            }
        }

        const container = render(<Blog blog={blog} />).container

        const div = container.querySelector('.blog')

        const toggleable = container.querySelector('.toggleable')

        expect(div).toHaveTextContent('Art of the Ballad')
        expect(div).toHaveTextContent('Chet Baker')

        expect(toggleable).toHaveStyle('display: none')

    })

    test('toggle activates visibility', async () => {

        const blog = {
            title: 'Art of the Ballad',
            author: 'Chet Baker',
            url: 'fakeurl.org',
            likes: 38,
            user: {
                name: 'Cheese Rat'
            }
        }

        const container = render(<Blog blog={blog} />).container

        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const toggleable = container.querySelector('.toggleable')

        expect(toggleable).toHaveStyle('display: block')

    })

    test('two button clicks calls handler twice', async () => {

        const setBlogs = jest.fn()
        const setNotification = jest.fn()

        const blog = {
            title: 'Art of the Ballad',
            author: 'Chet Baker',
            url: 'fakeurl.org',
            likes: 38,
            user: {
                name: 'Cheese Rat'
            }
        }

        render(<Blog blog={blog} setBlogs={setBlogs} setNotification={setNotification} />)

        const user = userEvent.setup()
        await user.click(screen.getByText('view'))
        const buttonLike = screen.getByText('like')
        await user.click(buttonLike)

        expect(setBlogs).toHaveBeenCalledTimes(1)

    })

    test('new note post', async () => {

        const setBlogs = jest.fn()
        const setNotification = jest.fn()

        render(<Post setBlogs={setBlogs} setNotification={setNotification} />)

        const titleInput = screen.getByPlaceholderText('title')
        const authorInput = screen.getByPlaceholderText('author')
        const urlInput = screen.getByPlaceholderText('url')
        const submitButton = screen.getByPlaceholderText('post button')

        await act(async () => {
            await userEvent.type(titleInput, 'Kind of Blue')
            await userEvent.type(authorInput, 'Miles Davis')
            await userEvent.type(urlInput, 'kindofblue.org')
            await userEvent.click(submitButton)
        })

        expect(setBlogs).toHaveBeenCalledTimes(1)
    })
})

