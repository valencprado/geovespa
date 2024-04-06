const excelToJson = require('convert-excel-to-json');
const fs = require('node:fs');
const dayjs = require('dayjs')
var QRCode = require('qrcode')

function* generator(array) {
  for (let index = 0; index < array.length; index++) {
    yield array[index];
  }
}

const convertCoord = (coord) => {
  let [grau, min_seg] = coord.split('°')
  let [min, seg] = min_seg.split('′')
  seg = seg.replace(',', '.')
  if (grau > 0) return parseFloat(grau) + (parseFloat(min) / 60) + (parseFloat(seg) / 3600)

  return -(parseFloat(grau * -1) + (parseFloat(min) / 60) + (parseFloat(seg) / 3600))
}


const format = (value) => {
  const formatData = {
    A: 'distrito',
    B: 'concelho',
    C: 'dia',
    D: 'mes',
    E: 'ano',
    F: 'longitude',
    G: 'latitude',
    H: 'acao'
  }
  const new_value = {}
  const data = Object.entries(value)
  data.forEach(el => {
    new_value[formatData[el[0]]] = el[1]
  });

  try {
    const longitude = new_value.longitude.includes('°') && new_value.longitude.includes('′') && new_value.longitude.includes(',')
    if (longitude) {
      new_value.longitude = convertCoord(new_value.longitude)
    }
  } catch (error) {

  }

  try {
    const latitude = new_value.latitude.includes('°') && new_value.latitude.includes('′') && new_value.latitude.includes(',')
    if (latitude) {
      new_value.latitude = convertCoord(new_value.latitude)
    }
  } catch (error) {

  }



  let d = dayjs(`${new_value.ano}-${new_value.mes < 10 ? '0' + new_value.mes : new_value.mes}-${new_value.dia < 10 ? '0' + new_value.dia : new_value.dia}`).format().split('T')[0]
  if (!new_value.ano) {
    d = dayjs().format().split('T')[0]
  }
  new_value.data = d
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

        const qrcode = await QRCode.toDataURL(JSON.stringify({
          code: data.code
        }))
        await strapi.query('api::armadilha.armadilha').create({
          data: {
            latitude: v.latitude,
            longitude: v.longitude,
            distrito: v.distrito,
            qrcode,
            acao: v.acao,
            data: v.data,
            //municipio:user.municipio.id,
            concelho: v.concelho,
            code: v.code
          }
        })

      } catch (error) {
        console.log(error);
      }
      ;
    }, async () => {

      const armadilhas = await strapi.db.query('api::armadilha.armadilha').findMany({
        populate: {
          anexos: {},
          visitas: {
            populate: {
              anexos: {}
            }
          }
        }
      });

      strapi.cache.del("armadilhas");

      strapi.io.emit('file-carregado-visitas', { data: armadilhas })
    })



  }
})
