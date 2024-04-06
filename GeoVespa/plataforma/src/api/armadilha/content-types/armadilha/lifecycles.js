module.exports = {
    beforeCreate(event) {
        const { data, where, select, populate } = event.params;

        //strapi.microaitec.plugins('services').service('index').execute(event)
    },

  async  afterCreate(event) {

       strapi.cache.del("armadilhas");
    },

   async afterDelete(event) {
    
    
          strapi.cache.del("armadilhas");
    },
};
