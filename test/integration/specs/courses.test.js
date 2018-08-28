require('dotenv').config()
const test = require('tape')
const rewire = require('rewire')
const api = rewire('../../../server/api')

test('should cache course 85, Canvas at KTH', async t => {
  const req = {}
  const resMock = {
    status: () => {},
    json (body) {
      // Check that the course 'canvas-at-kth' is cached alright
      t.ok(body['canvas-at-kth'])
      t.end()
    }
  }

  const getAllCourses = api.__get__('getAllCourses')

  await getAllCourses(req, resMock)
})
