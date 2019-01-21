const express = require('express')
const router = express.Router()

const version = require('../config/version')
const packageFile = require('../package.json')

function _about (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.send(`
    packageFile.name:${packageFile.name}
    packageFile.version:${packageFile.version}
    packageFile.description:${packageFile.description}
    version.gitBranch:${version.gitBranch}
    version.gitCommit:${version.gitCommit}
    version.jenkinsBuild:${version.jenkinsBuild}
    version.dockerName:${version.dockerName}
    version.dockerVersion:${version.dockerVersion}
    version.jenkinsBuildDate:${version.jenkinsBuildDate}`)
}

router.get('/_monitor', function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.send('APPLICATION_STATUS: OK')
})

router.get('/_monitor_all', function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.send('APPLICATION_STATUS: OK')
})

router.get('/_monitor_core', function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.send('APPLICATION_STATUS: OK')
})

router.get('/_about', _about)

module.exports = router
