


module.exports=({ strapi,services})=>({

    auth:[],
    path:'/geovespa',
    handler:async function (ctx){

        ctx.jwt = ctx.cookies.get('cim_ttm-goevesp_jwt')



        const investigadores = await strapi.db.query('api::membro.membro').findMany({
            orderBy: { nome: 'asc' },
            where: {
                ocupacao: 'investigador'
            },
            populate: {
                foto: {}
            }
        });
        const bolseiros = await strapi.db.query('api::membro.membro').findMany({
            where: {
                ocupacao: 'bolseiro'
            },
            orderBy: { nome: 'asc' },

            populate: {
                foto: {}
            }
        });


        await ctx.render('geovespa',{ page:{jwt:ctx.jwt, investigadores, bolseiros }});

    }

})