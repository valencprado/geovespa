


module.exports=({ strapi,services})=>({

    auth:[],
    path:'/produtos',
    handler:async function (ctx){

        ctx.jwt = ctx.cookies.get('cim_ttm-goevesp_jwt')

        const produtos = await strapi.db.query('api::produto.produto').findMany({
            populate: {
                img: {},
                
            }
        });

        await ctx.render('produtos',{ page:{jwt:ctx.jwt, produtos }});

    }

})