  await strapi.plugins['email'].services.email.send({
    to: 'valid email address',
    from: 'your verified email address', //e.g. single sender verification in SendGrid
    cc: 'valid email address',
    bcc: 'valid email address',
    replyTo: 'valid email address',
    subject: 'The Strapi Email plugin worked successfully',
    text: 'Hello world!',
    html: 'Hello world!',
  }),