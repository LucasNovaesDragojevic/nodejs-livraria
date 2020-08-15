const LivroDao = require('../infra/livro-dao')
const db = require('../../config/database')
const { request, response } = require('express')

module.exports = (app) => {
    app.get('/', function(request, response) {
        response.send(
            `
                <html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1>Livraria</h1>
                    </body>
                </html>
            `
        )
    })
    
    app.get('/livros', function(request, response) {
        const livroDao = new LivroDao(db)
        livroDao.lista()
                .then(livros => response.marko(
                    require('../views/livros/lista/lista.marko'), {
                        livros: livros
                    }
                ))
                .catch(erro => console.log(erro))
    })

    // Formulário de livro
    app.get('/livros/form', (request, response) => response.marko(require('../views/livros/form/form.marko'), { livro: {} }))

    // Formulário de livro para edição
    app.get('/livros/form/:id', (request, response) => {
        const id = request.params.id
        const livroDao = new LivroDao(db)
        livroDao.buscaPorId(id)
                .then(livro => response.marko(require('../views/livros/form/form.marko'), { livro: livro }))
                .catch(erro => console.log(erro))
    })

    app.post('/livros', (request, response) => {
        console.log(request.body)
        const livroDao = new LivroDao(db);
        livroDao.adiciona(request.body)
                .then(response.redirect('/livros'))
                .catch(erro => console.log(erro))
    })

    app.put('/livros', (request, response) => {
        console.log(request.body)
        const livroDao = new LivroDao(db);
        livroDao.atualiza(request.body)
                .then(response.redirect('/livros'))
                .catch(erro => console.log(erro))
    })

    app.delete('/livros/:id', (request, response) => {
        const id = request.params.id
        const livroDao = new LivroDao(db)
        livroDao.remove(id)
                .then(() => response.status(200).end)
                .catch(erro => console.log(erro))
    })
}