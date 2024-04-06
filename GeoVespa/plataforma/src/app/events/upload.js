const fs = require('fs');
const { parse } = require('fast-csv');
const path = require('path')



module.exports = ({ strapi }) => ({
    name: 'upload',
    type: 'service:app',
    ops: {
        path: '/auth'
    },
    actived: true,
    handler: async(data) => {

            console.log(data)

     
                await   strapi.microaitec.plugins('services').service(data.type).execute({
                    path:path.join('public',data.file.url)
                })


             await data.remove()

          /*  fs.exists(path.join('public',data.file.url), (exists) => {
                console.log(exists ? 'Found' : 'Not Found!');
                if(exists)
                   fs.unlinkSync(path.join('public',data.file.url));
              });
*/

    }

})
