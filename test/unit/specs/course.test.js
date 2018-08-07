const test = require('tape')
const rewire = require('rewire')
const course = rewire('../../../server/api/course')
const sinon = require('sinon')

test('strMapToObj should convert a Map to a standard JS object', async t => {
  const map = new Map()
  map.set('a course code', {id:123})
  const strMapToObj = course.__get__('strMapToObj')
  const result = await strMapToObj(map)

  t.deepEqual(result, {
    'a course code':{id:123}
  })
  t.end()
})

test('strMapToObj should return an empty object if the map is null', async t =>{
  const strMapToObj = course.__get__('strMapToObj')
  const result = await strMapToObj(null)

  t.deepEqual(result, {})
  t.end()
})

test('allCourses should return the cached courses', async t =>{
  const req = sinon.spy()
  const res = {json:sinon.stub()}
  course.__set__('simpleCache', {})

  await course.allCourses(req, res)
  t.equal(res.json.callCount, 1)
  t.end()
})

