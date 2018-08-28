const server = require('kth-node-server')
const systemRoutes = require('./systemroutes')
const api = require('./api')
const log = require('../logger')
const simpleCache = require('./simpleCache')

server.use('/api/lms-api/', systemRoutes)
server.use('/api/lms-api/api/', api)

async function preloadCache () {
  log.info('::::::::::::::: preload the cache with all courses in canvas :::::::::::::::::')
  simpleCache.start()
  try {
    await simpleCache.getCourses()
    log.info('courses is preloaded')
  } catch (e) {
    log.error('An error occured.', e)
  }
}

preloadCache()

module.exports = server
