const listHelper = require('../utils/list_helper.js')

describe('dummy', () => {
    test('dummy returns one', () => {
        return expect(listHelper.dummy(emptyBlog)).toBe(1)
    })
})

describe('max likes', () => {
    test('find max likes of multiple blogs', () => {
        return expect(listHelper.maxLikes(testList)).toEqual(12)
    })

    test('max likes of single blog is its likes', () => {
        return expect(listHelper.maxLikes(singleBlogList)).toEqual(2)
    })
})


describe('total likes', () => {

    test('single blog list gives likes of single blog for total', () => {
        return expect(listHelper.totalLikes(singleBlogList)).toBe(2)
    })

    test('full blog list gives sum for total likes', () => {
        return expect(listHelper.totalLikes(testList)).toBe(36)
    })
})

describe('best author', () => {
    test('single blog gives single author', () => {
        return expect(listHelper.topAuthorLikes(singleBlogList).author).toBe("Robert C. Martin") &&
        expect(listHelper.topAuthorLikes(singleBlogList).author).toBe(1)
    })

    test('multiple blog gives best author', () => {
        return expect(listHelper.topAuthorLikes(testList).author).toBe("Robert C. Martin") &&
        expect(listHelper.topAuthorLikes(testList).author).toBe(3)
    })
})

const emptyBlog = []

const singleBlogList = [
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }
]

const testList = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }
  ]