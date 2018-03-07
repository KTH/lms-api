'use strict'
// Load .env file in development mode
const nodeEnv = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase()

const log = require('kth-node-log')
log.init({
  name: 'lms-api'
})

if (nodeEnv === 'development' || nodeEnv === 'dev' || !nodeEnv) {
  require('dotenv').config()
} else if (!process.env.SERVICE_PUBLISH) {
  // This is an ANSIBLE machine which doesn't set env-vars atm
  // so read localSettings.js which we now use to fake env-vars
  // because it already exists in our Ansible setup.
  require('./config/localSettings')
}

const config = require('./config/serverSettings')

const server = require('./server/server')

module.exports = server.start({
  useSsl: config.useSsl,
  port: config.port,
  logger: log
})
