const BaseControlador = require('../controladores/base-controlador');
const base = require('../views/base');

module.exports = (app) => {

    const baseControlador = new BaseControlador();
    
    const rotasBase = BaseControlador.rotas()

    app.get(rotasBase.home, baseControlador.home())

    app.route(rotasBase.login)
        .get(baseControlador.login())
        .post(baseControlador.efetuaLogin())
}