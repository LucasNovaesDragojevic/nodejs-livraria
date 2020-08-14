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
        response.marko(require('../views/livros/lista/lista.marko'), {
            livros: [
                {
                    id: 1,
                    titulo: 'fundamentos do node'
                },
                {
                    id: 2,
                    titulo: 'node avançado'
                }
            ]
        })
    })
}