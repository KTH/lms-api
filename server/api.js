const express = require('express')
const router = express.Router()
const simpleCache = require('./simpleCache')
const log = require('../logger')

function strMapToObj (strMap) {
  let obj = Object.create(null)
  if (strMap) {
    for (let [k, v] of strMap) {
      obj[k] = v
    }
  }
  return obj
}

async function getCourse (req, res) {
  try {
    const coursesMap = await simpleCache.getCourses()
    const courses = []
    for (let [, value] of coursesMap) {
      courses.push(value)
    }
    const result = courses.filter(course => course.course_code === req.params.courseCode)
    if (result.length === 0) {
      res.sendStatus(404)
    } else {
      res.json(result)
    }
  } catch (e) {
    log.error('An error occured:', e)
    res.status(500).send('Internal server error!')
  }
}

async function getAllCourses (req, res) {
  try {
    const coursesMap = await simpleCache.getCourses()
    res.json(strMapToObj(coursesMap))
  } catch (e) {
    log.error('An error occured:', e)
    res.status(500).send('Internal server error!')
  }
}

router.get('/courses', getAllCourses)
router.get('/courses/:courseCode', getCourse)
module.exports = router
