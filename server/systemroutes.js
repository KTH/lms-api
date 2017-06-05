/**
 * System controller for functions such as /about and /monitor
 */
// const rp = require('request-promise')
const express = require('express')
const router = express.Router()
// const config = require('../init/configuration')
// const canvasApi = require('canvas-api')(config.full.canvas.apiUrl, config.secure.canvas.apiKey)
// const migrateCourse = require('../api/migrateCourse')
// const getUsersForCourseInUG = require('../../getUsersForCourseInUG')
// const version = require('../../config/version')
// const packageFile = require('../../package.json')
// const agenda = require('../../agenda')
//
// /* GET /_about
//  * About page
//  */
// var _about = function (req, res) {
//   res.render('about', {
//     debug: 'debug' in req.query,
//     layout: 'systemLayout',
//     appName: JSON.stringify(packageFile.name),
//     appVersion: JSON.stringify(packageFile.version),
//     appDescription: JSON.stringify(packageFile.description),
//     version: JSON.stringify(version),
//     config: JSON.stringify(config.full.templateConfig),
//     gitBranch: JSON.stringify(version.gitBranch),
//     gitCommit: JSON.stringify(version.gitCommit),
//     jenkinsBuild: JSON.stringify(version.jenkinsBuild),
//     jenkinsBuildDate: JSON.stringify(version.jenkinsBuildDate)
//   })
// }
//
// function status () {
//   let canvasOk, koppsOk, ugOk, canvasKeyOk
//
//   const checkCanvasStatus = rp('http://nlxv32btr6v7.statuspage.io/api/v2/status.json')
//     .then(JSON.parse)
//     .then(({status}) => status.indicator === 'none')
//
//   let readAccountInCanvas = canvasApi.getRootAccount()
//
//   let readKopps = migrateCourse.getCourseAndCourseRoundFromKopps({courseCode: 'SF1626', startTerm: '2016:2', round: 1})
//   let readUg = getUsersForCourseInUG('SF1626', '2016:2', 1)
//
//   return checkCanvasStatus
//     .then(_canvasOk => canvasOk = _canvasOk)
//     .catch(e => canvasOk = false)
//     .then(() => readAccountInCanvas)
//     .then(keyOk => canvasKeyOk = keyOk)
//     .catch(e => canvasKeyOk = false)
//     .then(() => readKopps)
//     .then(courseAndCourseRounds => koppsOk = true)
//     .catch(e => koppsOk = false)
//     .then(() => readUg)
//     .then(usersForCourse => ugOk = true)
//     .catch(e => ugOk = false)
//     .then(() => {
//       return {canvasOk, koppsOk, ugOk, canvasKeyOk}
//     })
// }

/* GET /_monitor
 * Monitor page
 */
var _monitor = function (req, res) {
  res.send(`
APPLICATION_STATUS: OK
  `)
}

var _index = function (req, res) {
  return res.render('index', {
    layout: 'publicLayout',
    debug: 'debug' in req.query
  })
}

router.get('/_monitor', _monitor)
router.get('/_monitor_all', _monitor)
router.get('/_monitor_core', function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.send(`
APPLICATION_STATUS: OK
    `)
}
)
// router.get('/_about', _about)
// router.get('/', _index)

module.exports = router
