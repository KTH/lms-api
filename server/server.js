const server = require('kth-node-server')
const systemRoutes = require('./systemroutes')
const log = require('../logger')

server.use('/api/lms-api/', systemRoutes)

module.exports = server
