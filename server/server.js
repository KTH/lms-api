'use strict'
const server = require('kth-node-server')
const api = require('./api')
const systemRoutes = require('./systemroutes')
const log = require('../logger');
// Load .env file in development mode
const nodeEnv = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase()
if (nodeEnv === 'development' || nodeEnv === 'dev' || !nodeEnv) {
  require('dotenv').config()
} else if (!process.env.SERVICE_PUBLISH) {
  // This is an ANSIBLE machine which doesn't set env-vars atm
  // so read localSettings.js which we now use to fake env-vars
  // because it already exists in our Ansible setup.
  require('../config/localSettings')
}

server.use('/api/lms-api/', systemRoutes)
server.use('/api/lms-api/api/', api)

async function preloadCache () {
  log.info('::::::::::::::: preload the cache with all courses in canvas :::::::::::::::::')
  try {
    await require('../simpleCache').courses
    log.info('courses is preloaded')
  } catch (e) {
    log.error('An error occured.', e)
  }
}
preloadCache()

module.exports = server
