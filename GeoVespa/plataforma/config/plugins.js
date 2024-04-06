module.exports = {
    email: {
        config: {
          provider: 'nodemailer',
          providerOptions: {
            host:process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
              user: process.env.SMTP_USERNAME,
              pass: process.env.SMTP_PASSWORD,
            },
            // ... any custom nodemailer options
          },
          settings: {
            defaultFrom:process.env.SMTP_FROM,
            defaultReplyTo: process.env.SMTP_TO,
          },
        },
      },
}
