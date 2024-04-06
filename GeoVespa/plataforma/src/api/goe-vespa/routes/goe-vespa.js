'use strict';

/**
 * goe-vespa router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::goe-vespa.goe-vespa');
