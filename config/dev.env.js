'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API:'"http://localhost:7001/api"',
  SOCKET:'"http://localhost:7001"'
})
