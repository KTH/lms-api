require('dotenv').config()
const logger = require('./logger')
const config = require('./config/serverSettings')

require('./simpleCache').start()
const server = require('./server/server')

module.exports = server.start({
  useSsl: config.useSsl,
  port: config.port,
  logger
})
