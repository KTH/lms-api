const test = require('tape')
const rewire = require('rewire')
const simpleCache = rewire('../../../simpleCache')
const sinon = require('sinon')

test(`the getter for courses 
            should initialize the fetching of courses from Canvas 
            if they havent been fetched yet, 
            and return a Promise containing a map with the canvas courses`, async t => {
  const course = {sis_course_id: 'a sis course code'}
  simpleCache.__get__('canvasApi').listCourses = () => Promise.resolve([course])

  // make sure that courses arent fetched yet
  simpleCache.__set__('cache', null)

  const result = await simpleCache.getCourses()

  // The map should contain the course from Canvas
  t.ok(result.get(course.sis_course_id))
  t.deepEqual(result.get(course.sis_course_id), course)

  t.end()
})

test(`the function cacheCourses 
            should fetch courses from Canvas
            and only include those courses that has a sis_course_id`, async t => {
  const renewCache = simpleCache.__get__('renewCache')
  simpleCache.__set__('coursesMap', new Map())
  simpleCache.__get__('canvasApi').listCourses = () => Promise.resolve([{}, {sis_course_id: '123'}])
  const result = await renewCache()

  t.equal(result.size, 1)
  t.ok(result.get('123'))
  t.end()
})

test(`the function cacheCourses 
            should keep the previously cached courses if the requests to Canvas fails`, async t => {
  const renewCache = simpleCache.__get__('renewCache')

  const coursesBeforeCaching = simpleCache.__get__('coursesMap')
  // Mock canvasApi.listCourses to throw an error
  simpleCache.__get__('canvasApi').listCourses = sinon.stub().throws(new Error())

  const result = await renewCache()
  t.is(result, coursesBeforeCaching)
  t.end()
})
