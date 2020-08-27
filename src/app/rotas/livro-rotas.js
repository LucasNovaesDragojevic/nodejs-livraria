const LivroControlador = require('../controladores/livro-controlador')
const BaseControlador = require('../controladores/base-controlador')
const Livro = require('../modelos/livro')
const { request, response } = require('express')

module.exports = (app) => {
    
    const livroControlador = new LivroControlador
    
    const rotasLivro = LivroControlador.rotas()

    app.use(rotasLivro.autenticadas, (request, response, next) => {
        if (request.isAuthenticated()) {
            next()
        }
        else {
            response.redirect(BaseControlador.rotas().login)
        }
    })
    
    app.get(rotasLivro.lista, livroControlador.lista())

    app.route(rotasLivro.cadastro)
        .get(livroControlador.formularioCadastro())
        .post(Livro.validacoes(), livroControlador.cadastra())
        .put(livroControlador.edita())
    
    app.get(rotasLivro.edicao, livroControlador.formularioEdicao())
    
    app.delete(rotasLivro.delecao, livroControlador.remove())
}