const templates = require('../views/templates')

class BaseControlador {

    static rotas() {
        return {
            home: '/'
        }
    }
    
    home() {
        return (request, response) => {
            response.marko(templates.base.home)
        }
    }
}
module.exports = BaseControlador