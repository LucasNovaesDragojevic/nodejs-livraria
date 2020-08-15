require('marko/node-require').install()
require('marko/express')

const express = require('express')
const app = express()
const routes = require('../app/routes/routes')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

/**
 * Usa middleware do express para disponibilizar arquivos estáticos
 */
app.use('/estatico', express.static('src/app/public'))

/**
 * Atrela middleware do BodyParser ao Express
 * e habilita recebimento de JSON dos formulários HTTP
 */
app.use(bodyParser.urlencoded({
    extended: true
}))

/**
 * Troca requisição post para put
 */
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}))

routes(app)

module.exports = app