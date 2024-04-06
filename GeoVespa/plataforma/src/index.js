'use strict';
const path = require('path')
const Microaitec = require('./app')
let xlsx = require("json-as-xlsx")
module.exports = {

    async register({ strapi }) {

        strapi.microaitec = await Microaitec({ strapi })
    },

    async bootstrap({ strapi }) {


    },
};
