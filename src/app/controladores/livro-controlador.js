const { validationResult } = require('express-validator/check')
const LivroDao = require('../infra/livro-dao')
const db = require('../../config/database')
const templates = require('../views/templates')

class LivroControladdor {

    static rotas() {
        return {
            autenticadas: '/livros*' ,
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        }
    }
    
    lista() {
        return function(request, response) {
            const livroDao = new LivroDao(db)
            livroDao.lista()
                    .then(livros => response.marko(
                        templates.livros.lista, {
                            livros: livros
                        }
                    ))
                    .catch(erro => console.log(erro))
        }
    }
    
    formularioCadastro() {
        return (request, response) => response.marko(templates.livros.form, { livro: {} })
    }

    formularioEdicao() {
        return (request, response) => {
            const id = request.params.id
            const livroDao = new LivroDao(db)
            livroDao.buscaPorId(id)
                    .then(livro => response.marko(templates.livros.form, { livro: livro }))
                    .catch(erro => console.log(erro))
        }
    }

    cadastra() {
        return (request, response) => {
            console.log(request.body)
    
            const livroDao = new LivroDao(db)
            const erros = validationResult(request)
    
            if (!erros.isEmpty()) {
                return response.marko(
                    templates.livros.form, 
                    { 
                        livro: {},
                        errosValidacao: erros.array()
                    }
                )
            }
    
            livroDao.adiciona(request.body)
                    .then(response.redirect(rotas().lista))
                    .catch(erro => console.log(erro))
        }
    }

    edita() {
        return (request, response) => {
            console.log(request.body)
            const livroDao = new LivroDao(db);
            livroDao.atualiza(request.body)
                    .then(response.redirect(rotas().lista))
                    .catch(erro => console.log(erro))
        }
    }

    remove() {
        return (request, response) => {
            const id = request.params.id
            const livroDao = new LivroDao(db)
            livroDao.remove(id)
                    .then(() => response.status(200).end)
                    .catch(erro => console.log(erro))
        }
    }
}
module.exports = LivroControladdor