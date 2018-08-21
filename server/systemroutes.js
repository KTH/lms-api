
const express = require('express')
const rp = require('request-promise')
const version = require('../config/version')
const packageFile = require('../package.json')
const CanvasApi = require('kth-canvas-api')
const log = require('../logger')

const router = express.Router()
const canvasApi = new CanvasApi(process.env.CANVAS_API_URL, process.env.CANVAS_API_KEY)

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

async function checkCanvasKey () {
  let result
  try {
    await canvasApi.getRootAccount()
    result = true
  } catch (e) {
    log.info('An error occured:', e)
    result = false
  }
  return result
}

async function checkCanvasStatus () {
  let result
  try {
    const checkCanvasStatusTxt = await rp('http://nlxv32btr6v7.statuspage.io/api/v2/status.json')
    const checkCanvasStatus = JSON.parse(checkCanvasStatusTxt)

    result = checkCanvasStatus.status.indicator === 'none'
  } catch (e) {
    log.info('An error occured:', e)
    result = false
  }
  return result
}

async function _monitor (req, res) {
  const canvasKeyOk = await checkCanvasKey()
  const statusStr = [
    `CANVASKEY: ${canvasKeyOk ? 'OK' : 'ERROR'}`,
    `APPLICATION_STATUS: ${canvasKeyOk ? 'OK' : 'ERROR'}`
  ].join('\n')

  res.setHeader('Content-Type', 'text/plain')
  log.info('Showing _monitor page:', statusStr)
  res.send(statusStr)
}

async function _monitorAll (req, res) {
  const canvasKeyOk = await checkCanvasKey()
  const canvasOk = await checkCanvasStatus()
  const statusStr = [
    `CANVAS: ${canvasOk ? 'OK' : 'ERROR'}`,
    `CANVASKEY: ${canvasKeyOk ? 'OK' : 'ERROR'}`,
    `APPLICATION_STATUS: ${(canvasKeyOk && canvasOk) ? 'OK' : 'ERROR'}`
  ].join('\n')

  res.setHeader('Content-Type', 'text/plain')
  log.info('Showing _monitor_all page:', statusStr)
  res.send(statusStr)
}

function _monitorCore (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.send('APPLICATION_STATUS: OK')
}

router.get('/_monitor', _monitor)
router.get('/_monitor_all', _monitorAll)
router.get('/_monitor_core', _monitorCore)
router.get('/_about', _about)

module.exports = router
