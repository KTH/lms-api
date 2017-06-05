const simpleCache = require('../../simpleCache')

function strMapToObj (strMap) {
  let obj = Object.create(null)
  for (let [k, v] of strMap) {
    obj[k] = v
  }
  return obj
}

module.exports = {
  course(req, res) {
    simpleCache.courses.then(coursesMap => {
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
    })
  },
  allCourses(req, res) {
    simpleCache.courses.then(coursesMap => {
      res.json(strMapToObj(coursesMap))
    })
  }
}
