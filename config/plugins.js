module.exports = ({ env }) => ({
  // Users & Permissions plugin configuration
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
      register: {
        allowedFields: ['username', 'email', 'password'],
      },
    },
  },
  // Strapi Cloud configuration
  cloud: {
    enabled: true,
    apiToken: env('STRAPI_CLOUD_API_TOKEN'),
    apiUrl: env('STRAPI_CLOUD_API_URL', 'https://api.strapi.cloud'),
    firstRunWindow: env.int('STRAPI_CLOUD_FIRST_RUN_WINDOW', 30000),
  },
});
