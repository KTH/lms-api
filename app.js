'use strict'
// Load .env file in development mode
const nodeEnv = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase()
const logger = require('./logger')
if (nodeEnv === 'development' || nodeEnv === 'dev' || !nodeEnv) {
  require('dotenv').config()
} else if (!process.env.SERVICE_PUBLISH) {
  // This is an ANSIBLE machine which doesn't set env-vars atm
  // so read localSettings.js which we now use to fake env-vars
  // because it already exists in our Ansible setup.
  require('./config/localSettings')
}

const config = require('./config/serverSettings')
require('./simpleCache').start()

const server = require('./server/server')

module.exports = server.start({
  useSsl: config.useSsl,
  port: config.port,
  logger
})
