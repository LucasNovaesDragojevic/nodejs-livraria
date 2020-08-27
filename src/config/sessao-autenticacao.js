const { v4: uuidv4 } = require('uuid');
const sessao = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UsuarioDao = require('../app/infra/usuario-dao')
const db = require('./database')

module.exports = (app) => {

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha'
        },
        (email, senha, done) => {
            console.log('indo buscar usuario')
            const usuarioDao = new UsuarioDao(db)
            usuarioDao.buscaPorEmail(email)
                        .then(usuario => {
                            console.log('procurei')
                            if (!usuario || senha != usuario.senha) {
                                console.log('usuario ou senha errados')
                                return done(null, false, {
                                    mensagem: 'Login e senha incorretos.'
                                })
                            }
                            console.log('achei o usuario e senha está boa')
                            return done(null, usuario)
                        })
                        .catch(erro => done(erro, false))
        }
    ))

    passport.serializeUser((usuario, done) => {
        console.log('serializando')
        const usuarioSessao = {
            nome: usuario.nome_completo,
            email: usuario.email
        }
        done(null, usuarioSessao)
    })

    passport.deserializeUser((usuarioSessao, done) => {
        console.log('deserializando')
        done(null, usuarioSessao)
    })

    app.use(sessao({
        secret: 'node alura',
        genid: (request) => {
            return uuidv4()
        },
        resave: false,
        saveUninitialized: false
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    app.use((request, respose, next) => {
        console.log('ultima função do da autenticacao')
        request.passport = passport
        next()
    })
}