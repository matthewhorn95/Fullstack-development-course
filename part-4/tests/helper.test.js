const listHelper = require('../utils/list_helper.js')

test('dummy returns one', () => {
    const blogs = []

    return expect(listHelper.dummy(blogs)).toBe(1)
})