module.exports = ({ strapi }) => ({
    name: 'index',
    type: 'service:app',
    ops: {
        path: '/auth'
    },
    actived: true,
    handler: async(data) => {
        // io().of('/auth').emit('ok', 'dffffff')
        console.log(data)

    }
})
