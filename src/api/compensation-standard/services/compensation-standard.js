'use strict';

/**
 * compensation-standard service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::compensation-standard.compensation-standard');
