const simpleCache = require('../../simpleCache')
const log = require('../../logger')

function strMapToObj (strMap) {
  let obj = Object.create(null)

  if(strMap){
    for (let [k, v] of strMap) {
      obj[k] = v
    }
  }
  return obj
}

module.exports = {
  async course (req, res) {

    try {
      const coursesMap = await simpleCache.courses
      const courses = []
      for (let [k, v] of coursesMap) {
        courses.push(v)
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
  },
  async allCourses (req, res) {
    try {
      const coursesMap = await simpleCache.courses
      res.json(strMapToObj(coursesMap))
    } catch (e) {
      log.error('An error occured:', e)
      res.status(500).send('Internal server error!')
    }
  }
}
