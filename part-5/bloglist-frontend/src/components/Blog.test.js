import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, within } from '@testing-library/react'
import Blog from './Blog.js'

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

    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')

    const toggleable = container.querySelector('.toggleable')

    expect(div).toHaveTextContent('Art of the Ballad')
    expect(div).toHaveTextContent('Chet Baker')

    expect(toggleable).toHaveStyle('display: none')

})