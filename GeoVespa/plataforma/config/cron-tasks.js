module.exports = {
  processo: {
    task:async ({ strapi }) => {
      console.log(" --------------- CronTask Python --------------- ");
      await strapi.microaitec.plugins('libs').lib('processo').execute()
      console.log(" ----------------------------------------------- ");
    },
    options: {
      //rule: "0 23 * * *" // <- Executar 23h
      rule: "*/5 * * * *", // <- Executar a cada 5 minutos
      // rule: "* * * * *", // <- Executar a cada minuto
    },
  },
};