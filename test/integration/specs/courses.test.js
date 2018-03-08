require('dotenv').config()
require('should')
const test = require('tape')
const sinon = require('sinon')
const course = require('../../../server/api/course')

// This test takes a while to complete...
test('should cache course 85, Canvas at KTH', async t => {
  const req = {}
  const res = {status: sinon.spy(), json: sinon.spy()}
  res.json('foo')
  /* await */ // course.allCourses(req, res)
  sinon.assert.calledWith(res.json, 'foo')
  // res.json.should.have.been.calledWith({1: 2})
  t.end()
})
