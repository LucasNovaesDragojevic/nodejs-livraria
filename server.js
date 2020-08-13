const http = require('http')

const servidor = http.createServer(function (request, response) {
    let html = ''
    if (request.url == '/')
    {
        html = 
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
    }
    else if (request.url == '/livros')
    {
        html = 
        `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Livros</h1>
                </body>
            </html>
        `
    }
    response.end(html)
})

servidor.listen(3000)