import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog.js'


describe('Blog tests', () => {

    let container

    beforeEach(() => {

        const blog = {
            title: 'Art of the Ballad',
            author: 'Chet Baker',
            url: 'fakeurl.org',
            likes: 38,
            user: {
                name: 'Cheese Rat'
            }
        }

        container = render(< Blog blog={blog} />).container
    })

    test('default blog', () => {

        const div = container.querySelector('.blog')

        const toggleable = container.querySelector('.toggleable')

        expect(div).toHaveTextContent('Art of the Ballad')
        expect(div).toHaveTextContent('Chet Baker')

        expect(toggleable).toHaveStyle('display: none')

    })

    test('toggle activates visibility', async () => {

        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const toggleable = container.querySelector('.toggleable')

        expect(toggleable).toHaveStyle('display: block')

    })
})

