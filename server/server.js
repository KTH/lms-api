const server = require('kth-node-server')
const api = require('./api')
const systemRoutes = require('./systemroutes')
const log = require('../logger')

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
