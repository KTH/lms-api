const test = require('tape')
const rewire = require('rewire')
const simpleCache = rewire('../../../simpleCache')
const sinon = require('sinon')

test(`the getter for courses 
            should initialize the fetching of courses from Canvas 
            if they havent been fetched yet, 
            and return a Promise containing a map with the canvas courses`, async t =>{
    const listCourses = simpleCache.__get__('listCourses')
    // Mock canvasApi.listCourses
    const course = {sis_course_id: 'a sis course code'}
    simpleCache.__get__('canvasApi').listCourses = ()=> Promise.resolve([course])
    
    // make sure that courses arent fetched yet
    simpleCache.__set__('cachedCourses', null) 
    
    // Invoke the getter
    const result = await simpleCache.courses

    // The map should contain the course from Canvas
    t.ok(result.get(course.sis_course_id))
    t.deepEqual(result.get(course.sis_course_id), course)
    
    t.end()
  })

  test(`the function listCourses 
            should fetch courses from Canvas
            and only include those courses that has a sis_course_id`, async t =>{
    const listCourses = simpleCache.__get__('listCourses')
    simpleCache.__get__('canvasApi').listCourses = ()=> Promise.resolve([{}, {sis_course_id:'123'}])
    const result = await listCourses()
    
    t.equal(result.size, 1)
    t.ok(result.get('123'))
    t.end()
  })

test(`the the getter for courses 
        should keep the previously fetched courses if listCourses fails`, async t =>{
const listCourses = simpleCache.__get__('listCourses')
simpleCache.__get__('canvasApi').listCourses = ()=> Promise.resolve([{}, {sis_course_id:'123'}])

t.ok(result.get('123'))
t.end()
})

