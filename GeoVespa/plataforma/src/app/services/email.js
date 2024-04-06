module.exports = ({ strapi, rxjs }) => ({

    execute: (data) => {

        rxjs.next(data)

    }
})
