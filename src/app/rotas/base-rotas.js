const BaseControlador = require('../controladores/base-controlador')

module.exports = (app) => {

    const baseControlador = new BaseControlador();
    
    const rotasBase = BaseControlador.rotas()

    app.get(rotasBase.home, baseControlador.home())
}