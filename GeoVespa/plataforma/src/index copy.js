'use strict';
const path = require('path')
const Microaitec = require('./app')
let xlsx = require("json-as-xlsx")
module.exports = {

    async register({ strapi }) {

        strapi.microaitec = await Microaitec({ strapi })
    },

    async bootstrap({ strapi }) {

/*
        const armadilhas = await strapi.entityService.findMany('api::armadilha.armadilha', {
          });
          //distrito	concelho	Dia	Mês	Ano	Long	Lat
          let data = [
            {
              sheet: "Sheet1",
              columns: [
                { label: "distrito", value: "distrito" },
                { label: "concelho", value: "concelho" },
                { label: "Dia", value: "dia" },
                { label: "Mês", value: "mes" },
                { label: "Ano", value: "ano" },
                { label: "long", value: "long" },
                { label: "lat", value: "lat" }
              ],
              content: [],
            }]
          armadilhas.forEach(({latitude,longitude,data:data_,distrito,concelho}) => {
         const [ano,mes,dia]=   data_.split('-')
            data[0].content.push({
                lat:latitude,
                ano,
                mes,
                dia,
                long:longitude,
                distrito,
                concelho
            })
    
          });


          let settings = {
            fileName: "armadilhas", // Name of the resulting spreadsheet
            extraLength: 3, 
            writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
            writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
          }
          
          xlsx(data, settings) // Will download the excel file
         
*/


///distrito	concelho	Dia	Mês	Ano	Long	Lat



const ninhos = await strapi.entityService.findMany('api::ninho.ninho', {
});

let data = [
    {
      sheet: "Sheet1",
      columns: [
        { label: "distrito", value: "distrito" },
        { label: "concelho", value: "concelho" },
        { label: "Dia", value: "dia" },
        { label: "Mês", value: "mes" },
        { label: "Ano", value: "ano" },
        { label: "long", value: "long" },
        { label: "lat", value: "lat" },
        { label: "VespaId", value: "vespa_id" }
      ],
      content: [],
    }]


ninhos.forEach(({distrito,latitude,longitude,vespa_id,concelho,data:data_}) => {
    const [ano,mes,dia]=   data_.split('-')

    data[0].content.push({
        lat:latitude,
        ano,
        mes,
        dia,
        long:longitude,
        distrito,
        vespa_id,
        concelho
    })


});
    
let settings = {
    fileName: "ninhos", // Name of the resulting spreadsheet
    extraLength: 3, 
    writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
  }
  
  xlsx(data, settings) // Will download the excel fi

    },
};
