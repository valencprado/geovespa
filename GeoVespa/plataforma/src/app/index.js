const fs = require('fs')
const path = require('node:path')
const dayjs = require('dayjs')
const { z } = require('zod')
const rxjs = require('rxjs')
const { Subject } = require('rxjs')
const crypto = require('node:crypto')
const render = require('koa-ejs');
const koaRouter = require("koa-router");
const router = new koaRouter();
const bodyParser = require('koa-bodyparser');
const NodeCache = require( "node-cache" );


//router.use(admin.routes()).use(admin.allowedMethods());
const service_app = {
    paths: [],
    __events: {}
}

const events_app = {
    paths: [],
}

const routers_app = {
    paths: [],
    routers:[]
}


const libs_app = {
    paths: [],
    dayjs,
    z,
    generator: function* generator(array) {
        for (let index = 0; index < array.length; index++) {
            yield array[index];

        }
    },
    generator_fn: function* generator(data) {
        if (Array.isArray(data)) {
            for (let index = 0; index < data.length; index++) {
                yield { data: data[index], index };

            }
        } else {
            data = Object.entries(data)

            for (let index = 0; index < data.length; index++) {
                yield { data: data[index][1], name: data[index][0] };

            }
        }

    },
    crypto,
}



libs_app.generate = async(data, fn, ops, fun_error) => {
    let flag = false;
    const fn_g = libs_app.generator_fn(data)
    while (!flag) {
        const { value, done } = fn_g.next()
        if (value) {

            try {
                await fn(value.data, {...ops, index: value.index, name: value.name })
            } catch (error) {
                console.log(error)
                try {
                    await fun_error(error)
                } catch (error) {


                }

            }

        }
        flag = done
    }
}

libs_app.generateArray = async(data, fn, ops) => {
    let flag = false;
    const fn_g = libs_app.generator_fn(data)
    const array = []
    while (!flag) {
        const { value, done } = fn_g.next()
        if (value) {
            const output = await fn(value, ops)
            array.push(output)
        }
        flag = done
    }

    return array
}



try {
    service_app.paths = fs.readdirSync('./src/app/services')
} catch (error) {
    service_app.paths = []
}


try {
    libs_app.paths = fs.readdirSync('./src/app/libs')
} catch (error) {
    libs_app.paths = []
}

try {
    events_app.paths = fs.readdirSync('./src/app/events')
} catch (error) {
    events_app.paths = []
}


try {
    routers_app.paths = fs.readdirSync('./src/app/routers')
} catch (error) {
    routers_app.paths = []
}


module.exports = async({ strapi }) => {

    await libs_app.generate(libs_app.paths, async(file) => {

        if (file.includes('.js')) {
            let file_lib = `./libs/${file}`
            libs_app[file.split('.js')[0]] = require(file_lib)({strapi,libs:libs_app})
        }

    }, {})

    await libs_app.generate(service_app.paths, async(file) => {

        if (file.includes('.js')) {
            let file_service = `./services/${file}`

            service_app.__events[file.split('.js')[0]] = new Subject()
            service_app[file.split('.js')[0]] = require(file_service)({ strapi, rxjs: service_app.__events[file.split('.js')[0]] })
        }

    }, {})





    await libs_app.generate(events_app.paths, async(file) => {

        if (file.includes('.js')) {
            let file_event = `./events/${file}`

            events_app[file.split('.js')[0]] = require(file_event)({ strapi, rxjs: service_app.__events[file.split('.js')[0]] })
            if (events_app[file.split('.js')[0]].type == 'service:app' && events_app[file.split('.js')[0]].name == file.split('.js')[0]) {
                service_app.__events[file.split('.js')[0]].subscribe(events_app[file.split('.js')[0]].handler)
            }

        }

    }, {})

    const plugins = {
        services: {
            service: (name) => {
                return service_app[name]
            }
        },
        domains: {
            domain: (name) => {
                //  return domain_app[name]
            }
        },
        repositories: {
            repository: (name) => {
                // return repository_app[name]
            }
        },
        libs: {
            lib: (name) => {
                return libs_app[name]
            }
        }
    }

    router.use(bodyParser());

    await libs_app.generate(routers_app.paths, async(file) => {

        if (file.includes('.js')) {
            let file_router = `./routers/${file}`

            const router_= require(file_router)({ strapi, 
                 services: {
                        service: (name) => {
                            return service_app[name]
                        }
            }, })


            router.get(router_.path,async(ctx,next)=>{

                ctx.jwt = ctx.cookies.get('cim_ttm-goevesp_jwt')

                

                let ctx1 = {
                    request: {
                        header: {
                            authorization: ctx.cookies.get('cim_ttm-goevesp_jwt')
                        }
                    }
                }

                try {
                    ctx.user = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx1);
                } catch (error) {
                    ctx.user={}
                }
              
                 

                if(router_.auth.length==0) return await next()

                


                if(!ctx.user) return  ctx.redirect('/')


                ctx.user = await strapi.query('plugin::users-permissions.user').findOne({
                where: {
                    id: ctx.user.id
                },populate:{
                    role:{},
                    membro:{
                        populate:{
                            congregacao:{},
                            funcao:{},
                            foto:{}
                        }
                    }
                }
            });


            if(!ctx.user) return  ctx.redirect('/')


    
            const role=router_.auth.find(role=>role==ctx.user.role.name)

            if(role)  return next()

            ctx.redirect('/')

            
            },router_.handler );

         


        }

    }, {})



    render(strapi.server.app, {
        root: path.join(__dirname, 'views'),
        viewExt: 'ejs',
        "layout": false,
        cache: false,
        debug: false
    });




    router.get('/auth/login', (async function(ctx) {

        await ctx.render('auth/login');
    }));


    router.get('/auth/forgot', (async function(ctx) {

        await ctx.render('auth/forgot');
    }));


    async function Auth(ctx, next) {
        const jwt = ctx.cookies.get('cim_ttm-goevesp_jwt')

        try {
            let ctx1 = {
                request: {
                    header: {
                        authorization: jwt
                    }
                }
            }
            ctx.jwt = ctx.cookies.get('cim_ttm-goevesp_jwt')
            ctx.user = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx1);
            await next()
        } catch (error) {
            console.log(error)
            ctx.redirect('/auth/login')
        }


    }

    router.get('/dashboard', Auth, (async function(ctx) {
     //   console.log(ctx.user)

        const user = await strapi.query('plugin::users-permissions.user').findOne({
            where: {
                id: ctx.user.id
            },
        });


        delete user.password

        let ninhos;
        let armadilhas;

        const a = strapi.cache.get("armadilhas");
        const n = strapi.cache.get("ninhos");


  
        if (a && n) {
            ninhos = n;
            armadilhas = a;
        } else {
            ninhos = await strapi.db.query('api::ninho.ninho').findMany({
                populate:{
                    anexos:{}
                }
            });
            armadilhas = await strapi.db.query('api::armadilha.armadilha').findMany({
                populate:{
                    anexos:{},
                    visitas:{
                        populate:{
                            anexos:{}
                        }
                    }
                }
            });
           strapi.cache.set("armadilhas",armadilhas);
           strapi.cache.set("ninhos",ninhos);
    
        }

        await ctx.render('dashboard/index', { jwt: ctx.jwt, armadilhas, ninhos, user });



    }));

    router.get('/dashboard/monitorizacao', Auth, (async function(ctx) {
        //   console.log(ctx.user)
   
           const user = await strapi.query('plugin::users-permissions.user').findOne({
               where: {
                   id: ctx.user.id
               },
           });
   
   
           delete user.password
   
           let ninhos;
           let armadilhas;
   
           const a = strapi.cache.get("armadilhas");
           const n = strapi.cache.get("ninhos");

     
           if (a && n) {
               ninhos = n;
               armadilhas = a;
           } else {
               ninhos = await strapi.db.query('api::ninho.ninho').findMany({
                populate:{
                    anexos:{},
                }
               });
               armadilhas = await strapi.db.query('api::armadilha.armadilha').findMany({
                   populate:{
                       anexos:{},
                       visitas:{
                        populate:{
                            anexos:{}
                        }
                       }
                   }
               });
              strapi.cache.set("armadilhas",armadilhas);
              strapi.cache.set("ninhos",ninhos);
       
           }
   
           await ctx.render('dashboard/monitorizacao', { jwt: ctx.jwt, armadilhas, ninhos, user });
   
   
   
       }));

       router.get('/dashboard/qrcode', Auth, (async function(ctx) {
        //   console.log(ctx.user)

        const user = await strapi.query('plugin::users-permissions.user').findOne({
            where: {
                id: ctx.user.id
            },
        });
   
           await ctx.render('dashboard/qrcode', { jwt: ctx.jwt,user });
   
   
   
       }));

    router.get('/dashboard/perfil', Auth, (async function(ctx) {
        const user = await strapi.query('plugin::users-permissions.user').findOne({
            where: {
                id: ctx.user.id
            },
        });


        delete user.password
        await ctx.render('dashboard/perfil', { jwt: ctx.jwt, user });


    }));


    router.get('/cookie', (async function(ctx) {
        const ninhos = await strapi.db.query('api::ninho.ninho').findMany({});
        const armadilhas = await strapi.db.query('api::armadilha.armadilha').findMany({});

        ctx.cookies.set('geovespa_index', JSON.stringify({
            n: ninhos,
            a: armadilhas
        }), {
            httpOnly: true,
            exp: 60 * 360000 + Date.now()
        })

        ctx.body = {}

    }));

    router.get('/auth/logout', (async function(ctx) {

        ctx.cookies.set('geovespa', '')
        ctx.redirect('/auth/login')

    }));

    router.get('/auth/send', async function(ctx) {

        console.log('dd')
        await ctx.render('auth/send')

    });


    router.post('/contact/send', (async function(ctx) {

        console.log(ctx.request.body)
        strapi.microaitec.plugins('services').service('email').execute(ctx.request.body.data)

        ctx.body = {}
    }));


    router.get('/auth/newpassword', (async function(ctx) {
        const { jwt } = ctx.query
        if (jwt) {
            const user = await strapi
                .query('plugin::users-permissions.user')
                .findOne({ where: { resetPasswordToken: jwt } });

            console.log(user)

            if (user) {
                await ctx.render('auth/newpassword', { user, code: jwt });
            } else {
                ctx.redirect('/auth/login')
            }
        } else {
            ctx.redirect('/auth/login')
        }

    }));

    strapi.cache = new NodeCache();

    strapi.io = require("socket.io")(strapi.server.httpServer);

    strapi.server.app.use(router.routes()).use(router.allowedMethods());

    strapi.io.use(async(socket, next) => {
        //.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
        next()
    })


    strapi.io.on('connection', (socket) => {
        console.log("----- Client connected ------")
        socket.on('disconnect', () => {
            console.log("---- Client disconnected ----")
        });
    });

    /* strapi.server.app.use(async function(ctx, next) {
        if (ctx.request.url.includes('/api'))
            ctx.body = {

            }

        // await ctx.render('404');
    })

  */

    return {
        plugins: (name) => {
            return plugins[name]
        },
        commands: [],
        eventos: [],
        routers: []

    }
}
