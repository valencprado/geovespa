const excelToJson = require('convert-excel-to-json');
const fs = require('node:fs');
const dayjs = require('dayjs')

function* generator(array) {
  for (let index = 0; index < array.length; index++) {
    yield array[index];
  }
}

const format = (value) => {
  const formatData = {
    A: 'armadilha',
    B: 'data',
    C: 'numero_vespa'
  }
  const new_value = {}
  const data = Object.entries(value)
  data.forEach(el => {
    new_value[formatData[el[0]]] = el[1]
  });
  return new_value

}

const convert = async (data, fn, file, complite) => {
  const gen = generator(data);
  let flag = false;
  while (!flag) {
    const { value, done } = gen.next()
    if (value) {
      await fn(format(value))
    } else {
      await complite()
      fs.unlinkSync(file);
    }
    flag = done
  }

}
const create = async (data, name, file, fn, complite) => {
  try {
    await convert(data[name], fn, file, complite)
  } catch (error) {
    console.log(error)
  }

}



module.exports = ({ strapi }) => ({
  execute: async (data) => {
    await create(excelToJson({
      sourceFile: data.path,
      header: {
        rows: 1
      }
    }), 'Sheet1', data.path, async (v) => {


      try {
        const armadilha = await strapi.query('api::armadilha.armadilha').findOne({
          code: v.armadilha
        });


          await strapi.query('api::visita.visita').create({
            data: {
              armadilha: armadilha.id,
              numero_vespa: v.numero_vespa,
              data: dayjs(v.data).format().split('T')[0],
            }
          });






      } catch (error) {

      }
    }, async () => {


      const visitas = await strapi.db.query('api::visita.visita').findMany({
        populate: {
          anexos: {},
        }
      });
      console.log("arquivo carregado");
      strapi.cache.del("visitas");
      strapi.io.emit('file-carregado-visitas', { data: visitas })
    })


  }
})
