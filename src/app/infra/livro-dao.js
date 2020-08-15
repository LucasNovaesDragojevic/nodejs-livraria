class LivroDao {
    constructor(db) {
        this._db = db
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os livros')
                    console.log('livros listados')
                    return resolve(resultados)
                }
            )
        })
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                'SELECT * FROM livros WHERE id = ?',
                [ id ],
                (error, resultado) => {
                    if (error) {
                        console.log(error)
                        return reject('Não foi possível buscar o livro por id')
                    }
                    console.log('livro buscado')
                    return resolve(resultado)
                }
            )}
        )
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                'INSERT INTO livros (titulo, preco, descricao) VALUES (?,?,?)', 
                [ livro.titulo, livro.preco, livro.descricao ],
                (error) => {
                    if (error) {
                        console.log(error)
                        return reject('Não foi possível inserir o livro')
                    }
                    console.log('livro adicionado')
                    return resolve()
                }
            )
        })
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                'UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?', 
                [ livro.titulo, livro.preco, livro.descricao, livro.id ],
                (error) => {
                    if (error) {
                        console.log(error)
                        return reject('Não foi possível inserir o livro')
                    }
                    console.log('livro adicionado')
                    return resolve()
                }
            )
        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(
                'DELETE FROM livros WHERE id = ?',
                [ id ],
                (error) => {
                    if (error) {
                        console.log(error)
                        return reject('Não foi possível remover o livro')
                    }
                    console.log('livro deletado')
                    return resolve
                }
            )
        })
    }
}

module.exports = LivroDao