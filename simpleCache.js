/**
 * Created by elenara on 01/07/16.
 */
const config = require('./server/configuration')
const CanvasApi = require('kth-canvas-api')

const canvasApi = new CanvasApi(config.server.canvas.apiUrl, process.env.CANVAS_API_KEY)
const humanInterval = require('human-interval')

const coursesMap = new Map()

function cacheCourses () {
  return canvasApi.listCourses().then(courses => {
    console.log('caching courses'.rainbow)
    coursesMap.clear()
    courses.filter(course => course.sis_course_id).forEach(course => coursesMap.set(course.sis_course_id, course))
    return coursesMap
  })
}

let cachedCourses

/*
Refresh cache periodically
*/

setInterval(() => cachedCourses = cacheCourses(), humanInterval('15 minutes'))

module.exports = {
  get courses(){
    if(!cachedCourses){
      cachedCourses = cacheCourses()
    }
    return cachedCourses
  }
}
