


module.exports=({ strapi,services})=>({

    auth:[],
    path:'/produtos/:id',
    handler:async function (ctx){

        ctx.jwt = ctx.cookies.get('cim_ttm-goevesp_jwt')
        const produto = await strapi.db.query('api::produto.produto').findOne({
            where: {
                id:ctx.params.id
            },
            populate: {
                img: {},
                fotos: {},
                documentos: {}
            }
        });

        if(!produto) return ctx.redirect('/produtos')

        console.log(produto)
        await ctx.render('produto',{ page:{jwt:ctx.jwt, produto}});

    }

})