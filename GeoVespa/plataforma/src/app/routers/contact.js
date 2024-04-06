


module.exports=({ strapi,services})=>({

    auth:[],
    path:'/contact',
    handler:async function (ctx){

        ctx.jwt = ctx.cookies.get('cim_ttm-goevesp_jwt')

        await ctx.render('contact', {
            page:{
                jwt:ctx.jwt
        }  });

    }

})