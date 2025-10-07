'use strict';

/**
 * consumption-tariff router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::consumption-tariff.consumption-tariff');

const customRoutes = {
  routes: [
    {
      method: 'GET',
      path: '/consumption-tariffs/active',
      handler: 'consumption-tariff.findActive',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

// Merge default routes with custom routes
module.exports = {
  routes: [
    ...defaultRouter.routes,
    ...customRoutes.routes,
  ],
};
