/**
 * Created by elenara on 01/07/16.
 */
const CanvasApi = require('kth-canvas-api')

const canvasApi = new CanvasApi(process.env.CANVAS_API_URL, process.env.CANVAS_API_KEY)
const humanInterval = require('human-interval')

const coursesMap = new Map()

function cacheCourses () {
  return canvasApi.listCourses().then(courses => {
    coursesMap.clear()
    courses.filter(course => course.sis_course_id).forEach(course => coursesMap.set(course.sis_course_id, course))
    return coursesMap
  })
}

let cachedCourses

/*
Refresh cache periodically
*/

module.exports = {
  start () {
    setInterval(() => cachedCourses = cacheCourses(), humanInterval('15 minutes'))
  },
  get courses () {
    if (!cachedCourses) {
      cachedCourses = cacheCourses()
    }
    return cachedCourses
  }
}
