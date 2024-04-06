module.exports = {
    routes: [{ // Path defined with an URL parameter
        method: 'POST',
        path: '/ninhos/upload',
        handler: 'ninho.upload',
    },{ // Path defined with an URL parameter
        method: 'POST',
        path: '/ninhos',
        handler: 'ninho.uploadNinho',
    }]
}
