const excelToJson= require('convert-excel-to-json');
const fs =require('node:fs');
const dayjs =require('dayjs')

function* generator(array) {
    for (let index = 0; index < array.length; index++) {
       yield array[index];
    }
 }

 const format=(value)=>{
    const formatData={
        A: 'distrito',
        B: 'concelho',
        C: 'dia',
        D: 'mes',
        E: 'ano',
        F: 'longitude',
        G: 'latitude'
      }
    const new_value={}
    const data =Object.entries(value)
    data.forEach(el => {
        new_value[formatData[el[0]]]=el[1]    
    });

    try {
        const longitude=new_value.longitude.includes('°')&&new_value.longitude.includes('′')&&new_value.longitude.includes(',')
        if(longitude){
            new_value.longitude=convertCoord(new_value.longitude)
        }
    } catch (error) {
        
    }

    try {
        const latitude=new_value.latitude.includes('°')&&new_value.latitude.includes('′')&&new_value.latitude.includes(',')
        if(latitude){
            new_value.latitude=convertCoord(new_value.latitude)
        }
    } catch (error) {
        
    }

    const d=dayjs(`${new_value.ano}-${new_value.mes<10?'0'+new_value.mes:new_value.mes}-${new_value.dia<10?'0'+new_value.dia:new_value.dia}`).format().split('T')[0]

    console.log(d,`${new_value.dia}-${new_value.mes<10?'0'+new_value.mes:new_value.mes}-${new_value.ano}`)
    new_value.data= d
    return new_value
    
 }

 const convert=async(data,fn,file,complite)=>{
    const gen = generator(data);
    let flag=false;
    while(!flag){
        const {value,done}=gen.next()
        if(value){
           await fn(format(value))
        }else{
            await complite()
            fs.unlinkSync(file);
        }
        flag=done
    }

 }
 const create=  async(data,name,file,fn,complite)=>{
    try {
         convert(data[name],fn,file,complite)
       
    } catch (error) {
        console.log(error)
    }

}



module.exports = ({ strapi, rxjs }) => ({

    execute: async(data) => {
       await create(excelToJson({
            sourceFile: data.path,
             header:{
                 rows: 1 
             }
         }),'Sheet1',data.path,async(v)=>{
            try {
      
                await strapi.query('api::ninho.ninho').create({
                    data:v
                })


            } catch (error) {

    
                
            }
;
    },async ()=>{
        const ninhos = await strapi.db.query('api::ninho.ninho').findMany({
            populate:{
                anexos:{},
            }
        });

     strapi.cache.del("ninhos");

        strapi.io.emit('file-carregado-ninhos', { data: ninhos })
    })



}
})
