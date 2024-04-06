module.exports = {
    routes: [{ // Path defined with an URL parameter
        method: 'POST',
        path: '/armadilha/upload',
        handler: 'armadilha.upload_armadilha',
    }, { // Path defined with an URL parameter
        method: 'PUT',
        path: '/users',
        handler: 'armadilha.user',
    }, { // Path defined with an URL parameter
        method: 'DELETE',
        path: '/users',
        handler: 'armadilha.user',
    },{ // Path defined with an URL parameter
        method: 'POST',
        path: '/armadilha/visita',
        handler: 'armadilha.uploadVisita',
    },{ // Path defined with an URL parameter
        method: 'POST',
        path: '/armadilhas',
        handler: 'armadilha.uploadArmadilha',
    },{ // Path defined with an URL parameter
        method: 'POST',
        path: '/armadilhas/anexos',
        handler: 'armadilha.uploadAnexos',
    },{ // Path defined with an URL parameter
        method: 'GET',
        path: '/armadilhas/qrcode/:id',
        handler: 'armadilha.qrcode',
    }]
}
