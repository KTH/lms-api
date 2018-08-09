const test = require('tape')
const rewire = require('rewire')
const course = rewire('../../../server/api/course')
const sinon = require('sinon')

test('the function strMapToObj should convert a Map to a standard JS object', async t => {
  const map = new Map()
  map.set('a course code', {id: 123})
  const strMapToObj = course.__get__('strMapToObj')
  const result = await strMapToObj(map)

  t.deepEqual(result, {
    'a course code': {id: 123}
  })
  t.end()
})

test('the function strMapToObj should return an empty object if the map is null', async t => {
  const strMapToObj = course.__get__('strMapToObj')
  const result = await strMapToObj(null)

  t.deepEqual(result, {})
  t.end()
})

// TODO: replace this test with an integration test without mocks/stubs
test('the function allCourses should render the cached courses', async t => {
  const res = {json: sinon.stub()}

  // Mock the calls to Canvas, we have one cached course
  course.__set__('simpleCache', {courses: Promise.resolve(new Map([
    ['SF1624', {}]
  ]))})

  await course.allCourses(null, res)

  t.ok(res.json.calledWith({'SF1624': {}}))
  t.end()
})
