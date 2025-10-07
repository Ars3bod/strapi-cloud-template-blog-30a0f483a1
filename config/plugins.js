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
});
