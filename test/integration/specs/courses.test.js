require('dotenv').config()
const test = require('tape')
const course = require('../../../server/api/course')

// This test takes a while to complete...
test('should cache course 85, Canvas at KTH', async t => {
  const req = {}
  let body
  const res = {status: sinon.spy(), json: _body=>{
    body = _body
  })}
  res.json('foo')
  console.log('body called with:', body)
  /* await */ // course.allCourses(req, res)
  // sinon.assert.calledWith(res.json, {})
  // res.json.should.have.been.calledWith({1: 2})
  t.end()
})
