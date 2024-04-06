'use strict';
const nodemailer = require("nodemailer");


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // use SSL
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});




module.exports = ({ strapi }) => ({

    execute: async(options) => {


        try {
            return transporter.sendMail(options);
        } catch (error) {
            console.log(error.message)
        }

    },
    test: async() => {

        try {

            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <edmilsonsoares120@gmail.com>', // sender address
                to: "edmilsonsoares120@gmail.com", // list of receivers
                subject: "Criação da conta na Geovespa", // Subject line
                text: "Hello world?", // plain text body
                html: `
                <!DOCTYPE html>
                <html lang="pt">

                <head>
                    <meta charset="UTF-8">
                    <meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
                    <title>Tempus</title>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
                    <!-- tailwind css cdn -->
                    <script src="https://cdn.tailwindcss.com"></script>
                    <!-- ionicons cdn -->
                    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
                    <style type="text/tailwindcss">
                        body{ font-family: 'Inter', sans-serif; }
                    </style>

                </head>

                <body>

                <div class="mb-12 max-w-[570px] lg:mb-0">

                <h1 class="mb-3 text-2xl font-bold text-slate-700 sm:text-3xl">Criação da conta na Geovespa</h1>
                <p class="text-slate-500 mb-8">
                    Programa Operacional Sustentabilidade e Eficiência no Uso do Recurso, no âmbito do Regulamento Específico de Sustentabilidade e Eficiência no Uso do Recurso (RE SEUR), do Portugal 2020
                </p>




                <div class="flex">
                    <img src="/img/people/people_apereira.jpg" alt=" Edmilson Soares" class="mr-3 h-10 w-10 rounded-full object-cover">
                    <p class="text-sm font-semibold capitalize text-slate-600">
                        Edmilson Soares <span class="block text-xs text-slate-400"> edmilsonsoares120@gmail.com</span></p>
                </div>
                <a href="ddddddddd">Autenticar</a>


            </div>
                </body>

                </html>


                `
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou..

        } catch (error) {
            console.log(error.message)
        }

    }

});
