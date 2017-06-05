'use strict'

const express = require('express')
const router = express.Router()
const course = require('./course')

router.get('/courses', course.allCourses)
router.get('/courses/:courseCode', course.course)
module.exports = router
