'use strict'

const express = require('express')
const router = express.Router()
const course = require('./course')

router.get('/api/courses', course.allCourses)
router.get('/api/courses/:courseCode', course.course)
module.exports = router
