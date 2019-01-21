const server = require('kth-node-server')
const systemRoutes = require('./systemroutes')

server.use('/api/lms-api/', systemRoutes)

module.exports = server
