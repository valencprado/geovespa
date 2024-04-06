const crypto = require('crypto');

module.exports = ({ strapi }) => ({
    name: 'email',
    type: 'service:app',
    ops: {
        path: '/auth'
    },
    actived: true,
    handler: async(data) => {
        // io().of('/auth').emit('ok', 'dffffff')
        const sms = {
            from: `"Geovespa" <${process.env.SMTP_FROM}>`, // sender address
            to: process.env.SMTP_TO,
            cc: process.env.SMTP_CC.split(','),
            replyTo: data.email,
            subject: data.subject, // Subject line
            text: data.message, // plain text body


        }



        await strapi.microaitec.plugins('libs').lib('email').execute(sms)

    }
})