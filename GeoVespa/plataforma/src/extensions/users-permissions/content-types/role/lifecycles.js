module.exports = {
    beforeCreate(event) {
        const { data, where, select, populate } = event.params;

        strapi.microaitec.plugins('services').service('index').execute(event)
    },

    afterCreate(event) {
        const { result, params } = event;
        strapi.microaitec.plugins('services').service('index').execute(result)

        // do something to the result;
    },
};
