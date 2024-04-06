


module.exports=({ strapi,services})=>({

    auth:[],
    path:'/',
    handler:async function (ctx){

        ctx.jwt = ctx.cookies.get('cim_ttm-goevesp_jwt')


        await ctx.render('index', {
            page:{
                jwt:ctx.jwt
        }  });

    }

})