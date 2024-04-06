


module.exports=({ strapi,services})=>({

    auth:[],
    path:'/auth',
    handler:async function (ctx){
        const { jwt } = ctx.query
        if (jwt) {

            const { jwt } = ctx.query
            if (jwt) {
    
                ctx.cookies.set('cim_ttm-goevesp_jwt', 'Bearer ' + jwt)
    
                ctx.redirect('/dashboard')
            } else {
                ctx.redirect('/auth/login')
            }

        } else {
            ctx.redirect('/')
        }




        


    }

})