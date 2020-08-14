const LivroDao = require('../infra/livro-dao')
const db = require('../../config/database')

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
}