'use strict';

/**
 * ninho controller
 */

const _ = require('lodash');
const utils = require('@strapi/utils');
const { getService } = require('./../upload/utils');
const validateSettings = require('./../upload/validation/settings');
const validateUploadBody = require('./../upload/validation/upload');
const { createCoreController } = require('@strapi/strapi').factories;
const { sanitize } = utils;
const { ValidationError } = utils.errors;

const sanitizeOutput = (data, ctx) => {
    const schema = strapi.getModel('plugin::upload.file');
    const { auth } = ctx.state;

    return sanitize.contentAPI.output(data, schema, { auth });
};


module.exports = createCoreController('api::ninho.ninho', ({ strapi }) => ({
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
            type:'ninhos',
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
    async uploadFilesNinho(ctx) {


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

       const ninho= await strapi.query('api::ninho.ninho').create({
            data:{
            ...data,
            anexos:file.map(f=>{
                return f.id
            })
            }
        })




        strapi.cache.del("ninhos");
        ninho.anexos =file


        ctx.body = ninho
    },

    async uploadNinho(ctx) {

        const {
            query: { id },
            request: { files: { files } = {} },
        } = ctx;

        if (id && (_.isEmpty(files) || files.size === 0)) {
            return this.updateFileInfo(ctx);
        }

        if (_.isEmpty(files) || files.size === 0) {
           // throw new ValidationError('Files are empty');


           let {data}=ctx.request.body
           data=JSON.parse(data)

           const ninho= await strapi.query('api::ninho.ninho').create({
                data:{
                ...data
                }
            })
    
    
            const ninhos = await strapi.db.query('api::ninho.ninho').findMany({
                populate:{
                    anexos:{},
                }
            });
    
           strapi.cache.del("ninhos");
          return  ctx.body = ninho

        }

  
            //ctx.body = { file: [] }

        await this.uploadFilesNinho(ctx);


    }
}))
