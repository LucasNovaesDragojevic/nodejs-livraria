const { check } = require('express-validator/check');

class Livro {
    static validacoes() {
        return [
            check('titulo').isLength({ min: 5 }).withMessage('O título deve possuir mais de 5 caracteres.'),
            check('preco').isCurrency().withMessage('O preço precisa ser um valor monetário válido.')
        ]
    }
}
module.exports = Livro