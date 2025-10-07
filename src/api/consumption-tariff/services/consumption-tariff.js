'use strict';

/**
 * consumption-tariff service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::consumption-tariff.consumption-tariff');
