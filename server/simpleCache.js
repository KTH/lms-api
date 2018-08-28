const CanvasApi = require('kth-canvas-api')
const logger = require('../logger')
const humanInterval = require('human-interval')

const canvasApi = new CanvasApi(process.env.CANVAS_API_URL, process.env.CANVAS_API_KEY)

let cachedCourses = new Map()

async function cacheCourses () {
  const coursesMap = new Map()
  try {
    const courses = await canvasApi.listCourses()
    courses.filter(course => course.sis_course_id).forEach(course => { coursesMap.set(course.sis_course_id, course) })
  } catch (error) {
    logger.error('Couldnt fetch courses from Canvas. Using old, previously cached courses')
  }
  return coursesMap.size > 0 ? coursesMap : cachedCourses
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
