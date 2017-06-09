
const express = require('express')
const router = express.Router()
const config = require('./configuration')
const rp = require('request-promise')

const version = require('../config/version')
const packageFile = require('../package.json')
const CanvasApi = require('kth-canvas-api')
const canvasApi = new CanvasApi(process.env.CANVAS_API_URL, process.env.CANVAS_API_KEY)

function _about(req, res) {
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

function status () {
  let canvasOk, canvasKeyOk

  const checkCanvasStatus = rp('http://nlxv32btr6v7.statuspage.io/api/v2/status.json')
    .then(JSON.parse)
    .then(({status}) => status.indicator === 'none')

  let readAccountInCanvas = canvasApi.getRootAccount()

  return checkCanvasStatus
    .then(_canvasOk => canvasOk = _canvasOk)
    .catch(e => canvasOk = false)
    .then(() => readAccountInCanvas)
    .then(keyOk => canvasKeyOk = keyOk)
    .catch(e => canvasKeyOk = false)
    .then(() => {
      return {canvasOk, canvasKeyOk}
    })
}

function _monitor (req, res) {
  status().then(({canvasOk, ugOk, canvasKeyOk}) => {
    console.log('status: ', canvasOk, ugOk, canvasKeyOk)
    res.setHeader('Content-Type', 'text/plain')

    res.send(`
CANVAS: ${canvasOk ? 'OK' : 'ERROR'}
CANVASKEY: ${canvasKeyOk ? 'OK' : 'ERROR'}

APPLICATION_STATUS: ${canvasOk ? 'OK' : 'ERROR'}
    `)
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
router.get('/_about', _about)

module.exports = router
