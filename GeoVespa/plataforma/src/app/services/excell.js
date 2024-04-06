const excelToJson = require('convert-excel-to-json');

function* generator(array) {
    for (let index = 0; index < array.length; index++) {
        yield array[index];

    }
}

const gen = async(data, fn, end) => {
    const gen_ = generator(data)
    let flag = false
    while (!flag) {
        const { value, done } = gen_.next()
        if (value) {
            await fn(value)
        }
        flag = done
    }

    await end()
}

module.exports = ({ strapi, rxjs }) => ({

    execute: async(file, type) => {


        //https://www.npmjs.com/package/convert-excel-to-json
        const result = excelToJson({
            sourceFile: file.url,
            header: {
                rows: 2
            },
            sheets: '*'
        });

        const format = (name) => {

            const Format = {
                A: 'municipio',
                B: 'dia',
                C: 'mes',
                D: 'ano',
                E: 'lng',
                F: 'lat',
                I: 'existe',
                J: 'distancia',
            }


            return Format[name]

        }
        const convert = (name) => {
            const ob = {
                Armadilha: 'api::armadilha.armadilha',
                Ninho: 'api::ninho.ninho'
            }

            return ob[name]
        }


        const formatData = (data) => ({
            descricao: `${data.dia}/${data.mes}/${data.ano}`,
            local: data.municipio,
            latitude: data.lat,
            longitude: data.lng,
            existe: data.existe,
            publishedAt: new Date(),
            previsao: true,
            distancia: typeof data.distancia === 'string' ? 0 : (data.distancia * 1.609344 * 1000),
            probabilidade: data.p || 0.9
        })

        const db = []


        await gen(result['Sheet1'], async(dado) => {
            const nest = {}
            Object.entries(dado).forEach(prop => {
                nest[format(prop[0])] = prop[1]
            });
            const e = await strapi.db.query(convert(type)).create({
                data: formatData(nest),
            });

            db.push(e)
        }, () => {
            console.log(db)
            strapi.io.emit('file-carregodo', { data: db, type })
        })








        rxjs.next(file)


    }
})
