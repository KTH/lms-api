
const express = require('express')
const router = express.Router()
const config = require('./configuration')
const rp = require('request-promise')

const version = require('../config/version')
const packageFile = require('../package.json')
const CanvasApi = require('kth-canvas-api')
const canvasApi = new CanvasApi(process.env.CANVAS_API_URL, process.env.CANVAS_API_KEY)
const log = require('kth-node-log')

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

async function status () {
  let canvasOk
  try {
    const checkCanvasStatusTxt = await rp('http://nlxv32btr6v7.statuspage.io/api/v2/status.json')
    const checkCanvasStatus = JSON.parse(checkCanvasStatusTxt)

    canvasOk = checkCanvasStatus.status.indicator === 'none'
  } catch (e) {
    log.info('An error occured:', e)
    canvasOk = false
  }

  let canvasKeyOk
  try {
    await canvasApi.getRootAccount()
    canvasKeyOk = true
  } catch (e) {
    log.info('An error occured:', e)
    canvasKeyOk = false
  }
  return {canvasOk, canvasKeyOk}
}

async function _monitor (req, res) {
  const {canvasOk, canvasKeyOk} = await status()

  res.setHeader('Content-Type', 'text/plain')
  const statusStr = `
CANVAS: ${canvasOk ? 'OK' : 'ERROR'}
CANVASKEY: ${canvasKeyOk ? 'OK' : 'ERROR'}

APPLICATION_STATUS: ${canvasOk ? 'OK' : 'ERROR'}
    `
  log.info('Showing status page:')
  res.send(statusStr)
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
