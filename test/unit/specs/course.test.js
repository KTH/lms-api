const test = require('tape')
const course = require('../../../server/api/course')
const sinon = require('sinon')
test('should return cached courses', async t => {
  const res = sinon.spy()
  const req = sinon.spy()
  await course.allCourses(req, res)
  t.end()
})
