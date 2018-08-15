require('dotenv').config()
const test = require('tape')
const course = require('../../../server/api/course')
const sinon = require('sinon')

// This test takes a while to complete...
test('should cache course 85, Canvas at KTH', async t => {
  const req = {}
  let body
  const res = {
    status: sinon.spy(),
    json (_body) {
      body = _body
    }
  }

  await course.allCourses(req, res)
  t.ok(body['canvas-at-kth'])
  t.end()
})
