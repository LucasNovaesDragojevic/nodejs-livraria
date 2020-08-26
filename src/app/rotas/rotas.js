const { request, response } = require('express')

const baseRotas = require('./base-rotas')
const livroRotas = require('./livro-rotas')

module.exports = (app) => {
    baseRotas(app)
    livroRotas(app)
}