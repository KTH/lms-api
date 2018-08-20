require('dotenv').config()
const test = require('tape')
const course = require('../../../server/api/course')
const sinon = require('sinon')

test('should cache course 85, Canvas at KTH', async t => {
  const req = {}
  const resMock = {
    status: ()=>{},
    json (body) {
        // Check that the course 'canvas-at-kth' is cached alright 
        t.ok(body['canvas-at-kth'])
        t.end()
    }
  }

  await course.allCourses(req, resMock)

})
