const listHelper = require('../utils/list_helper.js')
const mongoose = require('mongoose')
const app = require('../app.js')
const supertest = require('supertest')
const Blog = require('../models/blog.js')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testList)
}, 30000)

describe('database', () => {
    test('get returns blogs', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('id is defined', async () => {
        const response = await api
            .get('/api/blogs')
        response.body.map(blog => expect(blog.id).toBeDefined())
    })

    test('post new blog to database', async () => {
        const initResponse = await api
            .get('/api/blogs')
        const initialLength = initResponse.body.length

        let noteToInsert = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2
        }
        let newBlog = new Blog(noteToInsert)

        await api
            .post('/api/blogs')
            .send(newBlog.toJSON())
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const getResponse = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const titles = getResponse.body.map(blog => blog.title)
        expect(getResponse.body).toHaveLength(initialLength + 1)
        expect(titles).toContain('Type wars')

    })

    test('missing likes defaults to zero', async () => {
        let noteToInsert = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
        }
        let newBlog = new Blog(noteToInsert)

        const postResponse = await api
            .post('/api/blogs')
            .send(newBlog.toJSON())
            .expect(201)
            .expect('Content-Type', /application\/json/)
        console.log(postResponse.body)
        expect(postResponse.body.likes).toEqual(0)

    })

    test('missing title or url gives 400 status', async () => {
        let missingUrlBlog = {
            title: "Type wars",
            author: "Robert C. Martin",
            likes: 2
        }
        let missingTitleBlog = {
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2
        }
        let missingUrlBlogpost = new Blog(missingUrlBlog)
        let missingTitleBlogpost = new Blog(missingTitleBlog)

        await api
            .post('/api/blogs')
            .send(missingUrlBlogpost.toJSON())
            .expect(400)
        await api
            .post('/api/blogs')
            .send(missingTitleBlogpost.toJSON())
            .expect(400)
    })

    test('get single blog by id', async () => {
        const res = await api
            .get('/api/blogs/5a422a851b54a676234d17f7')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        console.log(res.body)
    })

    test('delete a single blog', async () => {
        await api
            .delete('/api/blogs/5a422a851b54a676234d17f7')
            .expect(404)
        await api
            .get('/api/blogs/5a422a851b54a676234d17f7')
            .expect(200)

        const blogAfterRemoval = await api
            .get('/api/blogs')

        expect(blogAfterRemoval.body).toHaveLength(testList.length - 1)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})

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

describe('best author by blog count', () => {
    test('single blog gives single author', () => {
        return expect(listHelper.mostBlogs(singleBlogList).author).toBe("Robert C. Martin") &&
        expect(listHelper.mostBlogs(singleBlogList).author).toBe(1)
    })

    test('multiple blog gives best author', () => {
        return expect(listHelper.mostBlogs(testList).author).toBe("Robert C. Martin") &&
        expect(listHelper.mostBlogs(testList).author).toBe(3)
    })
})

describe('best author by total likes', () => {
    test('single blog gives single author', () => {
        return expect(listHelper.mostLikes(singleBlogList).author).toBe("Robert C. Martin") &&
        expect(listHelper.mostLikes(singleBlogList).author).toBe(2)
    })

    test('multiple blog gives best author', () => {
        return expect(listHelper.mostLikes(testList).author).toBe("Edsger W. Dijkstra") &&
        expect(listHelper.mostLikes(testList).author).toBe(17)
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