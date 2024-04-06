


module.exports=({ strapi,services})=>({

    auth:[],
    path:'/publicacoes',
    handler:async function (ctx){

        ctx.jwt = ctx.cookies.get('cim_ttm-goevesp_jwt')

        const publicacoes = await strapi.db.query('api::publicacao.publicacao').findMany({
            populate: {
                documentos: {}
            }
        })



        

        await ctx.render('publicacoes',{ page:{jwt:ctx.jwt, publicacoes }});

    }

})