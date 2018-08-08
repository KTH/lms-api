const test = require('tape')
const rewire = require('rewire')
const simpleCache = rewire('../../../simpleCache')
const sinon = require('sinon')

test(`the getter for courses 
            should initialize the fetching of courses from Canvas 
            if they havent been fetched yet, 
            and return a Promise containing a map with the canvas courses`, async t =>{
    const cacheCourses = simpleCache.__get__('cacheCourses')
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