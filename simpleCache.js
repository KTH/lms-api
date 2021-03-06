/**
 * Created by elenara on 01/07/16.
 */
const CanvasApi = require('kth-canvas-api')
const logger = require('./logger')

const canvasApi = new CanvasApi(process.env.CANVAS_API_URL, process.env.CANVAS_API_KEY)
const humanInterval = require('human-interval')

let cache
const coursesMap = new Map()

async function renewCache () {
  try {
    const courses = await canvasApi.listCourses()
    coursesMap.clear()
    courses.filter(course => course.sis_course_id).forEach(course => { coursesMap.set(course.sis_course_id, course) })
  } catch (error) {
    logger.error('Couldnt fetch courses from Canvas. Using old, previously cached courses')
  }
  return coursesMap
}

/*
Refresh cache periodically
*/

module.exports = {
  start () {
    setInterval(() => { cache = renewCache() }, humanInterval('15 minutes'))
  },
  getCourses () {
    if (!cache) {
      cache = renewCache()
    }
    return cache
  }
}
