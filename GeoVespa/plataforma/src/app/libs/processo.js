const fs = require('fs');
const { execute } = require("./../../python/script.js");

const DEBUG_VINI = true

module.exports = ({ strapi,libs }) => ({
    execute:async () => {
        try {
            if (DEBUG_VINI) console.log("Started \"processo.js\"");
            const data = { itens:[] }
            
            if (DEBUG_VINI) console.log("Query visitas...");
            const visitas = await strapi.db.query('api::visita.visita').findMany({
                // where: { processado: false },
                populate: { armadilha: true }
            });
            // if (DEBUG_VINI) console.log(visitas);

            if (DEBUG_VINI) console.log("Generating data.itens...");
            await libs.generate(visitas, async(visita) => {
                data.itens.push( {
                    "id": visita.id,
                    "lat": visita.armadilha.latitude,
                    "long": visita.armadilha.longitude,
                    "nvespas": visita.numero_vespa,
                    "raio": 1.5
                  })
            }, {})
            if (DEBUG_VINI) console.log("Length: " + data.itens.length);
            // if (DEBUG_VINI) console.log(data.itens);
            
            if (!data.itens.length) return 0

            if (DEBUG_VINI) console.log("Writing dataVespa.json file...");
            await fs.writeFileSync('./src/python/dataVespa.json', JSON.stringify(data));
            
            if (DEBUG_VINI) console.log("Executing python file...");
            const pythonReturn = await execute() // Executing python file
            if (DEBUG_VINI) console.log("Python return: " + pythonReturn);

            if (pythonReturn == -1) {
                if (DEBUG_VINI) console.log("Erro: -1");
                throw Error('')
            }
            
            if (DEBUG_VINI) console.log("Reading dataVespa.json file...");
            const processos = await JSON.parse((fs.readFileSync('./src/python/dataVespa.json')).toString())
            // if (DEBUG_VINI) console.log(processos)
            
            if (DEBUG_VINI) console.log("Running through visitas and save on database...");
            await libs.generate(processos.itens, async(visita) => {
                // if (DEBUG_VINI) console.log(visita)

                await strapi.db.query('api::visita.visita').update({ // Escreve no banco de dados
                    where:{
                        id: visita.id
                    },
                    data:{
                        processado: true,
                        raio2: 1500,
                        raio1:(visita.raio*1000).toFixed(0),
                    }
            });
            }, {})

        } catch (error) {
            const sms = {
                from: `"Geovespa" <${process.env.SMTP_FROM}>`, // sender address
                //to: process.env.SMTP_TO,
                to: "edmilsonsoares120@gmail.com",
                subject: "Erro no processo do Python", // Subject line
                text: `
                Erro no processo do Python
                `, // plain text body
            }
            await strapi.microaitec.plugins('libs').lib('email').execute(sms)
        }

       // fs.writeFileSync('./src/python/dataVespa.json', JSON.stringify(data));
       // await strapi.microaitec.plugins('libs').lib('email').test()
    }
})