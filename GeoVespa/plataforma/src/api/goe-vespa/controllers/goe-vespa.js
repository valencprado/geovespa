'use strict';

/**
 * goe-vespa controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::goe-vespa.goe-vespa');
