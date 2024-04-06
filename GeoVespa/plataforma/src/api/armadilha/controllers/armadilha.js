'use strict';

/**
 * armadilha controller
 */


const _ = require('lodash');
const utils = require('@strapi/utils');
const { getService } = require('./../upload/utils');
const validateSettings = require('./../upload/validation/settings');
const validateUploadBody = require('./../upload/validation/upload');
const { createCoreController } = require('@strapi/strapi').factories;
const { sanitize } = utils;
var QRCode = require('qrcode')
const { ValidationError } = utils.errors;

const sanitizeOutput = (data, ctx) => {
    const schema = strapi.getModel('plugin::upload.file');
    const { auth } = ctx.state;

    return sanitize.contentAPI.output(data, schema, { auth });
};
module.exports = createCoreController('api::armadilha.armadilha', ({ strapi }) => ({
    // Method 1: Creating an entirely custom action

    async uploadFiles(ctx) {


        const {
            request: { body, files: { files } = {} },
        } = ctx;

        const uploadedFiles = await getService('upload').upload({
            data: await validateUploadBody(body),
            files,
        });
        let file = await sanitizeOutput(uploadedFiles, ctx);

        

        await  strapi.microaitec.plugins('services').service('upload').execute({
            file: file[0],
            type:'visitas',
            body,
            remove:async()=>{
              await  getService('upload').remove({
                    id:file[0].id
                })
            } 
        })

        ctx.body = { file }
    },
    async upload(ctx) {

        const {
            query: { id },
            request: { files: { files } = {} },
        } = ctx;

        if (id && (_.isEmpty(files) || files.size === 0)) {
            return this.updateFileInfo(ctx);
        }

        if (_.isEmpty(files) || files.size === 0) {
            throw new ValidationError('Files are empty');
        }

        console.log(ctx.request.body)
            //ctx.body = { file: [] }

        await this.uploadFiles(ctx);


    },

    async uploadFilesArmadilha(ctx) {


        const {
            request: { body, files: { files } = {} },
        } = ctx;

        const uploadedFiles = await getService('upload').upload({
            data: await validateUploadBody(body),
            files,
        });
        let file = await sanitizeOutput(uploadedFiles, ctx);

        

        await  strapi.microaitec.plugins('services').service('upload').execute({
            file: file[0],
            type:'armadilhas',
            body,
            remove:async()=>{
              await  getService('upload').remove({
                    id:file[0].id
                })
            } 
        })

        ctx.body = { file }
    },

    async upload_armadilha(ctx) {

        const {
            query: { id },
            request: { files: { files } = {} },
        } = ctx;

        if (id && (_.isEmpty(files) || files.size === 0)) {
            return this.updateFileInfo(ctx);
        }

        if (_.isEmpty(files) || files.size === 0) {
            throw new ValidationError('Files are empty');
        }

        console.log(ctx.request.body)
            //ctx.body = { file: [] }

        await this.uploadFilesArmadilha(ctx);


    },


    async user(ctx) {

        console.log(ctx.state.user, ctx.request.body.username)


        const user = await strapi.query('plugin::users-permissions.user').update({
            where: {
                id: ctx.state.user.id
            },
            data: {
                email: ctx.request.body.email,
                username: ctx.request.body.username
            }
        });

        ctx.body = {}
    },
    async delete(ctx) {

        const user = await strapi.query('plugin::users-permissions.user').delete({
            where: {
                id: ctx.state.user.id
            }
        });

        ctx.body = {}
    },

    async create(ctx) {



   
    },

    async uploadFileArmadilha(ctx) {


        const {
            request: { body, files: { files } = {} },
        } = ctx;

        const uploadedFiles = await getService('upload').upload({
            data: await validateUploadBody(body),
            files,
        });
        let file = await sanitizeOutput(uploadedFiles, ctx);

        let {data}=ctx.request.body

        data=JSON.parse(data)

        const qrcode= await QRCode.toDataURL(JSON.stringify({
            code:data.numero||data.code
        }))

        const armadilha= await strapi.query('api::armadilha.armadilha').create({
            data: {
                latitude:data.latitude,
                longitude:data.longitude,
                data:data.data,
                distrito:data.distrito,
                qrcode,
                anexos:file.map(f=>{
                    return f.id
                }),
                //municipio:user.municipio.id,
                concelho:data.concelho,
                code:data.numero||data.code
            }
        });


        armadilha.anexos=file
        armadilha.visitas=[]

        strapi.cache.del("armadilhas");

        ctx.body = armadilha
    },
    async uploadArmadilha(ctx) {

        const {
            query: { id },
            request: { files: { files } = {} },
        } = ctx;

        if (id && (_.isEmpty(files) || files.size === 0)) {
            return this.updateFileInfo(ctx);
        }

        if (_.isEmpty(files) || files.size === 0) {
        
     let {data}=ctx.request.body
     data=JSON.parse(data)

        const qrcode= await QRCode.toDataURL(JSON.stringify({
            code:data.numero||data.code
        }))

     const armadilha= await strapi.query('api::armadilha.armadilha').create({
            data: {
                latitude:data.latitude,
                data:data.data,
                longitude:data.longitude,
                distrito:data.distrito,
                qrcode,
                //municipio:user.municipio.id,
                concelho:data.concelho,
                code:data.numero||data.code
            }
        });
        armadilha.anexos=[]
        armadilha.visitas=[]


        strapi.cache.del("armadilhas");
       
       return ctx.body=armadilha
    }

      
            //ctx.body = { file: [] }

        await this.uploadFileArmadilha(ctx);


    },
    async uploadFilesAnexos(ctx) {


        const {
            request: { body, files: { files } = {} },
        } = ctx;

        const uploadedFiles = await getService('upload').upload({
            data: await validateUploadBody(body),
            files,
        });
        let file = await sanitizeOutput(uploadedFiles, ctx);
        let {data}=ctx.request.body
        data=JSON.parse(data)

        console.log(data)

      const file_=await strapi.db.query('api::armadilha.armadilha').findOne({
            where:{
                id:data.id
            },
            populate:{
                anexos:{}
            }
        })


        console.log(file_)



        if(file_.anexos){
            file_.anexos.forEach(el => {
                console.log(el)
                file.push(el)
            });
        }


        await strapi.query('api::armadilha.armadilha').update({
            where:{
                id:data.id
            },
            data: {
                anexos:file.map(f=>{
                    return f.id
                })
            }
        });

      strapi.cache.del("armadilhas");

        ctx.body =  await strapi.db.query('api::armadilha.armadilha').findOne({
            where:{
                id:data.id
            },
            populate:{
                anexos:{},
                visitas:{
                    populate:{
                        anexos:{}
                    }
                }
            }
        });
        
    },
    async uploadAnexos(ctx) {

        const {
            query: { id },
            request: { files: { files } = {} },
        } = ctx;

        if (id && (_.isEmpty(files) || files.size === 0)) {
            return this.updateFileInfo(ctx);
        }

        if (_.isEmpty(files) || files.size === 0) {
            throw new ValidationError('Files are empty');
        }

        await this.uploadFilesAnexos(ctx);


    },
    async uploadFilesVisita(ctx) {


        const {
            request: { body, files: { files } = {} },
        } = ctx;

        const uploadedFiles = await getService('upload').upload({
            data: await validateUploadBody(body),
            files,
        });
        let file = await sanitizeOutput(uploadedFiles, ctx);
        let {data}=ctx.request.body
        data=JSON.parse(data[0])


        const output= await strapi.query('api::visita.visita').create({
            data: {
                anexos:file.map(f=>{
                    return f.id
                }),
                armadilha:data.armadilha,
                numero_vespa:data.numero_vespa,
                data:data.data,
            }
        });

         strapi.cache.del("armadilhas");

        ctx.body=output
        
    
    },
    async uploadVisita(ctx) {

        const {
            query: { id },
            request: { files: { files } = {} },
        } = ctx;

        if (id && (_.isEmpty(files) || files.size === 0)) {
            return this.updateFileInfo(ctx);
        }

        if (_.isEmpty(files) || files.size === 0) {
            let {data}=ctx.request.body
           data=JSON.parse(data[1])
    
            console.log(data)
          const output= await strapi.query('api::visita.visita').create({
                data: {
                    armadilha:data.armadilha,
                    numero_vespa:data.numero_vespa,
                    data:data.data,
                }
            });
    

            strapi.cache.del("armadilhas");

           return ctx.body=output
          
        }

        console.log(ctx.request.body)
            //ctx.body = { file: [] }

        await this.uploadFilesVisita(ctx);


    },
    async qrcode(ctx) {


        console.log(ctx.params)

        ctx.body= await strapi.db.query('api::armadilha.armadilha').findOne({
            where:{
              id:ctx.params.id
            },
            populate:{
                anexos:{},
                visitas:{
                    populate:{
                        anexos:{}
                    }
                }
            }

        })

   
    },
}))
