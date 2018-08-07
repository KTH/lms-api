const test = require('tape')
const rewire = require('rewire')
const course = rewire('../../../server/api/course')
const sinon = require('sinon')

test('should convert a Map to a standard JS object', async t => {
  const res = sinon.spy()
  const req = sinon.spy()
  const map = new Map()
  map.set('a course code', {id:123})
  const strMapToObj = course.__get__('strMapToObj')
  const result = await strMapToObj(map)

  t.deepEqual(result, {
    'a course code':{id:123}
  })
  t.end()
})

