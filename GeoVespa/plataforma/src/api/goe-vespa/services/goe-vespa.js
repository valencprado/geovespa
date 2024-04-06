'use strict';

/**
 * goe-vespa service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::goe-vespa.goe-vespa');
