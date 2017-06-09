'use strict'
const server = require('kth-node-server')
const log = require('kth-node-log')
const api = require('./api')
const systemRoutes = require('./systemroutes')

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

server.use('/lms-api/', systemRoutes)
server.use('/lms-api/api/', api)

async function preloadCache(){
  log.info('::::::::::::::: preload the cache with all courses in canvas :::::::::::::::::')
  await require('../simpleCache').courses
  log.info('courses is preloaded')
}
preloadCache()

module.exports = server
