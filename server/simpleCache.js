const CanvasApi = require('kth-canvas-api')
const logger = require('../logger')
const humanInterval = require('human-interval')

const canvasApi = new CanvasApi(process.env.CANVAS_API_URL, process.env.CANVAS_API_KEY)
const coursesMap = new Map()

let cachedCourses

async function cacheCourses () {
  try {
    const courses = await canvasApi.listCourses()
    coursesMap.clear()
    courses.filter(course => course.sis_course_id).forEach(course => { coursesMap.set(course.sis_course_id, course) })
  } catch (error) {
    logger.error('Couldnt fetch courses from Canvas. Using old, previously cached courses')
  }
  return coursesMap
}

module.exports = {
  start () {
    setInterval(() => { cachedCourses = cacheCourses() }, humanInterval('15 minutes'))
  },
  getCourses () {
    if (!cachedCourses) {
      cachedCourses = cacheCourses()
    }
    return cachedCourses
  }
}
